from decimal import Decimal, InvalidOperation
from flask import jsonify


def require_fields(payload, fields):
    missing = [field for field in fields if field not in payload or payload.get(field) in [None, ""]]
    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400
    return None


def parse_decimal(value, field_name):
    try:
        return Decimal(str(value))
    except (InvalidOperation, TypeError):
        raise ValueError(f"Invalid numeric value for {field_name}")
