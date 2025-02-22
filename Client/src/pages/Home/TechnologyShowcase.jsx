import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { technologies } from "../../data/technologies";
import TechnologyInfo from "./TechnologyInfo";

const TechnologyShowcase = () => {
  const [selectedTech, setSelectedTech] = useState(technologies[0]);

  // Nastavenie useInView pre sledovanie viditeľnosti sekcie
  const [ref, inView] = useInView({
    threshold: 0.3, // Zvýšenie hodnoty threshold
    triggerOnce: true,
  });

  // Nastavenie animácie
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      className="px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-20 bg-black text-white"
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }, // Pridané oneskorenie
        },
      }}
    >
      <h2 className="font-bold text-center text-4xl md:text-6xl mb-8 sm:mb-16  md:mb-24">
        {" "}
        {/* Zvýšenie margin-bottom */}
        Prieskum vývoja{" "}
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Technológií
        </span>
      </h2>

      {/* Technologická Tab Navigácia */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-600  no-scrollbar">
        {technologies.map((tech, index) => (
          <button
            key={index}
            onClick={() => setSelectedTech(tech)}
            className={`px-6 py-3 font-semibold transition transform hover:scale-105 ${
              selectedTech.name === tech.name
                ? "border-b-4 border-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tech.name}
          </button>
        ))}
      </div>

      {/* Zobrazenie Vybranej Technológie */}
      <motion.div
        key={selectedTech.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TechnologyInfo technology={selectedTech} />
      </motion.div>
    </motion.section>
  );
};

export default TechnologyShowcase;
