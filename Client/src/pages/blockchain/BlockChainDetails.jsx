import React, { useState } from "react";
import { motion } from "framer-motion";
import { blockchainData } from "../../data/blockchain";
import {
  FaNetworkWired,
  FaLock,
  FaEye,
  FaBolt,
  FaRocket,
} from "react-icons/fa";

const BlockchainExpandableCards = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default open card

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const icons = [
    <FaNetworkWired size={40} />,
    <FaLock size={40} />,
    <FaEye size={40} />,
    <FaBolt size={40} />,
    <FaRocket size={40} />,
  ];

  return (
    <div className="text-white py-16 px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <h1 className="text-center text-5xl sm:text-6xl font-extrabold mb-12 leading-tight  ">
          Kľúčové Výhody Blockchainu
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blockchainData.map((section, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-lg cursor-pointer transition-all ${
                activeIndex === index
                  ? "col-span-2 lg:col-span-1 lg:row-span-2 bg-gradient-to-r from-[#6b2cf1] to-[#7e57c2] text-white shadow-xl"
                  : "bg-[#170d2b] text-gray-300"
              }`}
              onClick={() => handleCardClick(index)}
              initial={{ scale: 1 }}
              animate={{ scale: activeIndex === index ? 1.05 : 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon for each card */}
              <div className="mb-6 text-purple-400">{icons[index]}</div>

              {/* Card Title */}
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
                {section.title}
              </h3>

              {/* Card Description */}
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-4">
                {activeIndex === index
                  ? section.description
                  : section.description.slice(0, 70) + "..."}
              </p>

              {/* Conditionally show more details when card is expanded */}
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                    {section.detailedInfo}
                  </p>
                  <p className="text-gray-300 italic mt-4">
                    <strong>Praktický príklad:</strong>{" "}
                    {section.realWorldExample}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainExpandableCards;
