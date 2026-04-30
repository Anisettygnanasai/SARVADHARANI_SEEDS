import bcrypt, random, smtplib, uuid, logging, re
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from models import Company, User, UserRole, UserApprovalStatus, AdminInvite, OtpVerification, db
from utils.validators import require_fields
from utils.decorators import admin_required

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")
logger = logging.getLogger(__name__)
OTP_TTL_MINUTES = 10

GMAIL_RE = re.compile(r"^[A-Za-z0-9._%+-]+@gmail\.com$")

def _ensure_gmail(email: str):
    if not GMAIL_RE.match(email):
        return jsonify({"message": "Only Gmail addresses are allowed"}), 400
    return None, None

def _generate_otp() -> str: return f"{random.randint(0, 999999):06d}"

def _send_email_otp(to_email: str, otp: str, purpose: str):
    sender = current_app.config.get("MAIL_USERNAME"); password = current_app.config.get("MAIL_PASSWORD")
    host = current_app.config.get("MAIL_SERVER", "smtp.gmail.com"); port = int(current_app.config.get("MAIL_PORT", 587)); use_tls = bool(current_app.config.get("MAIL_USE_TLS", True))
    logger.info("MAIL_USERNAME configured: %s", bool(sender))
    if not sender or not password: raise ValueError("Email service not configured. Set MAIL_USERNAME and MAIL_PASSWORD.")
    msg = EmailMessage(); msg["Subject"] = f"Your ERP {purpose} OTP"; msg["From"] = sender; msg["To"] = to_email
    msg.set_content(f"Your OTP is {otp}. It will expire in {OTP_TTL_MINUTES} minutes.")
    with smtplib.SMTP(host, port, timeout=20) as smtp:
        if use_tls:
            smtp.starttls()
        smtp.login(sender, password)
        smtp.send_message(msg)

def _send_invite_email(to_email: str, token: str, company_name: str):
    sender = current_app.config.get("MAIL_USERNAME"); password = current_app.config.get("MAIL_PASSWORD")
    host = current_app.config.get("MAIL_SERVER", "smtp.gmail.com"); port = int(current_app.config.get("MAIL_PORT", 587)); use_tls = bool(current_app.config.get("MAIL_USE_TLS", True))
    if not sender or not password: raise ValueError("Email service not configured. Set MAIL_USERNAME and MAIL_PASSWORD.")
    base_url = current_app.config.get("FRONTEND_URL", "http://localhost:3000")
    msg = EmailMessage(); msg["Subject"] = f"Admin Invite for {company_name}"; msg["From"] = sender; msg["To"] = to_email
    msg.set_content(f"You were invited as admin for {company_name}. Use this link to accept invite: {base_url}/admin/accept-invite?token={token}")
    with smtplib.SMTP(host, port, timeout=20) as smtp:
        if use_tls:
            smtp.starttls()
        smtp.login(sender, password)
        smtp.send_message(msg)



def _deliver_otp(email: str, otp: str, purpose: str):
    try:
        _send_email_otp(email, otp, purpose)
        return "email"
    except Exception:
        allow_fallback = bool(current_app.config.get("MAIL_FALLBACK_TO_LOG", True))
        if not allow_fallback:
            raise
        logger.exception("OTP email delivery failed; falling back to server log")
        logger.warning("OTP fallback [%s] for %s: %s", purpose, email, otp)
        return "log"

def _find_company(payload):
    code = payload.get("company_code", "").strip().upper()
    if not code: return None, jsonify({"message": "company_code is required"}), 400
    c = Company.query.filter_by(company_code=code).first()
    if not c: return None, jsonify({"message": "Company not found"}), 404
    return c, None, None


@auth_bp.get('/companies')
def list_companies():
    companies = Company.query.filter_by(is_active=True).order_by(Company.company_name.asc()).all()
    return jsonify([{"company_code": c.company_code, "company_name": c.company_name} for c in companies]), 200

@auth_bp.get('/admin/companies')
@jwt_required()
@admin_required
def list_all_companies_admin():
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message": "Only main admin can manage companies"}), 403
    companies = Company.query.order_by(Company.company_name.asc()).all()
    return jsonify([{"company_code": c.company_code, "company_name": c.company_name, "is_active": c.is_active} for c in companies]), 200

