import React from 'react';
import { motion } from 'framer-motion';

import AiPic from '../../assets/AI-concept.png'

const FineTuningSection = () => {
  return (
    <section className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          {/* "Badge" s modrým pozadím */}
          <span className="inline-block bg-white bg-opacity-5 text-[#3B82F6] text-xs md:text-sm px-4 py-2 rounded-full tracking-wide">
            AI FOR THE ENTERPRISE
          </span>
        </motion.div>

        {/* Nadpis */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Generative AI Architektúra
        </motion.h1>
      </div>
      {/* LEFT SIDE - Text */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* ĽAVÁ STRANA - Textové bloky */}
        <motion.div
          className="flex flex-col space-y-8 w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Blok 1 */}
          <div className="border-b border-gray-700 pb-6 last:border-none transition-colors duration-300 hover:text-blue-400">
            <h2 className="text-2xl font-bold mb-2">Fine-Tuning a RLHF</h2>
            <p>
              Prispôsobte najmodernejšie základné modely vášmu podnikaniu a
              vašim špecifickým dátam, aby ste vybudovali udržateľné a úspešné
              AI riešenia a čerpali dáta priamo z vašej firmy.
            </p>
          </div>

          {/* Blok 2 */}
          <div className="border-b border-gray-700 pb-6 last:border-none transition-colors duration-300 hover:text-blue-400">
            <h2 className="text-2xl font-bold mb-2">Základné modely</h2>
            <p>
              Scale spolupracuje alebo sa integruje so všetkými poprednými AI
              modelmi – od open-source až po uzavreté systémy – vrátane DeepAI,
              Google, Meta, Cohere a ďalších.
            </p>
          </div>

          {/* Blok 3 */}
          <div className="border-b border-gray-700 pb-6 last:border-none transition-colors duration-300 hover:text-blue-400">
            <h2 className="text-2xl font-bold mb-2">Podnikové dáta</h2>
            <p>
              Scale's Data Engine vám umožňuje integrovať vaše podnikové dáta do
              základov týchto modelov, čím vytvára pevný základ pre dlhodobú
              strategickú diferenciáciu.
            </p>
          </div>
        </motion.div>

      {/* RIGHT SIDE - Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={AiPic}
          alt="Foundation Models Diagram"
          className="w-full h-auto"
        />
      </motion.div>
      </div>
    </section>
  );
};

export default FineTuningSection;
