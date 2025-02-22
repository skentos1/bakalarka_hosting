import React from "react";
import { motion } from "framer-motion";
import { blockchainData } from "../../data/blockchain";

const BlockchainBlog = () => {
  return (
    <div className="text-white py-12 px-4 sm:px-8">
      <div className="max-w-full sm:max-w-5xl mx-auto">
        {/* Main Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blockchain vo FinTech: Všetko, čo potrebujete vedieť
        </motion.h1>

        {/* Blog Sections */}
        {blockchainData.map((section, index) => (
          <motion.div
            key={index}
            className="mb-8 sm:mb-12 p-4 sm:p-8 rounded-lg shadow-md "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Section Title with Number */}
            <div className="mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl font-semibold text-purple-400 mr-2">
                {index + 1}.
              </span>
              <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {section.title}
              </h2>
            </div>

            {/* Section Content */}
            <div className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
              <p className="mb-4">{section.description}</p>

              <div className="bg-gradient-to-l from-purple-500 to-transparent border-l-4 border-purple-400 pl-4 italic my-4 py-2 text-gray-200">
                <strong>Praktický príklad:</strong> {section.realWorldExample}
              </div>

              <p className="mt-4">{section.detailedInfo}</p>

              {/* Key Points */}
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

        {/* Final Note Section */}
        <motion.div
          className="p-4 sm:p-6 text-center text-gray-400 italic border-t border-gray-600 mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            Blockchain technológia prináša revolúciu v oblasti finančných služieb.
            Je nevyhnutnou súčasťou FinTech inovácií, prinášajúc transparentnosť,
            bezpečnosť a efektivitu.
          </p>
          <p className="mt-4">
            Preskúmajte, ako blockchain môže zlepšiť vaše podnikanie už dnes!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockchainBlog;