@auth_bp.post('/admin/companies')
@jwt_required()
@admin_required
def create_company():
    payload = request.get_json() or {}
    error = require_fields(payload, ["company_code", "company_name"])
    if error: return error
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message": "Only main admin can manage companies"}), 403
    code = payload["company_code"].strip().upper()
    if Company.query.filter_by(company_code=code).first(): return jsonify({"message": "Company code already exists"}), 409
    company = Company(company_code=code, company_name=payload["company_name"].strip(), is_active=bool(payload.get("is_active", True)))
    db.session.add(company); db.session.commit()
    return jsonify({"message": "Company created", "company_code": company.company_code}), 201

@auth_bp.put('/admin/companies/<string:company_code>')
@jwt_required()
@admin_required
def update_company(company_code):
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message": "Only main admin can manage companies"}), 403
    company = Company.query.filter_by(company_code=company_code.upper()).first()
    if not company: return jsonify({"message": "Company not found"}), 404
    payload = request.get_json() or {}
    if "company_name" in payload: company.company_name = payload["company_name"].strip()
    if "is_active" in payload: company.is_active = bool(payload["is_active"])
    db.session.commit()
    return jsonify({"message": "Company updated"}), 200

@auth_bp.delete('/admin/companies/<string:company_code>')
@jwt_required()
@admin_required
def delete_company(company_code):
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message": "Only main admin can manage companies"}), 403
    company = Company.query.filter_by(company_code=company_code.upper()).first()
    if not company: return jsonify({"message": "Company not found"}), 404
    if actor.company_id == company.id: return jsonify({"message": "Main admin company cannot be deleted"}), 400
    user_exists = User.query.filter_by(company_id=company.id).first()
    if user_exists: return jsonify({"message": "Cannot delete company with users. Deactivate instead."}), 400
    db.session.delete(company)
    db.session.commit()
    return jsonify({"message": "Company deleted"}), 200

@auth_bp.post('/send-otp')
@auth_bp.post('/register/request-otp')
def send_register_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower(); err, code = _ensure_gmail(email)
    if err: return err, code
    otp = _generate_otp()
    if User.query.filter_by(email=email, company_id=company.id).first(): return jsonify({"message": "Email already registered"}), 409
    try:
        delivery_mode = _deliver_otp(email, otp, "registration")
        OtpVerification.query.filter_by(email=email, company_id=company.id, purpose="register", verified=False).delete()
        db.session.add(OtpVerification(company_id=company.id, email=email, otp=otp, purpose="register", expires_at=datetime.now(timezone.utc)+timedelta(minutes=OTP_TTL_MINUTES), verified=False)); db.session.commit()
    except Exception as exc:
        db.session.rollback(); logger.exception("OTP send failed"); return jsonify({"message": "Failed to send OTP", "error": str(exc)}), 500
    return jsonify({"message": "OTP sent to your email" if delivery_mode == "email" else "OTP generated. Email service unavailable; contact admin."}), 200

@auth_bp.post('/verify-otp')
def verify_register_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "otp", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    row = OtpVerification.query.filter_by(company_id=company.id, email=payload["email"].strip().lower(), otp=payload["otp"].strip(), purpose="register", verified=False).order_by(OtpVerification.created_at.desc()).first()
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message": "Invalid or expired OTP"}), 400
    row.verified = True; db.session.commit(); return jsonify({"message": "OTP verified"}), 200

@auth_bp.post('/register')
def register():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "otp", "company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower()
    row = OtpVerification.query.filter_by(company_id=company.id, email=email, otp=payload["otp"].strip(), purpose="register", verified=True).order_by(OtpVerification.created_at.desc()).first()
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message": "OTP verification required"}), 400
    try:
        if User.query.filter_by(email=email, company_id=company.id).first(): return jsonify({"message": "Email already registered"}), 409
        db.session.add(User(full_name=payload["full_name"].strip(), email=email, password_hash=bcrypt.hashpw(payload["password"].encode(), bcrypt.gensalt()).decode(), role=UserRole.accountant, company_id=company.id, approval_status=UserApprovalStatus.pending, is_active=True))
        db.session.delete(row); db.session.commit()
    except IntegrityError: db.session.rollback(); return jsonify({"message": "Email already registered"}), 409
    except SQLAlchemyError as exc: db.session.rollback(); return jsonify({"message": "Registration failed due to database error", "error": str(getattr(exc, 'orig', exc))}), 500
    return jsonify({"message": "User registered successfully. Awaiting main admin approval."}), 201

