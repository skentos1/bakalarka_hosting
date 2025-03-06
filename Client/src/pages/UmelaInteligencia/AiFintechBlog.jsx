import React from "react";
import { motion } from "framer-motion";
import { aiFintechData } from "../../data/ai";

const AIFintechBlog = () => {
  return (
    <div className="text-white py-12 px-4 sm:px-8">
      <div className="max-w-full sm:max-w-5xl mx-auto">
        {/* Hlavný nadpis */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Umelá inteligencia vo FinTech: Všetko, čo potrebujete vedieť
        </motion.h1>

        {/* Sekcie blogu */}
        {aiFintechData.map((section, index) => (
          <motion.div
            key={index}
            className="mb-8 sm:mb-12 p-4 sm:p-8 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Nadpis sekcie s číslom */}
            <div className="mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl font-semibold text-blue-400 mr-2">
                {index + 1}.
              </span>
              <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {section.title}
              </h2>
            </div>

            {/* Obsah sekcie */}
            <div className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
              <p className="mb-4">{section.description}</p>

              <div className="bg-gradient-to-l from-blue-500 to-transparent border-l-4 border-blue-400 pl-4 italic my-4 py-2 text-gray-200">
                <strong>Praktický príklad:</strong> {section.realWorldExample}
              </div>

              <p className="mt-4">{section.detailedInfo}</p>

              {/* Kľúčové body */}
              <ul className="mt-6 list-disc list-inside text-gray-300">
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Záverečné zhrnutie */}
        <motion.div
          className="p-4 sm:p-6 text-center text-gray-400 italic border-t border-gray-600 mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            Umelá inteligencia transformuje FinTech sektor, prinášajúc rýchlejšie a efektívnejšie
            finančné operácie, personalizované služby a zvýšenú bezpečnosť.
          </p>
          <p className="mt-4">
            Využite potenciál AI a posuňte svoje finančné technológie na novú úroveň!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AIFintechBlog;
