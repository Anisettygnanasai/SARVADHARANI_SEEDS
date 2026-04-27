-- STEP 1: PostgreSQL schema for lightweight accounting ERP

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===== Enums =====
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'accountant');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ledger_type') THEN
        CREATE TYPE ledger_type AS ENUM ('customer', 'supplier', 'expense');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM ('sales', 'purchase', 'payment', 'receipt');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stock_movement_type') THEN
        CREATE TYPE stock_movement_type AS ENUM ('in', 'out', 'adjustment');
    END IF;
END
$$;

-- ===== Utility trigger for updated_at =====
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ===== Users =====
CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL PRIMARY KEY,
    full_name       VARCHAR(120) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    role            user_role NOT NULL DEFAULT 'accountant',
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_users_set_updated_at ON users;
CREATE TRIGGER trg_users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- ===== Ledgers =====
CREATE TABLE IF NOT EXISTS ledgers (
    id                  BIGSERIAL PRIMARY KEY,
    name                VARCHAR(180) NOT NULL,
    ledger_code         VARCHAR(50) NOT NULL UNIQUE,
    ledger_type         ledger_type NOT NULL,
    opening_balance     NUMERIC(18,2) NOT NULL DEFAULT 0,
    current_balance     NUMERIC(18,2) NOT NULL DEFAULT 0,
    contact_person      VARCHAR(120),
    phone               VARCHAR(30),
    email               VARCHAR(255),
    address             TEXT,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_user_id  BIGINT NOT NULL REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_ledgers_balances CHECK (
        opening_balance >= -9999999999999999.99
        AND current_balance >= -9999999999999999.99
    )
);

CREATE INDEX IF NOT EXISTS idx_ledgers_type ON ledgers (ledger_type);
CREATE INDEX IF NOT EXISTS idx_ledgers_name ON ledgers (name);

DROP TRIGGER IF EXISTS trg_ledgers_set_updated_at ON ledgers;
CREATE TRIGGER trg_ledgers_set_updated_at
BEFORE UPDATE ON ledgers
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- ===== Stock Items =====
CREATE TABLE IF NOT EXISTS stock_items (
    id                  BIGSERIAL PRIMARY KEY,
    sku                 VARCHAR(80) NOT NULL UNIQUE,
    name                VARCHAR(180) NOT NULL,
    description         TEXT,
    unit                VARCHAR(30) NOT NULL DEFAULT 'pcs',
    quantity_on_hand    NUMERIC(18,3) NOT NULL DEFAULT 0,
    unit_price          NUMERIC(18,2) NOT NULL DEFAULT 0,
    reorder_level       NUMERIC(18,3) NOT NULL DEFAULT 0,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_user_id  BIGINT NOT NULL REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_stock_quantities CHECK (
        quantity_on_hand >= 0
        AND reorder_level >= 0
        AND unit_price >= 0
    )
);

CREATE INDEX IF NOT EXISTS idx_stock_items_name ON stock_items (name);

DROP TRIGGER IF EXISTS trg_stock_items_set_updated_at ON stock_items;
CREATE TRIGGER trg_stock_items_set_updated_at
BEFORE UPDATE ON stock_items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- ===== Transactions Header =====
CREATE TABLE IF NOT EXISTS transactions (
    id                      BIGSERIAL PRIMARY KEY,
    transaction_number      VARCHAR(60) NOT NULL UNIQUE,
    transaction_type        transaction_type NOT NULL,
    ledger_id               BIGINT NOT NULL REFERENCES ledgers(id),
    total_amount            NUMERIC(18,2) NOT NULL,
    notes                   TEXT,
    transaction_timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by_user_id      BIGINT NOT NULL REFERENCES users(id),
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_transactions_total_amount CHECK (total_amount > 0)
);

CREATE INDEX IF NOT EXISTS idx_transactions_ledger ON transactions (ledger_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions (transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_ts ON transactions (transaction_timestamp DESC);

DROP TRIGGER IF EXISTS trg_transactions_set_updated_at ON transactions;
CREATE TRIGGER trg_transactions_set_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- ===== Transaction Items (stock lines) =====
CREATE TABLE IF NOT EXISTS transaction_items (
    id                  BIGSERIAL PRIMARY KEY,
    transaction_id      BIGINT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    stock_item_id       BIGINT NOT NULL REFERENCES stock_items(id),
    quantity            NUMERIC(18,3) NOT NULL,
    unit_price          NUMERIC(18,2) NOT NULL,
    line_total          NUMERIC(18,2) NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_transaction_items_values CHECK (
        quantity > 0
        AND unit_price >= 0
        AND line_total >= 0
    ),
    CONSTRAINT uq_transaction_stock_line UNIQUE (transaction_id, stock_item_id)
);

CREATE INDEX IF NOT EXISTS idx_transaction_items_transaction ON transaction_items (transaction_id);
CREATE INDEX IF NOT EXISTS idx_transaction_items_stock_item ON transaction_items (stock_item_id);

-- ===== Stock History (auditable stock movements) =====
CREATE TABLE IF NOT EXISTS stock_history (
    id                      BIGSERIAL PRIMARY KEY,
    stock_item_id           BIGINT NOT NULL REFERENCES stock_items(id),
    transaction_id          BIGINT REFERENCES transactions(id) ON DELETE SET NULL,
    movement_type           stock_movement_type NOT NULL,
    quantity_change         NUMERIC(18,3) NOT NULL,
    quantity_before         NUMERIC(18,3) NOT NULL,
    quantity_after          NUMERIC(18,3) NOT NULL,
    unit_price              NUMERIC(18,2) NOT NULL DEFAULT 0,
    notes                   TEXT,
    created_by_user_id      BIGINT NOT NULL REFERENCES users(id),
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_stock_history_quantity_nonzero CHECK (quantity_change <> 0),
    CONSTRAINT chk_stock_history_nonnegative_after CHECK (quantity_after >= 0)
);

CREATE INDEX IF NOT EXISTS idx_stock_history_stock_item ON stock_history (stock_item_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stock_history_transaction ON stock_history (transaction_id);

-- ===== Helpful view for ledger balances by transaction impact =====
CREATE OR REPLACE VIEW v_ledger_transaction_summary AS
SELECT
    l.id AS ledger_id,
    l.name AS ledger_name,
    l.ledger_type,
    COUNT(t.id) AS transaction_count,
    COALESCE(SUM(t.total_amount), 0)::NUMERIC(18,2) AS transaction_total
FROM ledgers l
LEFT JOIN transactions t ON t.ledger_id = l.id
GROUP BY l.id, l.name, l.ledger_type;
