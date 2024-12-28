// AnalysisTabs.js
import React, { useState } from "react";
import CurrentState from "./CurrentState";
import Recommendations from "./Recommendations";
import FinancialPlanning from "./FinancialPlanning";
import Conclusion from "./Conclusion";
import {
  FaInfoCircle,
  FaLightbulb,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AnalysisTabs = ({ companyInfo, analysis }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Základný stav", icon: FaInfoCircle },
    { name: "Odporúčania", icon: FaLightbulb },
    { name: "Finančné plánovanie", icon: FaChartLine },
    { name: "Záver", icon: FaCheckCircle },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 0:
        return <CurrentState data={companyInfo} />;
      case 1:
        return <Recommendations data={analysis.recommendations} />;
      case 2:
        return <FinancialPlanning data={analysis.financialPlanning} />;
      case 3:
        return <Conclusion data={analysis.conclusion} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-12 bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-semibold  text-center pb-4">
        Analýza a Odporúčania
      </h2>
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition duration-200 ${
                activeTab === index
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300 focus:outline-none focus:text-gray-300 focus:border-gray-300"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabContent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnalysisTabs;
