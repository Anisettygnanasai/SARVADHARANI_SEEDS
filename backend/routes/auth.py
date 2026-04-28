import bcrypt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User, UserRole
from utils.validators import require_fields

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.post("/register")
def register():
    payload = request.get_json() or {}
    error = require_fields(payload, ["full_name", "email", "password", "role"])
    if error:
        return error

    role_value = payload["role"]
    if role_value not in ["admin", "accountant"]:
        return jsonify({"message": "Invalid role"}), 400

    if User.query.filter_by(email=payload["email"].strip().lower()).first():
        return jsonify({"message": "Email already registered"}), 409

    password_hash = bcrypt.hashpw(payload["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    user = User(
        full_name=payload["full_name"].strip(),
        email=payload["email"].strip().lower(),
        password_hash=password_hash,
        role=UserRole(role_value),
    )

    db.session.add(user)
    db.session.commit()

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
    return jsonify({
        "access_token": token,
        "user": {"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role.value},
    }), 200
