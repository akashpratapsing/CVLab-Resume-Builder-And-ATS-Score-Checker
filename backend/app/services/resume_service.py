import os
import jinja2
import subprocess
import shutil
from app.utils import escape_latex

TEMPLATE_PATH = "resume_template.tex"  
OUTPUT_DIR = os.path.abspath("output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

latex_jinja_env = jinja2.Environment(
    block_start_string=r'\BLOCK{',
    block_end_string=r'}',
    variable_start_string=r'\VAR{',
    variable_end_string=r'}',
    loader=jinja2.FileSystemLoader(os.path.abspath('app/templates'))  
)

def format_resume_data(data):
    """Formats and escapes user input for LaTeX."""
    
    # Escape main fields
    data = {k: escape_latex(v) if isinstance(v, str) else v for k, v in data.items()}
    
    # Format sections
    data["education"] = [
        {
            "institution": escape_latex(edu["institution"]),
            "location": escape_latex(edu["location"]),
            "degree": escape_latex(edu["degree"]),
            "dates": escape_latex(edu["dates"]),
        }
        for edu in data.get("education", [])
    ]

    data["experience"] = [
        {
            "title": escape_latex(exp["title"]),
            "company": escape_latex(exp["company"]),
            "location": escape_latex(exp["location"]),
            "dates": escape_latex(exp["dates"]),
            "details": "\n".join([f"\\resumeItem{{{escape_latex(bullet)}}}" for bullet in exp["details"]])
        }
        for exp in data.get("experience", [])
    ]

    data["projects"] = [
        {
            "name": escape_latex(proj["name"]),
            "dates": escape_latex(proj["dates"]),
            "tech": escape_latex(proj["tech"]),
            "details": "\n".join([f"\\resumeItem{{{escape_latex(bullet)}}}" for bullet in proj["details"]])
        }
        for proj in data.get("projects", [])
    ]

    return data

def generate_resume(data):
    """Generates a PDF resume from LaTeX template."""
    if not shutil.which("pdflatex"):  # Checks if pdflatex is installed
        raise EnvironmentError("pdflatex is not installed or not in PATH.")

    try:
        template = latex_jinja_env.get_template(TEMPLATE_PATH)
    except jinja2.TemplateNotFound:
        raise FileNotFoundError(f"Template '{TEMPLATE_PATH}' not found in 'app/templates/'")  # Better error handling

    formatted_data = format_resume_data(data)  # Format the data before rendering
    filled_latex = template.render(formatted_data)

    tex_file_path = os.path.join(OUTPUT_DIR, "resume.tex")
    with open(tex_file_path, "w", encoding="utf-8") as file:  
       file.write(filled_latex)


    pdflatex_cmd = ["pdflatex", "-interaction=nonstopmode", "-output-directory", OUTPUT_DIR, tex_file_path]
    for _ in range(2):
        result = subprocess.run(pdflatex_cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print("PDFLaTeX Error:", result.stderr)  # Print the error output for debugging
            return None

    pdf_path = os.path.join(OUTPUT_DIR, "resume.pdf")
    return pdf_path if os.path.exists(pdf_path) else None

