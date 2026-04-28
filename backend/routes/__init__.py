from .auth import auth_bp
from .ledger import ledger_bp
from .stock import stock_bp
from .transaction import transaction_bp


ALL_BLUEPRINTS = [auth_bp, ledger_bp, stock_bp, transaction_bp]
