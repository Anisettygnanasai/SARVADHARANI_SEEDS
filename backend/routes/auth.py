import bcrypt
import random
import smtplib
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from models import Company, User, UserRole, db
from utils.validators import require_fields

ALLOWED_EMAIL_DOMAINS = {
    "gmail.com",
    "yahoo.com",
    "yahoo.co.in",
    "yahoo.in",
    "yahoo.co.uk",
}

# In-memory OTP store for lightweight deployment.
# key: (purpose, email), value: {otp, expires_at, payload(optional)}
OTP_STORE = {}
OTP_TTL_MINUTES = 10

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def _is_allowed_public_email(email: str) -> bool:
    parts = email.split("@")
    return len(parts) == 2 and parts[1] in ALLOWED_EMAIL_DOMAINS


def _generate_otp() -> str:
    return f"{random.randint(0, 999999):06d}"


def _send_email_otp(to_email: str, otp: str, purpose: str):
    sender = current_app.config.get("MAIL_USERNAME")
    password = current_app.config.get("MAIL_PASSWORD")
    host = current_app.config.get("MAIL_SERVER")
    port = int(current_app.config.get("MAIL_PORT", 587))
    use_tls = bool(current_app.config.get("MAIL_USE_TLS", True))

    if not sender or not password:
        raise ValueError("Email service not configured. Set MAIL_USERNAME and MAIL_PASSWORD.")

    msg = EmailMessage()
    msg["Subject"] = f"Your ERP {purpose} OTP"
    msg["From"] = sender
    msg["To"] = to_email
    msg.set_content(f"Your OTP is {otp}. It will expire in {OTP_TTL_MINUTES} minutes.")

    with smtplib.SMTP(host, port, timeout=15) as smtp:
        if use_tls:
            smtp.starttls()
        smtp.login(sender, password)
        smtp.send_message(msg)


def _set_otp(purpose: str, email: str, otp: str, payload: dict | None = None):
    OTP_STORE[(purpose, email)] = {
        "otp": otp,
        "expires_at": datetime.now(timezone.utc) + timedelta(minutes=OTP_TTL_MINUTES),
        "payload": payload or {},
    }


def _verify_otp(purpose: str, email: str, otp: str):
    record = OTP_STORE.get((purpose, email))
    if not record:
        return False, "No OTP request found. Please request OTP again."

    if datetime.now(timezone.utc) > record["expires_at"]:
        OTP_STORE.pop((purpose, email), None)
        return False, "OTP expired. Please request a new OTP."

    if record["otp"] != otp:
        return False, "Invalid OTP"

    return True, record


@auth_bp.post("/register/request-otp")
def request_registration_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "company_code", "company_name"])
    if error:
        return error

    full_name = payload["full_name"].strip()
    email = payload["email"].strip().lower()
    password = payload["password"]
    company_code = payload["company_code"].strip().upper()
    company_name = payload["company_name"].strip()

    if len(full_name) < 3:
        return jsonify({"message": "Full name must be at least 3 characters"}), 400
    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"message": "Invalid email format"}), 400
    if not _is_allowed_public_email(email):
        return jsonify({"message": "Only Google and Yahoo email addresses are allowed"}), 400
    if len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400
    if len(company_code) < 3:
        return jsonify({"message": "Company code must be at least 3 characters"}), 400

    company = Company.query.filter_by(company_code=company_code).first()
    if company and company.company_name.lower() != company_name.lower():
        return jsonify({"message": "Company code already exists with a different name"}), 409

    if User.query.filter_by(email=email, company_id=company.id if company else None).first():
        return jsonify({"message": "Email already registered"}), 409

    otp = _generate_otp()
    try:
        _send_email_otp(email, otp, "registration")
        _set_otp("register", email, otp, payload={"full_name": full_name, "password": password, "company_code": company_code, "company_name": company_name})
    except Exception as exc:
        return jsonify({"message": "Failed to send OTP", "error": str(exc)}), 500

    return jsonify({"message": "OTP sent to your email"}), 200


