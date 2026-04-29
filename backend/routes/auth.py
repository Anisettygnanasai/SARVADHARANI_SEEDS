import bcrypt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from models import db, User, UserRole
from utils.validators import require_fields

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.post("/register")
def register():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "role"])
    if error:
        return error

    full_name = payload["full_name"].strip()
    email = payload["email"].strip().lower()
    password = payload["password"]

    if len(full_name) < 3:
        return jsonify({"message": "Full name must be at least 3 characters"}), 400
    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"message": "Invalid email format"}), 400
    if len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400

    role_value = payload["role"]
    if role_value not in ["admin", "accountant"]:
        return jsonify({"message": "Invalid role"}), 400

    try:
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already registered"}), 409

        password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        user = User(
            full_name=full_name,
            email=email,
            password_hash=password_hash,
            role=UserRole(role_value),
        )

        db.session.add(user)
        db.session.commit()

    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Email already registered"}), 409
    except SQLAlchemyError as exc:
        db.session.rollback()
        return (
            jsonify(
                {
                    "message": "Registration failed due to database error",
                    "error": str(getattr(exc, "orig", exc)),
                }
            ),
            500,
        )
    except Exception:
        db.session.rollback()
        return jsonify({"message": "Registration failed due to unexpected server error"}), 500

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.post("/login")
def login():
    payload = request.get_json() or {}
    error = require_fields(payload, ["email", "password"])
    if error:
        return error

    user = User.query.filter_by(email=payload["email"].strip().lower()).first()
    if not user or not bcrypt.checkpw(payload["password"].encode("utf-8"), user.password_hash.encode("utf-8")):
        return jsonify({"message": "Invalid credentials"}), 401

    if not user.is_active:
        return jsonify({"message": "User is inactive"}), 403

    token = create_access_token(identity=str(user.id), additional_claims={"role": user.role.value})
    return (
        jsonify(
            {
                "access_token": token,
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                    "role": user.role.value,
                },
            }
        ),
        200,
    )
