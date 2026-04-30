from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from models import db, Ledger, LedgerType
from utils.decorators import roles_required
from utils.validators import require_fields, parse_decimal

ledger_bp = Blueprint("ledger", __name__, url_prefix="/api/ledgers")


def serialize_ledger(ledger):
    return {
        "id": ledger.id,
        "name": ledger.name,
        "ledger_code": ledger.ledger_code,
        "ledger_type": ledger.ledger_type.value,
        "opening_balance": str(ledger.opening_balance),
        "current_balance": str(ledger.current_balance),
        "contact_person": ledger.contact_person,
        "phone": ledger.phone,
        "email": ledger.email,
        "address": ledger.address,
        "is_active": ledger.is_active,
    }


@ledger_bp.get("")
@jwt_required()
def list_ledgers():
    ledgers = Ledger.query.filter_by(company_id=get_jwt().get("company_id")).order_by(Ledger.id.desc()).all()
    return jsonify([serialize_ledger(l) for l in ledgers])


@ledger_bp.post("")
@jwt_required()
@roles_required("admin", "accountant")
def create_ledger():
    payload = request.get_json() or {}
    error = require_fields(payload, ["name", "ledger_code", "ledger_type", "opening_balance"])
    if error:
        return error

    if payload["ledger_type"] not in ["customer", "supplier", "expense"]:
        return jsonify({"message": "Invalid ledger type"}), 400

    try:
        opening_balance = parse_decimal(payload["opening_balance"], "opening_balance")
    except ValueError as err:
        return jsonify({"message": str(err)}), 400

    ledger = Ledger(
        name=payload["name"].strip(),
        ledger_code=payload["ledger_code"].strip().upper(),
        ledger_type=LedgerType(payload["ledger_type"]),
        opening_balance=opening_balance,
        current_balance=opening_balance,
        contact_person=payload.get("contact_person"),
        phone=payload.get("phone"),
        email=payload.get("email"),
        address=payload.get("address"),
        created_by_user_id=int(get_jwt_identity()),
        company_id=get_jwt().get("company_id"),
    )
    db.session.add(ledger)
    db.session.commit()
    return jsonify(serialize_ledger(ledger)), 201


@ledger_bp.put("/<int:ledger_id>")
@jwt_required()
@roles_required("admin", "accountant")
def update_ledger(ledger_id):
    ledger = Ledger.query.filter_by(id=ledger_id, company_id=get_jwt().get("company_id")).first_or_404()
    payload = request.get_json() or {}

    if "name" in payload:
        ledger.name = payload["name"].strip()
    if "ledger_type" in payload:
        try:
            ledger.ledger_type = LedgerType(payload["ledger_type"])
        except ValueError:
            return jsonify({"message": "Invalid ledger type"}), 400
    if "contact_person" in payload:
        ledger.contact_person = payload["contact_person"]
    if "phone" in payload:
        ledger.phone = payload["phone"]
    if "email" in payload:
        ledger.email = payload["email"]
    if "address" in payload:
        ledger.address = payload["address"]
    if "is_active" in payload:
        ledger.is_active = bool(payload["is_active"])

    db.session.commit()
    return jsonify(serialize_ledger(ledger))


@ledger_bp.delete("/<int:ledger_id>")
@jwt_required()
@roles_required("admin")
def delete_ledger(ledger_id):
    ledger = Ledger.query.filter_by(id=ledger_id, company_id=get_jwt().get("company_id")).first_or_404()
    db.session.delete(ledger)
    db.session.commit()
    return jsonify({"message": "Ledger deleted successfully"})
