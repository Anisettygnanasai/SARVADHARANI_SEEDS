from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import enum


db = SQLAlchemy()


class UserRole(enum.Enum):
    admin = "admin"
    accountant = "accountant"


class LedgerType(enum.Enum):
    customer = "customer"
    supplier = "supplier"
    expense = "expense"


class TransactionType(enum.Enum):
    sales = "sales"
    purchase = "purchase"
    payment = "payment"
    receipt = "receipt"


class StockMovementType(enum.Enum):
    in_movement = "in"
    out = "out"
    adjustment = "adjustment"


class TimestampMixin:
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)


class Company(db.Model, TimestampMixin):
    __tablename__ = "companies"
    id = db.Column(db.BigInteger, primary_key=True)
    company_code = db.Column(db.String(50), nullable=False, unique=True)
    company_name = db.Column(db.String(180), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)


class User(db.Model, TimestampMixin):
    __tablename__ = "users"
    id = db.Column(db.BigInteger, primary_key=True)
    company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.Enum(UserRole, name="user_role"), nullable=False, default=UserRole.accountant)
    is_active = db.Column(db.Boolean, nullable=False, default=True)


class AdminInvite(db.Model):
    __tablename__ = "admin_invites"
    id = db.Column(db.BigInteger, primary_key=True)
    company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    token = db.Column(db.String(255), nullable=False, unique=True)
    created_by = db.Column(db.BigInteger, db.ForeignKey("users.id"))
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)
    used = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)


class OtpVerification(db.Model):
    __tablename__ = "otp_verifications"
    id = db.Column(db.BigInteger, primary_key=True)
    company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    otp = db.Column(db.String(6), nullable=False)
    purpose = db.Column(db.String(40), nullable=False)
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)
    verified = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

# other models unchanged from current
class Ledger(db.Model, TimestampMixin):
    __tablename__ = "ledgers"
    id = db.Column(db.BigInteger, primary_key=True)
    company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    name = db.Column(db.String(180), nullable=False)
    ledger_code = db.Column(db.String(50), nullable=False)
    ledger_type = db.Column(db.Enum(LedgerType, name="ledger_type"), nullable=False)
    opening_balance = db.Column(db.Numeric(18, 2), nullable=False, default=0)
    current_balance = db.Column(db.Numeric(18, 2), nullable=False, default=0)
    contact_person = db.Column(db.String(120)); phone = db.Column(db.String(30)); email = db.Column(db.String(255)); address = db.Column(db.Text)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_by_user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)

class StockItem(db.Model, TimestampMixin):
    __tablename__ = "stock_items"
    id = db.Column(db.BigInteger, primary_key=True); company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    sku = db.Column(db.String(80), nullable=False); name = db.Column(db.String(180), nullable=False); description = db.Column(db.Text)
    unit = db.Column(db.String(30), nullable=False, default="pcs"); quantity_on_hand = db.Column(db.Numeric(18, 3), nullable=False, default=0)
    unit_price = db.Column(db.Numeric(18, 2), nullable=False, default=0); reorder_level = db.Column(db.Numeric(18, 3), nullable=False, default=0)
    is_active = db.Column(db.Boolean, nullable=False, default=True); created_by_user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)

class Transaction(db.Model, TimestampMixin):
    __tablename__ = "transactions"
    id = db.Column(db.BigInteger, primary_key=True); company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    transaction_number = db.Column(db.String(60), nullable=False); transaction_type = db.Column(db.Enum(TransactionType, name="transaction_type"), nullable=False)
    ledger_id = db.Column(db.BigInteger, db.ForeignKey("ledgers.id"), nullable=False); total_amount = db.Column(db.Numeric(18, 2), nullable=False)
    notes = db.Column(db.Text); transaction_timestamp = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    created_by_user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)
    ledger = db.relationship("Ledger", backref=db.backref("transactions", lazy=True))

class TransactionItem(db.Model):
    __tablename__ = "transaction_items"
    id = db.Column(db.BigInteger, primary_key=True); transaction_id = db.Column(db.BigInteger, db.ForeignKey("transactions.id", ondelete="CASCADE"), nullable=False)
    stock_item_id = db.Column(db.BigInteger, db.ForeignKey("stock_items.id"), nullable=False); quantity = db.Column(db.Numeric(18, 3), nullable=False)
    unit_price = db.Column(db.Numeric(18, 2), nullable=False); line_total = db.Column(db.Numeric(18, 2), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    transaction = db.relationship("Transaction", backref=db.backref("items", lazy=True, cascade="all, delete-orphan")); stock_item = db.relationship("StockItem")

class StockHistory(db.Model):
    __tablename__ = "stock_history"
    id = db.Column(db.BigInteger, primary_key=True); company_id = db.Column(db.BigInteger, db.ForeignKey("companies.id"), nullable=False)
    stock_item_id = db.Column(db.BigInteger, db.ForeignKey("stock_items.id"), nullable=False)
    transaction_id = db.Column(db.BigInteger, db.ForeignKey("transactions.id", ondelete="SET NULL")); movement_type = db.Column(db.Enum(StockMovementType, name="stock_movement_type"), nullable=False)
    quantity_change = db.Column(db.Numeric(18, 3), nullable=False); quantity_before = db.Column(db.Numeric(18, 3), nullable=False); quantity_after = db.Column(db.Numeric(18, 3), nullable=False)
    unit_price = db.Column(db.Numeric(18, 2), nullable=False, default=0); notes = db.Column(db.Text); created_by_user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    stock_item = db.relationship("StockItem", backref=db.backref("history", lazy=True))
