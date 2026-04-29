from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Transaction, TransactionType
from services.transaction_service import create_transaction
from utils.decorators import roles_required
from utils.validators import require_fields, parse_decimal

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


@transaction_bp.put("/<int:transaction_id>")
@jwt_required()
@roles_required("admin", "accountant")
def update_transaction(transaction_id):
    transaction = Transaction.query.get_or_404(transaction_id)
    payload = request.get_json() or {}

    if "transaction_type" in payload:
        try:
            transaction.transaction_type = TransactionType(payload["transaction_type"])
        except ValueError:
            return jsonify({"message": "Invalid transaction type"}), 400
    if "ledger_id" in payload:
        transaction.ledger_id = payload["ledger_id"]
    if "total_amount" in payload:
        try:
            transaction.total_amount = parse_decimal(payload["total_amount"], "total_amount")
        except ValueError as err:
            return jsonify({"message": str(err)}), 400
    if "notes" in payload:
        transaction.notes = payload["notes"]

    db.session.commit()
    return jsonify(serialize_transaction(transaction))


@transaction_bp.delete("/<int:transaction_id>")
@jwt_required()
@roles_required("admin")
def delete_transaction(transaction_id):
    transaction = Transaction.query.get_or_404(transaction_id)
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({"message": "Transaction deleted successfully"})
