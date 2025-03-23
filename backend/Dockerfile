# Use an official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies including LaTeX
RUN apt-get update && apt-get install -y \
    build-essential \
    texlive-latex-base \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-latex-recommended \
    texlive-latex-extra \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose backend port
EXPOSE 5000

# Run Flask app with Gunicorn
CMD ["gunicorn", "wsgi:app", "--bind", "0.0.0.0:5000"]
