import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import backgroundVideo from "../../assets/video.mp4"; // Your video
import BlockchainComponent from "./BlockChain";
import BlockchainDetailsComponent from "./BlockChainDetails";
import BlockchainBlog from "./BlockchainBlog";
import FinTechSteps from "./Uvod";

const LandingPage = () => {
  const videoRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(-1);
  const [videoEnded, setVideoEnded] = useState(false);
  const targetTime = 7; // Target time in seconds

  // The texts to show on the video
  const texts = [
    {
      text: "Revolučná Blockchain Technológia",
      time: 2, // Show after 2 seconds
      direction: "fromLeft",
    },
    {
      text: "Inovatívne Kryptomenové Riešenia",
      time: 6.5, // Show after 6.5 seconds
      direction: "fromRight",
    },
  ];

  // Handle video time update to show text at the right time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (
        currentTextIndex < texts.length - 1 &&
        currentTime >= texts[currentTextIndex + 1].time
      ) {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  // Handle video end event
  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      videoRef.current.pause(); // Pause video at this frame
    }
  };

  useEffect(() => {
    if (videoEnded) {
      setCurrentTextIndex(texts.length - 1);
    }
  }, [videoEnded, texts.length]);

  // Text animation variants (from left or right)
  const textVariants = {
    fromLeft: {
      initial: { opacity: 0, x: -100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -50, scale: 0.9 },
    },
    fromRight: {
      initial: { opacity: 0, x: 100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 50, scale: 0.9 },
    },
  };

  return (
    <div className="relative h-auto min-h-screen text-white">
      {/* Video Background */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        {" "}
        {/* Keep the video at 75% height */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          preload="auto"
          playsInline
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        {/* Displaying animated text on the video */}
        <div className="absolute inset-0 flex items-end justify-center z-30 pb-10">
          <AnimatePresence mode="wait">
            {!videoEnded && currentTextIndex >= 0 && (
              <motion.h1
                key={currentTextIndex}
                variants={textVariants[texts[currentTextIndex].direction]}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-200 text-center"
                style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
              >
                {texts[currentTextIndex].text}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        {/* Final text after video ends */}
        {videoEnded && (
          <div className="absolute inset-0 flex items-end justify-center z-30 pb-10">
            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-200 text-center"
              style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
            >
              Spojte sa s Budúcnosťou Fintechu
            </motion.h1>
          </div>
        )}
      </div>

      {/* Margin to push BlockchainComponent lower */}
      <div className="mt-32">
        {" "}
        {/* Add margin-top to push BlockchainComponent down */}
        <FinTechSteps />
        <BlockchainComponent />
        <BlockchainBlog />
      </div>
    </div>
  );
};

export default LandingPage;