@auth_bp.get('/admin/pending-accountants')
@jwt_required()
@admin_required
def pending_accountants():
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message":"Only main admin can view pending users"}), 403
    users = User.query.filter_by(company_id=actor.company_id, role=UserRole.accountant, approval_status=UserApprovalStatus.pending).all()
    return jsonify([{"id":u.id,"full_name":u.full_name,"email":u.email,"created_at":u.created_at.isoformat()} for u in users]), 200

@auth_bp.post('/admin/approve-accountant')
@jwt_required()
@admin_required
def approve_accountant():
    payload = request.get_json() or {}; error = require_fields(payload,["user_id"])
    if error: return error
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message":"Only main admin can approve users"}), 403
    user = User.query.filter_by(id=payload["user_id"], company_id=actor.company_id, role=UserRole.accountant).first()
    if not user: return jsonify({"message":"User not found"}), 404
    user.approval_status = UserApprovalStatus.approved; user.approved_by = actor.id; user.approved_at = datetime.now(timezone.utc); user.is_active=True
    db.session.commit(); return jsonify({"message":"Accountant approved"}), 200

@auth_bp.post('/admin/reject-accountant')
@jwt_required()
@admin_required
def reject_accountant():
    payload = request.get_json() or {}; error = require_fields(payload,["user_id"])
    if error: return error
    actor = User.query.get(int(get_jwt_identity()))
    if not actor or not actor.is_main_admin: return jsonify({"message":"Only main admin can reject users"}), 403
    user = User.query.filter_by(id=payload["user_id"], company_id=actor.company_id, role=UserRole.accountant).first()
    if not user: return jsonify({"message":"User not found"}), 404
    user.approval_status = UserApprovalStatus.rejected; user.approved_by = actor.id; user.approved_at = datetime.now(timezone.utc); user.is_active=False
    db.session.commit(); return jsonify({"message":"Accountant rejected"}), 200

@auth_bp.post('/admin/invite')
@jwt_required()
@admin_required
def admin_invite():
    payload = request.get_json() or {}; error = require_fields(payload,["email"])
    if error: return error
    inviter = User.query.get(int(get_jwt_identity()))
    if not inviter or not inviter.is_main_admin: return jsonify({"message":"Only main admin can invite admins"}), 403
    invite_email = payload["email"].strip().lower()
    err, code = _ensure_gmail(invite_email)
    if err: return err, code
    company_id = inviter.company_id
    if payload.get("company_code"):
        target = Company.query.filter_by(company_code=payload["company_code"].strip().upper()).first()
        if not target:
            return jsonify({"message": "Company not found"}), 404
        company_id = target.id
    token = str(uuid.uuid4())
    db.session.add(AdminInvite(company_id=company_id,email=invite_email,token=token,created_by=inviter.id,expires_at=datetime.now(timezone.utc)+timedelta(days=1),used=False)); db.session.commit()
    try:
        company = Company.query.get(company_id)
        _send_invite_email(invite_email, token, company.company_name if company else "your company")
    except Exception as exc:
        logger.exception("Admin invite email send failed")
        return jsonify({"message":"Invite created but email delivery failed","token":token,"error":str(exc)}), 201
    return jsonify({"message":"Invite sent successfully","token":token,"invite_link":f"/admin/accept?token={token}"}), 201

