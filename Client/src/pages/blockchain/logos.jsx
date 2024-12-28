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
    // Simulate a loading period
    setTimeout(() => setLoading(false), 1000); // Change the delay as needed
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
    <div className="bg-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <p className="text-gray-400 text-lg tracking-widest uppercase">
          Key Cryptocurrencies and Blockchain Innovations
        </p>
      </div>

      <div className="overflow-hidden relative whitespace-nowrap">
        <motion.div
          className="flex gap-16 justify-center items-center"
          animate={{ x: [0, -3000] }} // Continuous movement in one direction
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60, // Slow down the scrolling speed
          }}
        >
          {cryptoData.concat(cryptoData).map((crypto, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 px-6"
            >
              {/* Logo */}
              <img
                src={crypto.logo}
                alt={crypto.name}
                className="h-12 w-auto"
              />
              {/* Name and info */}
              <div className="text-left">
                <h3 className="text-white text-xl font-semibold">
                  {crypto.name}
                </h3>
                <p className="text-gray-400 text-sm">{crypto.info}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CryptoMarquee;
