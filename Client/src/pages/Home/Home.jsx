import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import Typed from "typed.js"; // Import typed.js directly
import Fintech from "../../assets/Fintech.jpg";
import ChannelSelection from "./TechnologyCircles";

import TechnologyShowcase from "./TechnologyShowcase";
import CardComponent from "./Cards";
import CountUpComponent from "./Counter";
const HeroSection = () => {
  // Create a ref to attach the Typed instance
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["KRYPTE", "A.I", "NEOBANKINGU"], // Simplified strings for typing
      typeSpeed: 150, // Typing speed in milliseconds
      backSpeed: 80, // Backspacing speed in milliseconds
      loop: true, // Looping the animation
    });

    // Cleanup function to destroy Typed instance
    return () => {
      typed.destroy();
    };
  }, []);

  const scrollDownALittle = () => {
    window.scrollBy({ top: 700, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen {/*bg-gradient-to-b from-[#0a051e] to-black */}  text-white px-8 py-8">
      {/* Content Container: Text and Image 
      bg-gradient-to-b from-[#0a051e] to-black mozno toto pre lepsi bg neviem ci sa mi paci*/}
      <div className="flex flex-col md:flex-row justify-center items-center w-full">
        {/* Left Side: Text Content with Typing Effect */}
        <motion.div
          className="flex flex-col justify-center items-start w-full md:w-1/2 max-w-2xl z-10 p-8 md:ml-16"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-purple-300 text-lg mb-6">
            Nové FinTech technológie
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Zistite si viac o <br />
            <span ref={el} className="text-purple-400"></span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-lg">
            Prečítajte si o možnostiach, ako si môžete jednoducho vylepšiť svoj
            podnik alebo business. Inovujte ho pomocou najnovších technológií.
          </p>
          <motion.button
            className="bg-purple-600 text-white font-bold py-3 px-6 mt-12 rounded-full shadow-lg transition-all duration-300 text-lg md:text-xl"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgb(255, 255, 255)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollDownALittle}
          >
            Začnime!
          </motion.button>
        </motion.div>

        {/* Right Side: Background Image with Enhanced Corner Glow Effect */}
        <motion.div
          className="relative flex justify-center items-center w-full md:w-1/2"
          initial={{ opacity: 0, x: 100, filter: "blur(10px)" }} // Initial blur effect
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} // Remove blur over time
          transition={{ duration: 2.5, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            transition: { yoyo: Infinity, duration: 0.8 },
          }} // Pulsating effect
        >
          {/* Enhanced Corner Glow Effect using ::before Pseudo-element */}
          <div className="absolute inset-0 rounded-lg pointer-events-none before:content-[''] before:absolute before:inset-0 before:border-[12px] before:rounded-lg before:border-t-transparent before:border-l-transparent before:border-b-purple-500 before:border-r-purple-500 before:opacity-100 before:shadow-[0_0_40px_rgba(128,0,128,0.8)]" />

          <img
            src={Fintech}
            alt="Background"
            className="w-full h-full object-cover opacity-90 rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* Centered Button Below Both Text and Image */}
      <motion.div
        className="flex justify-center w-full mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
      <ChannelSelection />
      <CardComponent />
      <TechnologyShowcase />
      <CountUpComponent />
    </div>
  );
};

export default HeroSection;
