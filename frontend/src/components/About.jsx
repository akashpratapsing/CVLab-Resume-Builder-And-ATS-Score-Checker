import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About CV Lab</h1>
        <p className="text-lg text-gray-600 mb-6">
          CV Lab is an **AI-powered resume builder** designed to create **professional, ATS-friendly resumes** using **LaTeX-based templates**.  
          Our **smart resume generator** ensures high-quality formatting, while the **ATS Score Checker** helps optimize resumes for job applications.
        </p>
        
        {/* ✅ Key Features Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Why Choose CV Lab?</h2>
          <ul className="list-disc text-left text-gray-700 pl-5">
            <li><strong>📄 LaTeX-powered Resume Generation:</strong> Get high-quality, well-structured resumes with **professional formatting**.</li>
            <li><strong>🤖 AI-Powered ATS Score Checker:</strong> Optimize your resume using **Gemini AI** for **higher job compatibility**.</li>
            <li><strong>🎨 Customizable Resume Templates:</strong> Easily adjust layout, fonts, and sections to **match your style**.</li>
            <li><strong>📂 Instant PDF Download:</strong> Generate and **download resumes in PDF format** with one click.</li>
            <li><strong>🔍 Keyword Optimization:</strong> Identify **matched & missing job-related keywords** to **improve ATS ranking**.</li>
          </ul>
        </div>

        {/* ✅ LaTeX-Based Resume Generation */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-secondary mb-2">📄 How LaTeX Enhances Your Resume?</h2>
          <p className="text-gray-700">
            Unlike traditional resume builders, **CV Lab uses LaTeX** to **ensure a polished, structured, and professional-looking resume**.  
            With **dynamic formatting, mathematical precision, and section-based structuring**, LaTeX ensures **perfect alignment, readability, and ATS-friendliness**.
          </p>
        </div>

        {/* ✅ AI-Powered ATS Score Checker */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-secondary mb-2">📝 Optimize with ATS Score Checker</h2>
          <p className="text-gray-700">
            Our **AI-driven ATS Score Checker** evaluates your resume against **Applicant Tracking Systems (ATS)** to ensure **maximum visibility in job applications**.  
            It provides **keyword analysis, formatting suggestions, and readability improvements** to help you **get noticed by recruiters**.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

