from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Transaction
from services.transaction_service import create_transaction
from utils.decorators import roles_required
from utils.validators import require_fields

transaction_bp = Blueprint("transaction", __name__, url_prefix="/api/transactions")


def serialize_transaction(t):
    return {
        "id": t.id,
        "transaction_number": t.transaction_number,
        "transaction_type": t.transaction_type.value,
        "ledger_id": t.ledger_id,
        "total_amount": str(t.total_amount),
        "notes": t.notes,
        "transaction_timestamp": t.transaction_timestamp.isoformat(),
        "items": [
            {
                "stock_item_id": i.stock_item_id,
                "quantity": str(i.quantity),
                "unit_price": str(i.unit_price),
                "line_total": str(i.line_total),
            }
            for i in t.items
        ],
    }


@transaction_bp.get("")
@jwt_required()
def list_transactions():
    transactions = Transaction.query.order_by(Transaction.transaction_timestamp.desc()).all()
    return jsonify([serialize_transaction(t) for t in transactions])


@transaction_bp.post("")
@jwt_required()
@roles_required("admin", "accountant")
def add_transaction():
    payload = request.get_json() or {}
    error = require_fields(payload, ["transaction_number", "transaction_type", "ledger_id", "total_amount"])
    if error:
        return error

    try:
        transaction = create_transaction(payload, int(get_jwt_identity()))
        return jsonify(serialize_transaction(transaction)), 201
    except ValueError as err:
        return jsonify({"message": str(err)}), 400
    except Exception:
        return jsonify({"message": "Failed to create transaction"}), 500
