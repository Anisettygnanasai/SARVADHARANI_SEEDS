import bcrypt, random, smtplib, uuid, logging
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from models import Company, User, UserRole, AdminInvite, OtpVerification, db
from utils.validators import require_fields
from utils.decorators import admin_required

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")
logger = logging.getLogger(__name__)
OTP_TTL_MINUTES = 10


def _generate_otp() -> str:
    return f"{random.randint(0, 999999):06d}"

def _send_email_otp(to_email: str, otp: str, purpose: str):
    sender = current_app.config.get("MAIL_USERNAME")
    password = current_app.config.get("MAIL_PASSWORD")
    host = current_app.config.get("MAIL_SERVER", "smtp.gmail.com")
    port = int(current_app.config.get("MAIL_PORT", 587))
    use_tls = bool(current_app.config.get("MAIL_USE_TLS", True))
    logger.info("MAIL_USERNAME configured: %s", bool(sender))
    if not sender or not password:
        raise ValueError("Email service not configured. Set MAIL_USERNAME and MAIL_PASSWORD.")
    msg = EmailMessage(); msg["Subject"] = f"Your ERP {purpose} OTP"; msg["From"] = sender; msg["To"] = to_email
    msg.set_content(f"Your OTP is {otp}. It will expire in {OTP_TTL_MINUTES} minutes.")
    with smtplib.SMTP(host, port, timeout=20) as smtp:
        if use_tls: smtp.starttls()
        smtp.login(sender, password); smtp.send_message(msg)


def _find_company(payload):
    code = payload.get("company_code", "").strip().upper()
    if not code: return None, jsonify({"message": "company_code is required"}), 400
    company = Company.query.filter_by(company_code=code).first()
    if not company: return None, jsonify({"message": "Company not found"}), 404
    return company, None, None

@auth_bp.post("/send-otp")
@auth_bp.post("/register/request-otp")
def send_register_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower(); otp = _generate_otp()
    if User.query.filter_by(email=email, company_id=company.id).first():
        return jsonify({"message": "Email already registered"}), 409
    try:
        _send_email_otp(email, otp, "registration")
        OtpVerification.query.filter_by(email=email, company_id=company.id, purpose="register", verified=False).delete()
        db.session.add(OtpVerification(company_id=company.id, email=email, otp=otp, purpose="register", expires_at=datetime.now(timezone.utc)+timedelta(minutes=OTP_TTL_MINUTES), verified=False))
        db.session.commit()
    except Exception as exc:
        db.session.rollback(); logger.exception("OTP send failed")
        return jsonify({"message": "Failed to send OTP", "error": str(exc)}), 500
    return jsonify({"message": "OTP sent to your email"}), 200

@auth_bp.post("/verify-otp")
def verify_register_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "otp", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower()
    row = OtpVerification.query.filter_by(company_id=company.id, email=email, otp=payload["otp"].strip(), purpose="register", verified=False).order_by(OtpVerification.created_at.desc()).first()
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message": "Invalid or expired OTP"}), 400
    row.verified = True; db.session.commit(); return jsonify({"message": "OTP verified"}), 200

@auth_bp.post("/register")
def register():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "otp", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower()
    otp_row = OtpVerification.query.filter_by(company_id=company.id, email=email, otp=payload["otp"].strip(), purpose="register", verified=True).order_by(OtpVerification.created_at.desc()).first()
    if not otp_row or datetime.now(timezone.utc) > otp_row.expires_at: return jsonify({"message": "OTP verification required"}), 400
    try:
        if User.query.filter_by(email=email, company_id=company.id).first(): return jsonify({"message": "Email already registered"}), 409
        user = User(full_name=payload["full_name"].strip(), email=email, password_hash=bcrypt.hashpw(payload["password"].encode(), bcrypt.gensalt()).decode(), role=UserRole.accountant, company_id=company.id)
        db.session.add(user); db.session.delete(otp_row); db.session.commit()
    except IntegrityError:
        db.session.rollback(); return jsonify({"message": "Email already registered"}), 409
    except SQLAlchemyError as exc:
        db.session.rollback(); return jsonify({"message": "Registration failed due to database error", "error": str(getattr(exc, 'orig', exc))}), 500
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.post("/forgot-password/send-otp")
@auth_bp.post("/forgot-password/request-otp")
def forgot_send_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower(); user = User.query.filter_by(email=email, company_id=company.id).first()
    if not user: return jsonify({"message": "User not found"}), 404
    otp = _generate_otp()
    try:
        _send_email_otp(email, otp, "password reset")
        OtpVerification.query.filter_by(email=email, company_id=company.id, purpose="reset", verified=False).delete()
        db.session.add(OtpVerification(company_id=company.id, email=email, otp=otp, purpose="reset", expires_at=datetime.now(timezone.utc)+timedelta(minutes=OTP_TTL_MINUTES), verified=False))
        db.session.commit()
    except Exception as exc:
        db.session.rollback(); logger.exception("Forgot OTP send failed")
        return jsonify({"message": "Failed to send OTP", "error": str(exc)}), 500
    return jsonify({"message": "OTP sent to your email"}), 200

