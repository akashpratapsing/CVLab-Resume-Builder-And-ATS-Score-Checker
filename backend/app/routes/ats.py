import os
from flask import Blueprint, request, jsonify, send_file
from app.services.ats_service import analyze_resume

ats_bp = Blueprint("ats", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@ats_bp.route('/check_ats', methods=['POST'])
def check_ats():
    """Handles ATS resume analysis API request."""
    if 'resume' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['resume']

    # ✅ Allow only PDF files
    if not file.filename.endswith(".pdf"):
        return jsonify({"error": "Only PDF resumes are supported"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        # ✅ Analyze Resume
        response_data = analyze_resume(filepath)
    finally:
        # ✅ Delete the file after processing
        os.remove(filepath)

    return jsonify(response_data), 200