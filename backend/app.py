from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from config import Config
from models import db
from routes import ALL_BLUEPRINTS


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)

    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=False,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    )

    for bp in ALL_BLUEPRINTS:
        app.register_blueprint(bp)

    @app.get("/api/health")
    def health_check():
        return jsonify(
            {
                "message": "ERP API is running",
                "database_url_configured": bool(app.config.get("SQLALCHEMY_DATABASE_URI")),
            }
        )

    @app.get("/api/health/db")
    def db_health_check():
        try:
            db.session.execute(text("SELECT 1"))
            return jsonify({"message": "Database connection successful"}), 200
        except SQLAlchemyError as exc:
            db.session.rollback()
            return (
                jsonify(
                    {
                        "message": "Database connection failed",
                        "error": str(getattr(exc, "orig", exc)),
                    }
                ),
                500,
            )

    @app.get("/api/health/config")
    def config_health_check():
        db_uri = app.config.get("SQLALCHEMY_DATABASE_URI", "")
        masked_db_uri = db_uri.split("@")[-1] if "@" in db_uri else db_uri
        return jsonify(
            {
                "database_target": masked_db_uri,
                "jwt_configured": bool(app.config.get("JWT_SECRET_KEY")),
            }
        ), 200

    @app.errorhandler(SQLAlchemyError)
    def handle_db_error(_):
        db.session.rollback()
        return jsonify({"message": "Database operation failed"}), 500

    @app.errorhandler(404)
    def handle_not_found(_):
        return jsonify({"message": "Resource not found"}), 404

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
