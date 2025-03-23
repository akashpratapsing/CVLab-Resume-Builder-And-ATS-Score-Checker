import os
import json
from flask import jsonify
import google.generativeai as genai
from pdfminer.high_level import extract_text


# Configure Gemini API
# GEMINI_API_KEY = "AIzaSyDID353ct6wTjLA_zUXXO9PgC2i3scuEWA" 
# genai.configure(api_key=GEMINI_API_KEY)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") 
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("Gemini API configured successfully")
else:
    print("ERROR: No API key found. Please set the GEMINI_API_KEY environment variable.")

def analyze_resume(filepath):
    """Analyzes the resume text and returns structured JSON data."""
    try:
        text = extract_text(filepath).strip()
        if not text:
            return {
                "ats_score": None,
                "summary": "The resume appears to be empty. Ensure the text is selectable.",
                "improvement_points": [],
                "keyword_match": {"matched_keywords": [], "missing_keywords": []},
                "readability_score": None
            }

        # ✅ Construct AI Prompt
        prompt = f"""
        You are an AI-powered ATS (Applicant Tracking System) evaluator, specializing in resume analysis.
        Analyze the resume provided and return a JSON response with the following structure:

        {{
          "ats_score": (integer) A numerical score between 0-100.
          "summary": (string) A brief summary of resume’s strengths & weaknesses.
          "improvement_points": [
            {{
              "title": (string) Improvement title,
              "description": (string) Explanation & actionable steps.
            }}
          ],
          "keyword_match": {{
            "matched_keywords": [(list of strings) Keywords found in the resume],
            "missing_keywords": [(list of strings) Important keywords missing from the resume]
          }},
          "readability_score": (integer) A score between 0-100 for clarity and structure.
        }}

        ### Resume Text:
        {text}
        """

        # ✅ Send Prompt to Gemini AI
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)

        if not response or not response.text.strip():
            return {
                "ats_score": None,
                "summary": "Could not process the resume. Try again.",
                "improvement_points": [],
                "keyword_match": {"matched_keywords": [], "missing_keywords": []},
                "readability_score": None
            }

        raw_response = response.text.strip()

        # ✅ Clean AI Response (Remove Markdown Code Blocks)
        raw_response = raw_response.replace("```json", "").replace("```", "").strip()

        # ✅ Parse JSON Response Safely
        try:
            parsed_response = json.loads(raw_response)

            # Extract fields with fallback values
            ats_score = parsed_response.get("ats_score", None)
            summary = parsed_response.get("summary", "No summary provided.")
            improvement_points = parsed_response.get("improvement_points", [])
            keyword_match = parsed_response.get("keyword_match", {"matched_keywords": [], "missing_keywords": []})
            readability_score = parsed_response.get("readability_score", None)

            return {
                "ats_score": ats_score,
                "summary": summary,
                "improvement_points": improvement_points,
                "keyword_match": keyword_match,
                "readability_score": readability_score
            }

        except json.JSONDecodeError as e:
            print(f"JSON Parsing Error: {str(e)}")
            return {
                "ats_score": None,
                "summary": "Error processing AI response. Please try again.",
                "improvement_points": [],
                "keyword_match": {"matched_keywords": [], "missing_keywords": []},
                "readability_score": None
            }

    except Exception as e:
        print(f"ERROR in analyze_resume: {str(e)}")
        return {
            "ats_score": None,
            "summary": f"Backend error: {str(e)}",
            "improvement_points": [],
            "keyword_match": {"matched_keywords": [], "missing_keywords": []},
            "readability_score": None
        }
