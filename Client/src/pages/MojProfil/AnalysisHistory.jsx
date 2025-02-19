// src/components/AnalysisHistory.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const { auth } = useContext(AuthContext);

  // AnalysisHistory.jsx
useEffect(() => {
  axios
    .get("http://localhost:5000/api/analyze/history")
    .then((res) => {
      // Bezpečne skontroluj
      if (res.data && Array.isArray(res.data.analyses)) {
        setAnalyses(res.data.analyses);
      } else {
        setAnalyses([]); // Alebo nejako inak
      }
    })
    .catch((err) => {
      console.error("Chyba pri načítaní histórie:", err);
      // Môže byť 401, 403, 500 atď.
      setAnalyses([]);
    });
}, []);

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Moja história analýz</h1>

      {/* Zoznam analýz */}
      <ul>
        {analyses.map((analysis) => (
          <li key={analysis._id} className="mb-2">
            <button
              onClick={() => handleViewDetails(analysis)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Analýza z{" "}
              {new Date(analysis.createdAt).toLocaleString("sk-SK", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </button>
          </li>
        ))}
      </ul>

      {/* Detail konkrétnej analýzy */}
      {selectedAnalysis && (
        <div className="mt-6 p-4 border border-gray-700 rounded">
          <h2 className="text-xl font-bold mb-2">
            Detail analýzy ({selectedAnalysis._id})
          </h2>

          <h3 className="font-semibold">Vstupné dáta (formData):</h3>
          <pre className="bg-gray-800 p-2 rounded text-white mb-4">
            {JSON.stringify(selectedAnalysis.formData, null, 2)}
          </pre>

          <h3 className="font-semibold">AI návrhy (suggestions):</h3>
          <pre className="bg-gray-800 p-2 rounded text-white">
            {JSON.stringify(selectedAnalysis.suggestions, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;
