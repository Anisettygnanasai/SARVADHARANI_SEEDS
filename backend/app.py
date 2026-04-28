from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from sqlalchemy.exc import SQLAlchemyError
from config import Config
from models import db
from routes import ALL_BLUEPRINTS


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)

    for bp in ALL_BLUEPRINTS:
        app.register_blueprint(bp)

    @app.get("/api/health")
    def health_check():
        return jsonify({"message": "ERP API is running"})

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
