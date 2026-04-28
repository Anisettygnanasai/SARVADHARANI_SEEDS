from decimal import Decimal
from sqlalchemy.exc import SQLAlchemyError
from models import (
    db,
    Ledger,
    StockItem,
    StockHistory,
    Transaction,
    TransactionItem,
    TransactionType,
    StockMovementType,
)


def _movement_by_type(transaction_type):
    if transaction_type in [TransactionType.sales, TransactionType.payment]:
        return "debit"
    return "credit"


def _stock_direction(transaction_type):
    if transaction_type == TransactionType.sales:
        return StockMovementType.out, Decimal("-1")
    if transaction_type == TransactionType.purchase:
        return StockMovementType.in_movement, Decimal("1")
    return None, Decimal("0")


def create_transaction(payload, user_id):
    transaction_type = TransactionType(payload["transaction_type"])
    ledger = Ledger.query.get(payload["ledger_id"])
    if not ledger:
        raise ValueError("Ledger not found")

    items_payload = payload.get("items", [])
    if transaction_type in [TransactionType.sales, TransactionType.purchase] and not items_payload:
        raise ValueError("Items are required for sales and purchase transactions")

    total_amount = Decimal(str(payload["total_amount"]))
    transaction = Transaction(
        transaction_number=payload["transaction_number"],
        transaction_type=transaction_type,
        ledger_id=ledger.id,
        total_amount=total_amount,
        notes=payload.get("notes"),
        created_by_user_id=user_id,
    )

    try:
        db.session.add(transaction)

        movement_type, multiplier = _stock_direction(transaction_type)
        for item in items_payload:
            stock_item = StockItem.query.get(item["stock_item_id"])
            if not stock_item:
                raise ValueError(f"Stock item not found: {item['stock_item_id']}")

            qty = Decimal(str(item["quantity"]))
            unit_price = Decimal(str(item["unit_price"]))
            line_total = qty * unit_price

            if movement_type:
                before_qty = Decimal(str(stock_item.quantity_on_hand))
                delta = qty * multiplier
                after_qty = before_qty + delta
                if after_qty < 0:
                    raise ValueError(f"Insufficient stock for item {stock_item.name}")

                stock_item.quantity_on_hand = after_qty
                db.session.add(
                    StockHistory(
                        stock_item_id=stock_item.id,
                        transaction_id=transaction.id,
                        movement_type=movement_type,
                        quantity_change=delta,
                        quantity_before=before_qty,
                        quantity_after=after_qty,
                        unit_price=unit_price,
                        notes=f"Auto update from {transaction_type.value}",
                        created_by_user_id=user_id,
                    )
                )

            db.session.add(
                TransactionItem(
                    transaction=transaction,
                    stock_item_id=stock_item.id,
                    quantity=qty,
                    unit_price=unit_price,
                    line_total=line_total,
                )
            )

        movement = _movement_by_type(transaction_type)
        current_balance = Decimal(str(ledger.current_balance))
        if movement == "debit":
            ledger.current_balance = current_balance + total_amount
        else:
            ledger.current_balance = current_balance - total_amount

        db.session.commit()
        return transaction
    except (SQLAlchemyError, ValueError) as err:
        db.session.rollback()
        raise err