@auth_bp.post('/admin/accept-invite')
def accept_admin_invite():
    payload = request.get_json() or {}; error = require_fields(payload,["token","full_name","password"])
    if error: return error
    invite = AdminInvite.query.filter_by(token=payload["token"].strip(), used=False).first()
    if not invite or datetime.now(timezone.utc) > invite.expires_at: return jsonify({"message":"Invalid or expired invite"}), 400
    if User.query.filter_by(email=invite.email, company_id=invite.company_id).first(): return jsonify({"message":"Email already registered"}), 409
    db.session.add(User(full_name=payload["full_name"].strip(), email=invite.email, password_hash=bcrypt.hashpw(payload["password"].encode(), bcrypt.gensalt()).decode(), role=UserRole.admin, company_id=invite.company_id, approval_status=UserApprovalStatus.approved, is_active=True))
    invite.used=True; db.session.commit(); return jsonify({"message":"Admin account created"}), 201

@auth_bp.post('/forgot-password/send-otp')
@auth_bp.post('/forgot-password/request-otp')
def forgot_send_otp():
    payload = request.get_json() or {}; error = require_fields(payload,["email","company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower(); user = User.query.filter_by(email=email, company_id=company.id).first()
    if not user: return jsonify({"message":"User not found"}),404
    otp = _generate_otp()
    try:
        delivery_mode = _deliver_otp(email, otp, "password reset")
        OtpVerification.query.filter_by(email=email, company_id=company.id, purpose="reset", verified=False).delete()
        db.session.add(OtpVerification(company_id=company.id,email=email,otp=otp,purpose="reset",expires_at=datetime.now(timezone.utc)+timedelta(minutes=OTP_TTL_MINUTES),verified=False)); db.session.commit()
    except Exception as exc: db.session.rollback(); logger.exception("Forgot OTP send failed"); return jsonify({"message":"Failed to send OTP","error":str(exc)}),500
    return jsonify({"message":"OTP sent to your email" if delivery_mode == "email" else "OTP generated. Email service unavailable; contact admin."}),200

@auth_bp.post('/forgot-password/verify-otp')
def forgot_verify_otp():
    payload = request.get_json() or {}; error = require_fields(payload,["email","otp","company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    row = OtpVerification.query.filter_by(company_id=company.id,email=payload["email"].strip().lower(),otp=payload["otp"].strip(),purpose="reset",verified=False).first()
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message":"Invalid or expired OTP"}),400
    row.verified=True; db.session.commit(); return jsonify({"message":"OTP verified"}),200

@auth_bp.post('/forgot-password/reset')
def forgot_reset_password():
    payload = request.get_json() or {}; error = require_fields(payload,["email","otp","new_password","company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    email = payload["email"].strip().lower(); user = User.query.filter_by(email=email, company_id=company.id).first()
    row = OtpVerification.query.filter_by(company_id=company.id,email=email,otp=payload["otp"].strip(),purpose="reset",verified=True).first()
    if not user: return jsonify({"message":"User not found"}),404
    if not row or datetime.now(timezone.utc) > row.expires_at: return jsonify({"message":"OTP verification required"}),400
    user.password_hash = bcrypt.hashpw(payload["new_password"].encode(), bcrypt.gensalt()).decode(); db.session.delete(row); db.session.commit()
    return jsonify({"message":"Password reset successful"}),200

@auth_bp.post('/login')
def login():
    payload = request.get_json() or {}; error = require_fields(payload,["email","password","company_code"])
    if error: return error
    company, err, code = _find_company(payload)
    if err: return err, code
    user = User.query.filter_by(email=payload["email"].strip().lower(), company_id=company.id).first()
    if not user or not bcrypt.checkpw(payload["password"].encode(), user.password_hash.encode()): return jsonify({"message":"Invalid credentials"}),401
    if not company.is_active: return jsonify({"message":"Company is inactive"}),403
    if not user.is_active: return jsonify({"message":"User is inactive"}),403
    if user.role == UserRole.accountant and user.approval_status != UserApprovalStatus.approved: return jsonify({"message":"Account pending main admin approval"}),403
    token = create_access_token(identity=str(user.id), additional_claims={"role":user.role.value,"company_id":company.id,"is_main_admin":user.is_main_admin})
    return jsonify({"access_token":token,"user":{"id":user.id,"full_name":user.full_name,"email":user.email,"role":user.role.value,"company_code":company.company_code,"company_name":company.company_name,"approval_status":user.approval_status.value,"is_main_admin":user.is_main_admin}}),200
