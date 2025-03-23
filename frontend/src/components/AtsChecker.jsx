import React, { useState } from "react";
import axios from "axios";

const AtsChecker = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [atsData, setAtsData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setAtsData(null);
    setLoading(true);

    if (!file) {
      setError("Please upload a PDF resume.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/ats/check_ats", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAtsData(response.data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "progress-success";
    if (score >= 60) return "progress-warning";
    return "progress-error";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 py-8">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">ATS Resume Checker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="file-input file-input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Analyzing..." : "Check ATS Score"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {atsData && (
          <div className="mt-6">
            {/* ATS Score */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">ATS Score</h3>
              <progress className={`progress ${getScoreColor(atsData.ats_score)} w-full`} value={atsData.ats_score} max="100"></progress>
              <p className="text-center font-bold mt-1">{atsData.ats_score} / 100</p>
            </div>

            {/* Readability Score */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Readability Score</h3>
              <progress className={`progress ${getScoreColor(atsData.readability_score)} w-full`} value={atsData.readability_score} max="100"></progress>
              <p className="text-center font-bold mt-1">{atsData.readability_score} / 100</p>
            </div>

            {/* Keyword Match Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Keyword Match</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 p-3 rounded-md">
                  <h4 className="font-semibold text-green-700">Matched Keywords</h4>
                  <ul className="text-sm text-green-600 list-disc pl-5">
                    {atsData.keyword_match.matched_keywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded-md">
                  <h4 className="font-semibold text-red-700">Missing Keywords</h4>
                  <ul className="text-sm text-red-600 list-disc pl-5">
                    {atsData.keyword_match.missing_keywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4 p-3 bg-blue-100 rounded-md">
              <h3 className="text-lg font-semibold text-blue-700">Summary</h3>
              <p className="text-sm text-blue-600">{atsData.summary}</p>
            </div>

            {/* Improvement Points */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Improvement Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {atsData.improvement_points.map((point, index) => (
                <div key={index} className="card bg-base-200 shadow-md">
                  <div className="card-body p-4">
                    <h4 className="card-title text-md font-medium">{point.title}</h4>
                    <p className="text-sm text-gray-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsChecker;
