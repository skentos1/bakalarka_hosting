// Recommendations.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Recommendations = ({ data }) => {
  const [openPanels, setOpenPanels] = useState([0]);

  const togglePanel = (index) => {
    setOpenPanels((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!data || data.length === 0) {
    return <p>Žiadne odporúčania na zobrazenie.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Odporúčané FinTech riešenia
      </h3>
      <div className="space-y-4">
        {data.map((rec, index) => (
          <div key={index} className="bg-gray-800 rounded-md">
            <button
              onClick={() => togglePanel(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-200 focus:outline-none focus:ring focus:ring-purple-500 rounded-md"
            >
              <div className="flex items-center">
                <FaLightbulb className="text-yellow-400 mr-2" />
                <span className="font-medium">{rec.title}</span>
              </div>
              {openPanels.includes(index) ? (
                <FaChevronUp className="h-5 w-5" />
              ) : (
                <FaChevronDown className="h-5 w-5" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {openPanels.includes(index) && (
                <motion.div
                  key={`content-${index}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: "auto", opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 border-t border-gray-700 text-gray-300">
                    <p className="mb-2">
                      <strong>Popis odporúčania:</strong> {rec.description}
                    </p>
                    <p className="mb-2">
                      <strong>Implementačné kroky:</strong>
                    </p>
                    <ol className="list-decimal ml-6 mb-2">
                      {rec.implementationSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                    <p className="mb-2">
                      <strong>Očakávané náklady:</strong> {rec.expectedCosts}
                    </p>
                    <p className="mb-2">
                      <strong>Potenciálne výhody:</strong>{" "}
                      {rec.potentialBenefits}
                    </p>
                    <p className="mb-2">
                      <strong>Riziká a výzvy:</strong> {rec.risks}
                    </p>
                    <p>
                      <strong>Príklady úspešného využitia:</strong>{" "}
                      {rec.examples}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
