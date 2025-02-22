import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import bitcoin from "../../assets/bitcoin.svg";
import ethereum from "../../assets/ethereum.svg";
import cardano from "../../assets/cardano.svg";
import litecoin from "../../assets/litecoin-.svg";
import xrp from "../../assets/xrp.svg";
import polkadot from "../../assets/polkadot.svg";

const CryptoMarquee = () => {
  const [loading, setLoading] = useState(true);

  const cryptoData = [
    {
      name: "Bitcoin",
      logo: bitcoin,
      info: "Decentralized digital currency",
    },
    { name: "Ethereum", logo: ethereum, info: "Smart contract platform" },
    { name: "XRP", logo: xrp, info: "Real-time gross settlement" },
    { name: "Litecoin", logo: litecoin, info: "Faster transactions" },
    {
      name: "Cardano",
      logo: cardano,
      info: "Sustainable blockchain platform",
    },
    { name: "Polkadot", logo: polkadot, info: "Interoperable blockchains" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="border-t-4 border-b-4 border-purple-500 rounded-full w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-black pt-20 pb-6 sm:pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-4 sm:mb-8 px-4">
        <p className="text-gray-400 text-lg tracking-widest uppercase">
          Key Cryptocurrencies and Blockchain Innovations
        </p>
      </div>

      {/* Gradient overlay pre fade efekt na okrajoch */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="overflow-hidden relative whitespace-nowrap">
        <motion.div
          className="flex gap-8 sm:gap-16 justify-center items-center"
          animate={{ x: [0, -3000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60,
          }}
        >
          {cryptoData.concat(cryptoData).map((crypto, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6"
            >
              <img
                src={crypto.logo}
                alt={crypto.name}
                className="h-10 sm:h-12 w-auto"
              />
              <div className="text-left">
                <h3 className="text-white text-base sm:text-xl font-semibold">
                  {crypto.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {crypto.info}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CryptoMarquee;
