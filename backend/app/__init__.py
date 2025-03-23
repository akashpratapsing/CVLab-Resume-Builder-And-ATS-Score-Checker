from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow frontend to communicate with the backend

    app.config.from_object(Config)

    # Register blueprints
    from app.routes.resume import resume_bp
    from app.routes.ats import ats_bp

    app.register_blueprint(resume_bp, url_prefix="/resume")
    app.register_blueprint(ats_bp, url_prefix="/ats")

    return app
