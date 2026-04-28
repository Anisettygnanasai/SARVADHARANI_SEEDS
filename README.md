# SARVADHARANI_SEEDS
# SARVADHARANI_SEEDS

Modern lightweight accounting ERP inspired by Tally ERP.

## Stack
- Frontend: React + Tailwind CSS + Axios
- Backend: Flask + SQLAlchemy + Flask-JWT-Extended
- Database: PostgreSQL

## Project Structure

```text
backend/
├── app.py
├── config.py
├── models/
├── routes/
├── services/
└── utils/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── App.js
```

## Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql+psycopg2://postgres:postgres@localhost:5432/erp_db"
export JWT_SECRET_KEY="replace-with-secure-key"
python app.py
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```


### Frontend prerequisites (important)

- Use Node.js **20.x** (recommended: 20.14.0+).
- Use npm **10.x** (do not upgrade to npm 11 on Node 20).

Quick checks:

```bash
node -v
npm -v
```

If `npm start` shows `Could not find a required file: public/index.html`, ensure this file exists at `frontend/public/index.html`.

## Authentication & Authorization
- `/api/auth/register`
- `/api/auth/login`
- Role-based access: `admin`, `accountant`

## Core Modules
- Ledger management APIs under `/api/ledgers`
- Stock management APIs under `/api/stocks`
- Transaction APIs under `/api/transactions`

## Database
Run `database/schema.sql` first to create tables and enums.
