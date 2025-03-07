import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://bakalarka-hosting.onrender.com/api/analyze/history")
      .then((res) => {
        if (res.data && Array.isArray(res.data.analyses)) {
          setAnalyses(res.data.analyses);
        } else {
          setAnalyses([]);
        }
      })
      .catch((err) => {
        console.error("Chyba pri načítaní histórie:", err);
        setAnalyses([]);
      });
  }, []);

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const handleCloseDetails = () => {
    setSelectedAnalysis(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Moja história analýz</h1>

      {/* Zoznam analýz v responzívnej mriežke */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {analyses.map((analysis) => (
          <button
            key={analysis._id}
            onClick={() => handleViewDetails(analysis)}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full text-left transition hover:bg-purple-700"
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
        ))}
      </div>

      {/* Detail konkrétnej analýzy */}
      {selectedAnalysis && (
        <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Detail analýzy ({selectedAnalysis._id})
            </h2>
            <button
              onClick={handleCloseDetails}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Zatvoriť
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Vstupné dáta (formData):</h3>
            <pre className="bg-gray-700 p-2 rounded text-white overflow-x-auto mb-4 text-xs sm:text-sm">
              {JSON.stringify(selectedAnalysis.formData, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">AI návrhy (suggestions):</h3>
            <pre className="bg-gray-700 p-2 rounded text-white overflow-x-auto text-xs sm:text-sm">
              {JSON.stringify(selectedAnalysis.suggestions, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;
