from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, StockItem, StockHistory, StockMovementType
from utils.decorators import roles_required
from utils.validators import require_fields, parse_decimal

stock_bp = Blueprint("stock", __name__, url_prefix="/api/stocks")


def serialize_stock(item):
    return {
        "id": item.id,
        "sku": item.sku,
        "name": item.name,
        "description": item.description,
        "unit": item.unit,
        "quantity_on_hand": str(item.quantity_on_hand),
        "unit_price": str(item.unit_price),
        "reorder_level": str(item.reorder_level),
        "is_active": item.is_active,
    }


@stock_bp.get("")
@jwt_required()
def list_stock_items():
    items = StockItem.query.order_by(StockItem.id.desc()).all()
    return jsonify([serialize_stock(i) for i in items])


@stock_bp.post("")
@jwt_required()
@roles_required("admin", "accountant")
def create_stock_item():
    payload = request.get_json() or {}
    error = require_fields(payload, ["sku", "name", "quantity_on_hand", "unit_price"])
    if error:
        return error

    try:
        qty = parse_decimal(payload["quantity_on_hand"], "quantity_on_hand")
        price = parse_decimal(payload["unit_price"], "unit_price")
        reorder_level = parse_decimal(payload.get("reorder_level", 0), "reorder_level")
    except ValueError as err:
        return jsonify({"message": str(err)}), 400

    item = StockItem(
        sku=payload["sku"].strip().upper(),
        name=payload["name"].strip(),
        description=payload.get("description"),
        unit=payload.get("unit", "pcs"),
        quantity_on_hand=qty,
        unit_price=price,
        reorder_level=reorder_level,
        created_by_user_id=int(get_jwt_identity()),
    )
    db.session.add(item)
    db.session.flush()

    db.session.add(
        StockHistory(
            stock_item_id=item.id,
            movement_type=StockMovementType.adjustment,
            quantity_change=qty,
            quantity_before=0,
            quantity_after=qty,
            unit_price=price,
            notes="Opening stock",
            created_by_user_id=int(get_jwt_identity()),
        )
    )

    db.session.commit()
    return jsonify(serialize_stock(item)), 201


@stock_bp.put("/<int:stock_id>")
@jwt_required()
@roles_required("admin", "accountant")
def update_stock_item(stock_id):
    item = StockItem.query.get_or_404(stock_id)
    payload = request.get_json() or {}

    if "name" in payload:
        item.name = payload["name"].strip()
    if "description" in payload:
        item.description = payload["description"]
    if "unit" in payload:
        item.unit = payload["unit"]
    try:
        if "unit_price" in payload:
            item.unit_price = parse_decimal(payload["unit_price"], "unit_price")
        if "reorder_level" in payload:
            item.reorder_level = parse_decimal(payload["reorder_level"], "reorder_level")
    except ValueError as err:
        return jsonify({"message": str(err)}), 400
    if "is_active" in payload:
        item.is_active = bool(payload["is_active"])

    db.session.commit()
    return jsonify(serialize_stock(item))


@stock_bp.delete("/<int:stock_id>")
@jwt_required()
@roles_required("admin")
def delete_stock_item(stock_id):
    item = StockItem.query.get_or_404(stock_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Stock item deleted successfully"})


@stock_bp.get("/<int:stock_id>/history")
@jwt_required()
def stock_history(stock_id):
    history = StockHistory.query.filter_by(stock_item_id=stock_id).order_by(StockHistory.created_at.desc()).all()
    result = [
        {
            "id": h.id,
            "movement_type": h.movement_type.value,
            "quantity_change": str(h.quantity_change),
            "quantity_before": str(h.quantity_before),
            "quantity_after": str(h.quantity_after),
            "unit_price": str(h.unit_price),
            "notes": h.notes,
            "created_at": h.created_at.isoformat(),
        }
        for h in history
    ]
    return jsonify(result)
