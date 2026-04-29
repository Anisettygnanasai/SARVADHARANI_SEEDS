CREATE EXTENSION IF NOT EXISTS pgcrypto;

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
END $$;

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS companies (
    id BIGSERIAL PRIMARY KEY,
    company_code VARCHAR(50) NOT NULL UNIQUE,
    company_name VARCHAR(180) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id),
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'accountant',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, email)
);

CREATE TABLE IF NOT EXISTS ledgers (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id), name VARCHAR(180) NOT NULL,
    ledger_code VARCHAR(50) NOT NULL, ledger_type ledger_type NOT NULL,
    opening_balance NUMERIC(18,2) NOT NULL DEFAULT 0, current_balance NUMERIC(18,2) NOT NULL DEFAULT 0,
    contact_person VARCHAR(120), phone VARCHAR(30), email VARCHAR(255), address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE, created_by_user_id BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, ledger_code)
);

CREATE TABLE IF NOT EXISTS stock_items (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id), sku VARCHAR(80) NOT NULL,
    name VARCHAR(180) NOT NULL, description TEXT, unit VARCHAR(30) NOT NULL DEFAULT 'pcs',
    quantity_on_hand NUMERIC(18,3) NOT NULL DEFAULT 0, unit_price NUMERIC(18,2) NOT NULL DEFAULT 0,
    reorder_level NUMERIC(18,3) NOT NULL DEFAULT 0, is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_user_id BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, sku)
);

CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id),
    transaction_number VARCHAR(60) NOT NULL, transaction_type transaction_type NOT NULL,
    ledger_id BIGINT NOT NULL REFERENCES ledgers(id), total_amount NUMERIC(18,2) NOT NULL,
    notes TEXT, transaction_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by_user_id BIGINT NOT NULL REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(company_id, transaction_number)
);

CREATE TABLE IF NOT EXISTS transaction_items (
    id BIGSERIAL PRIMARY KEY,
    transaction_id BIGINT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    stock_item_id BIGINT NOT NULL REFERENCES stock_items(id), quantity NUMERIC(18,3) NOT NULL,
    unit_price NUMERIC(18,2) NOT NULL, line_total NUMERIC(18,2) NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stock_history (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id),
    stock_item_id BIGINT NOT NULL REFERENCES stock_items(id),
    transaction_id BIGINT REFERENCES transactions(id) ON DELETE SET NULL,
    movement_type stock_movement_type NOT NULL, quantity_change NUMERIC(18,3) NOT NULL,
    quantity_before NUMERIC(18,3) NOT NULL, quantity_after NUMERIC(18,3) NOT NULL,
    unit_price NUMERIC(18,2) NOT NULL DEFAULT 0, notes TEXT,
    created_by_user_id BIGINT NOT NULL REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS admin_invites (
 id BIGSERIAL PRIMARY KEY,
 company_id BIGINT NOT NULL REFERENCES companies(id),
 email VARCHAR(255) NOT NULL,
 token VARCHAR(255) UNIQUE NOT NULL,
 created_by BIGINT REFERENCES users(id),
 expires_at TIMESTAMPTZ NOT NULL,
 used BOOLEAN NOT NULL DEFAULT FALSE,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS otp_verifications (
 id BIGSERIAL PRIMARY KEY,
 company_id BIGINT NOT NULL REFERENCES companies(id),
 email VARCHAR(255) NOT NULL,
 otp VARCHAR(6) NOT NULL,
 purpose VARCHAR(40) NOT NULL,
 expires_at TIMESTAMPTZ NOT NULL,
 verified BOOLEAN NOT NULL DEFAULT FALSE,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO companies (company_code, company_name, is_active)
VALUES ('ANITS1', 'Anil Neerukonda Institute of Technology and Science', TRUE)
ON CONFLICT (company_code) DO NOTHING;
