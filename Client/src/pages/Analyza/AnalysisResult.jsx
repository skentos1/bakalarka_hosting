// AnalysisResult.js
import React from "react";
import AnalysisTabs from "./AnalysisTabs";

const AnalysisResult = ({ companyInfo, suggestions, resetAnalysis }) => {
  return (
    <div>
      <AnalysisTabs companyInfo={companyInfo} analysis={suggestions} />
      {/* Tlačidlo pre novú analýzu */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={resetAnalysis}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          Nová analýza
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
