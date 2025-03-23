import os
import jinja2
import subprocess
import re
from flask import Blueprint, request, jsonify, send_file
from app.services.resume_service import generate_resume

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/generate", methods=["POST"])
def generate():
    data = request.json
    pdf_path = generate_resume(data)

    if not pdf_path:
        return jsonify({"error": "Resume generation failed"}), 500

    return send_file(pdf_path, as_attachment=True, download_name="resume.pdf")
