from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)

    # Config
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret")
    app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER", "uploads")
    app.config["MAX_CONTENT_LENGTH"] = int(os.getenv("MAX_CONTENT_LENGTH", 16 * 1024 * 1024))

    # CORS
    CORS(app, origins=[
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
        "http://localhost:5173"
    ])

    # Ensure upload folder exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Register blueprints
    from app.routes.upload_routes import upload_bp
    from app.routes.analysis_routes import analysis_bp
    from app.routes.recommendation_routes import recommendation_bp
    from app.routes.auth_routes import auth_bp
    from app.routes.chat_routes import chat_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(chat_bp, url_prefix="/api/chat")

    app.register_blueprint(upload_bp, url_prefix="/api/upload")
    app.register_blueprint(analysis_bp, url_prefix="/api/analysis")
    app.register_blueprint(recommendation_bp, url_prefix="/api/recommendations")

    return app
