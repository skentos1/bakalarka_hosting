// FintechAnalysis.js
import React, { useState } from "react";
import FintechForm from "./FintechForm";
import AnalysisResult from "./AnalysisResult";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const FintechAnalysis = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState("");

  // Reset function to start a new analysis
  const resetAnalysis = () => {
    setCompanyInfo(null);
    setSuggestions(null);
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      {/* Header and Subtitle */}
      <motion.h1
        className="text-6xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          FinTech Analýza pre Váš Podnik
        </span>
      </motion.h1>
      <motion.p
        className="text-center text-xl text-gray-300 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Vykonajte jednoducho a efektívne analýzu vašej spoločnosti pomocou
        technológie poháňanej umelou inteligenciou.
      </motion.p>

      {/* AI-powered Badge */}
      <motion.div
        className="text-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-bold rounded-full">
          <FaRobot className="mr-2" />
          AI-powered
        </span>
      </motion.div>

      {/* Render Form or AnalysisResult based on whether suggestions are available */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {!suggestions ? (
          <FintechForm
            setCompanyInfo={setCompanyInfo}
            setSuggestions={setSuggestions}
            setError={setError}
          />
        ) : (
          <AnalysisResult
            companyInfo={companyInfo}
            suggestions={suggestions}
            resetAnalysis={resetAnalysis} // Passing the reset function
          />
        )}
      </motion.div>

      {/* Display error if any */}
      {error && (
        <motion.p
          className="text-red-500 mt-6 text-center font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Chyba: {error}
        </motion.p>
      )}
    </div>
  );
};

export default FintechAnalysis;