@auth_bp.post("/register")
def register():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "otp", "company_code"])
    if error:
        return error

    email = payload["email"].strip().lower()
    otp = payload["otp"].strip()
    company_code = payload["company_code"].strip().upper()

    valid, result = _verify_otp("register", email, otp)
    if not valid:
        return jsonify({"message": result}), 400

    register_payload = result["payload"]

    try:
        company = Company.query.filter_by(company_code=company_code).first()
        if not company:
            company = Company(company_code=company_code, company_name=register_payload["company_name"])
            db.session.add(company)
            db.session.flush()

        if User.query.filter_by(email=email, company_id=company.id).first():
            OTP_STORE.pop(("register", email), None)
            return jsonify({"message": "Email already registered"}), 409

        password_hash = bcrypt.hashpw(register_payload["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        user = User(
            full_name=register_payload["full_name"],
            email=email,
            password_hash=password_hash,
            role=UserRole.accountant,
            company_id=company.id,
        )

        db.session.add(user)
        db.session.commit()
        OTP_STORE.pop(("register", email), None)
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Email already registered"}), 409
    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({"message": "Registration failed due to database error", "error": str(getattr(exc, "orig", exc))}), 500

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.post("/forgot-password/request-otp")
def forgot_password_request_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "company_code"])
    if error:
        return error

    email = payload["email"].strip().lower()
    company_code = payload["company_code"].strip().upper()
    company = Company.query.filter_by(company_code=company_code).first()
    if not company:
        return jsonify({"message": "Company not found"}), 404

    user = User.query.filter_by(email=email, company_id=company.id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    otp = _generate_otp()
    try:
        _send_email_otp(email, otp, "password reset")
        _set_otp("reset", email, otp)
    except Exception as exc:
        return jsonify({"message": "Failed to send OTP", "error": str(exc)}), 500

    return jsonify({"message": "OTP sent to your email"}), 200


@auth_bp.post("/forgot-password/verify-otp")
def forgot_password_verify_otp():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "otp", "new_password", "company_code"])
    if error:
        return error

    email = payload["email"].strip().lower()
    otp = payload["otp"].strip()
    company_code = payload["company_code"].strip().upper()
    new_password = payload["new_password"]
    company_code = payload["company_code"].strip().upper()

    if len(new_password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400

    valid, result = _verify_otp("reset", email, otp)
    if not valid:
        return jsonify({"message": result}), 400

    company_code = payload["company_code"].strip().upper()
    company = Company.query.filter_by(company_code=company_code).first()
    if not company:
        return jsonify({"message": "Company not found"}), 404

    user = User.query.filter_by(email=email, company_id=company.id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    try:
        user.password_hash = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        db.session.commit()
        OTP_STORE.pop(("reset", email), None)
    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({"message": "Password reset failed", "error": str(getattr(exc, "orig", exc))}), 500

    return jsonify({"message": "Password reset successful"}), 200


@auth_bp.post("/login")
def login():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "password", "company_code"])
    if error:
        return error

    company_code = payload["company_code"].strip().upper()
    company = Company.query.filter_by(company_code=company_code).first()
    if not company:
        return jsonify({"message": "Invalid credentials"}), 401

    user = User.query.filter_by(email=payload["email"].strip().lower(), company_id=company.id).first()
    if not user or not bcrypt.checkpw(payload["password"].encode("utf-8"), user.password_hash.encode("utf-8")):
        return jsonify({"message": "Invalid credentials"}), 401

    if not user.is_active:
        return jsonify({"message": "User is inactive"}), 403

    token = create_access_token(identity=str(user.id), additional_claims={"role": user.role.value, "company_id": user.company_id, "company_code": company.company_code})
    return jsonify({"access_token": token, "user": {"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role.value, "company_id": user.company_id, "company_code": company.company_code, "company_name": company.company_name}}), 200