@auth_bp.post("/forgot-password/verify-otp")
def forgot_verify_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "otp", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    row = OtpVerification.query.filter_by(company_id=company.id, email=payload["email"].strip().lower(), otp=payload["otp"].strip(), purpose="reset", verified=False).order_by(OtpVerification.created_at.desc()).first()
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message": "Invalid or expired OTP"}), 400
    row.verified = True; db.session.commit(); return jsonify({"message": "OTP verified"}), 200

@auth_bp.post("/forgot-password/reset")
def forgot_reset_password():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "otp", "new_password", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower(); user = User.query.filter_by(email=email, company_id=company.id).first()
    row = OtpVerification.query.filter_by(company_id=company.id, email=email, otp=payload["otp"].strip(), purpose="reset", verified=True).order_by(OtpVerification.created_at.desc()).first()
    if not user: return jsonify({"message": "User not found"}), 404
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message": "OTP verification required"}), 400
    user.password_hash = bcrypt.hashpw(payload["new_password"].encode(), bcrypt.gensalt()).decode(); db.session.delete(row); db.session.commit()
    return jsonify({"message": "Password reset successful"}), 200

@auth_bp.post("/admin/invite")
@jwt_required()
@admin_required
def admin_invite():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email"])
    if error: return error
    inviter = User.query.get(int(get_jwt_identity())); token = str(uuid.uuid4())
    invite = AdminInvite(company_id=inviter.company_id, email=payload["email"].strip().lower(), token=token, created_by=inviter.id, expires_at=datetime.now(timezone.utc)+timedelta(days=1), used=False)
    db.session.add(invite); db.session.commit(); return jsonify({"token": token, "invite_link": f"/admin/accept?token={token}"}), 201

@auth_bp.post("/admin/accept-invite")
def accept_admin_invite():
    payload = request.get_json() or {}
    error = require_fields(payload, ["token", "full_name", "password"])
    if error: return error
    invite = AdminInvite.query.filter_by(token=payload["token"].strip(), used=False).first()
    if not invite or datetime.now(timezone.utc) > invite.expires_at: return jsonify({"message": "Invalid or expired invite"}), 400
    if User.query.filter_by(email=invite.email, company_id=invite.company_id).first(): return jsonify({"message": "Email already registered"}), 409
    user = User(full_name=payload["full_name"].strip(), email=invite.email, password_hash=bcrypt.hashpw(payload["password"].encode(), bcrypt.gensalt()).decode(), role=UserRole.admin, company_id=invite.company_id)
    invite.used = True; db.session.add(user); db.session.commit(); return jsonify({"message": "Admin account created"}), 201

@auth_bp.post("/login")
def login():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "password", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    user = User.query.filter_by(email=payload["email"].strip().lower(), company_id=company.id).first()
    if not user or not bcrypt.checkpw(payload["password"].encode(), user.password_hash.encode()): return jsonify({"message": "Invalid credentials"}), 401
    token = create_access_token(identity=str(user.id), additional_claims={"role": user.role.value, "company_id": company.id})
    return jsonify({"access_token": token, "user": {"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role.value, "company_code": company.company_code, "company_name": company.company_name}}), 200
