import React from "react";
import { motion } from "framer-motion";
import CryptoMarquee from "./logos";

const FounderMessage = () => {
  return (
    <div className="bg-black text-white pt-10 pb-20 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.button
          className="px-6 py-2 mb-8 rounded-full border-2 text-xl"
          style={{
            backgroundColor: "rgba(93, 63, 211, 0.1)", // Jemne matná fialová
            borderColor: "rgba(93, 63, 211, 0.2)", // Tenký a jemný fialový border
            color: "white",
          }}
          whileHover={{
            backgroundColor: "rgba(93, 63, 211, 0.3)", // Zosvetlenie pri hoveri
            scale: 1.05,
          }}
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Prečítajte si viac o blockchaine
        </motion.button>

        {/* Main Title */}
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-10 leading-tight text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Objavte, ako Blockchain mení FinTech
        </motion.h1>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.div
            className="border-r-1 p-6 rounded-lg shadow-md text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Blockchain: Transparentnosť a Bezpečnosť
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Blockchain poskytuje vyššiu transparentnosť a bezpečnosť vo
              finančných transakciách. Prečítajte si, ako FinTech spoločnosti
              používajú blockchain na ochranu údajov a zníženie rizika podvodov.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg shadow-md text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Výhody Blockchainu pre Finančné Služby
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Vďaka rýchlejším transakciám a eliminácii sprostredkovateľov
              umožňuje blockchain zníženie nákladov a zvýšenie efektivity vo
              FinTech sektore.
            </p>
          </motion.div>
        </div>
      </div>
      <CryptoMarquee />
    </div>
  );
};

export default FounderMessage;
