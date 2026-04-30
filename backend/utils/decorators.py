from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt


def roles_required(*allowed_roles):
    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            claims = get_jwt()
            role = claims.get("role")
            if role not in allowed_roles:
                return jsonify({"message": "Access denied"}), 403
            return fn(*args, **kwargs)
        return decorated
    return wrapper


def admin_required(fn):
    @wraps(fn)
    def decorated(*args, **kwargs):
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"message": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return decorated


def non_main_admin_required(fn):
    @wraps(fn)
    def decorated(*args, **kwargs):
        claims = get_jwt()
        if claims.get("is_main_admin"):
            return jsonify({"message": "Main admin is restricted to approvals, invites, and company management"}), 403
        return fn(*args, **kwargs)
    return decorated
