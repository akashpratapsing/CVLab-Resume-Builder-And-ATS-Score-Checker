# CVLab 🧠📄

**CVLab** is a full-stack web application that helps users generate professional, ATS-optimized resumes. It combines a LaTeX-powered resume builder with AI-driven ATS score analysis using Google's Gemini API.

---

## 🚀 Features

- ⚙️ **Form-based Resume Builder** with live preview
- 🧠 **ATS Score Checker** using Gemini Pro (Google Generative AI)
- 📄 **PDF Resume Generation** via LaTeX
- ✅ **AI Suggestions** for improving ATS compatibility
- 🎯 **Tech Stack**: React, Flask, Tailwind, DaisyUI, LaTeX, Docker

---

## 📸 Screenshots & Demo

<!-- 👉 Replace the link below with your actual YouTube video or Loom recording -->
### 🎥 Demo Video  
[Watch Demo](project_cvlab.mp4)



---

## 🛠 Tech Stack

### Frontend
- **React** (Vite) + **Tailwind CSS**
- **Daisy UI** for elegant components
- Axios for API integration

### Backend
- **Flask** (Python)
- **pdfminer.six** – PDF parsing
- **Jinja2 + LaTeX** – Resume template engine
- **Gemini API** – ATS evaluation via Generative AI
- **Gunicorn** for production server

### Deployment
- **Dockerized Backend**
- Frontend can be deployed on **Vercel**, **Netlify**, etc.

---

## 🐳 Local Development (Docker Backend)

```bash
 # Step 1: Build the container
docker build -t resume-builder .

# Step 2: Run the container
docker run -p 5000:5000 resume-builder

Make sure to set your Google Gemini API key:
```

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
Add this to .env or pass as a Docker environment variable.
