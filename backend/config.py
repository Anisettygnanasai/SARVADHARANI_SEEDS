import os
from datetime import timedelta
from urllib.parse import quote_plus
from dotenv import load_dotenv


load_dotenv(override=False)


class Config:
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
    DB_PASSWORD_ENCODED = quote_plus(DB_PASSWORD)
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_NAME = os.getenv("DB_NAME", "accounting_app")

    _DATABASE_URL = os.getenv("DATABASE_URL", "").strip()
    if _DATABASE_URL:
        # Render often provides postgres://..., SQLAlchemy expects postgresql://...
        if _DATABASE_URL.startswith("postgres://"):
            _DATABASE_URL = _DATABASE_URL.replace("postgres://", "postgresql://", 1)
        SQLALCHEMY_DATABASE_URI = _DATABASE_URL
    else:
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD_ENCODED}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-in-production")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)
    JWT_ERROR_MESSAGE_KEY = "message"

    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "true").lower() == "true"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME") or os.getenv("EMAIL_USER", "")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD") or os.getenv("EMAIL_PASS", "")

    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

    MAIL_USE_SSL = os.getenv("MAIL_USE_SSL", "false").lower() == "true"
    MAIL_FALLBACK_TO_LOG = os.getenv("MAIL_FALLBACK_TO_LOG", "true").lower() == "true"
