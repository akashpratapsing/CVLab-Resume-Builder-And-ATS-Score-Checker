import re

def escape_latex(text):
    """Escapes special LaTeX characters and removes unsupported symbols."""
    if not isinstance(text, str):
        return text

    replacements = {
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
        "\\": r"\textbackslash{}",
        "✔": r"$\checkmark$",  # Convert checkmarks
        "•": r"$\bullet$",  # Convert bullet points
        "’": "'",  # Replace curly apostrophes with standard ones
        "–": "--",  # Convert en-dash
        "—": "---",  # Convert em-dash
    }

    return re.sub(r"([&%$#_{}~^\\✔•’–—])", lambda match: replacements.get(match.group(), ""), text)

