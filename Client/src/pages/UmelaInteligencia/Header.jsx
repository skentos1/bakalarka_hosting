import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './styles.css';

import microsoftLogo from '../../assets/microsoft.svg';
import metaLogo from '../../assets/meta.svg'
import openaiLogo from '../../assets/openai.png'
import claudeLogo from '../../assets/claudee.webp'
import googleLogo from '../../assets/googlee.png'
import { Navigate } from 'react-router-dom';

const texts = [
  "Umelú inteligenciu",
  "Strojové učenie"
];

const companies = [
  { name: 'Microsoft', logo: microsoftLogo },
  { name: 'Meta', logo: metaLogo },
  { name: 'OpenAI', logo: openaiLogo },
  { name: 'Convere', logo: claudeLogo },
  { name: 'Adept', logo: googleLogo },
  
];

const FlipText = () => {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let isCancelled = false;

    async function sequence() {
      while (!isCancelled) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await controls.start({ rotateX: 90, transition: { duration: 0.5, ease: "easeInOut" } });
        setIndex(prev => (prev + 1) % texts.length);
        controls.set({ rotateX: -90 });
        await controls.start({ rotateX: 0, transition: { duration: 0.5, ease: "easeInOut" } });
      }
    }

    sequence();
    return () => { isCancelled = true; };
  }, [controls]);

  return (
    <motion.div 
      className="min-h-screen animated-bg text-white flex flex-col items-center justify-start pt-40 px-8"
      style={{ fontFamily: "var(--font-aeonik), -apple-system, Arial, sans-serif" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-5xl sm:text-6xl font-light text-center leading-tight drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Začnite využívať{' '}
        <motion.span animate={controls} className="text-7xl inline-block text-gradient">
          {texts[index]}
        </motion.span>
      </motion.h1>

      <motion.h1 
        className="text-5xl sm:text-6xl font-light text-center leading-tight mt-2 drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        vo svojom podniku
      </motion.h1>

      <motion.p 
        className="text-lg max-w-2xl font-semibold text-center mt-12 leading-relaxed drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Objavte najnovšie trendy v oblasti umelej inteligencie a inovatívne riešenia, ktoré vám pomôžu zefektívniť procesy,
        zvýšiť konkurencieschopnosť a posunúť váš podnik na úplne novú úroveň.
      </motion.p>

      <motion.div 
        className="mt-12 flex gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1E40AF] text-white px-8 py-2 rounded-xl text-base transition-all shadow-2xl hover:bg-blue-900"
        >
          Zistiť viac ↓
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={Navigate('/analyza')}
          className="bg-black text-white px-6 py-2 rounded-md text-base transition-all shadow-2xl hover:bg-blue-600"
        >
          Vykonať analýzu →
        </motion.button>
      </motion.div>

      <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-wide mt-32 mb-8">
        Spolupracujeme so spoločnosťami využívajúcimi <span className="underline">generatívnu AI</span>, open modely, strojové učenie
      </p>

      <div className="flex flex-wrap justify-center items-center gap-32 px-4">
  {companies.map((company) => (
    <motion.div
      key={company.name}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      <img
        src={company.logo}
        alt={company.name}
        className="h-14 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
        title={company.name}
      />
    </motion.div>
  ))}
</div>
    </motion.div>
  );
};

export default FlipText;
