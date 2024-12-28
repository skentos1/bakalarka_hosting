import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CountUpComponent = () => {
  // FinTech štatistiky s informáciami o trendoch
  const stats = [
    {
      number: 30,
      text: "Nárast využívania mobilných platieb",
      description:
        "Globálne využívanie mobilných platobných riešení vzrástlo o viac ako 30% ročne, pričom mobilné peňaženky a bezkontaktné platby sa stali dominantnými.",
      duration: 3,
      suffix: "%",
    },
    {
      number: 3,
      text: "Zrýchlenie rozhodovacích procesov vďaka umelej inteligencii",
      description:
        "AI technológie zvýšili presnosť a rýchlosť finančných rozhodovacích procesov až trojnásobne, čím zlepšujú efektivitu podnikania.",
      duration: 3,
      suffix: "x",
    },
    {
      number: 21,
      text: "Nárast veľkosti obchodov vďaka RegTech riešeniam",
      description:
        "Spoločnosti, ktoré prijali RegTech riešenia na automatizáciu dodržiavania predpisov, zaznamenali nárast veľkosti obchodov až o 21%.",
      duration: 3,
      suffix: "%",
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, index) => (
          <CountUpItem key={index} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
};

// Samostatný komponent pre každý prvok počítania
const CountUpItem = ({ stat, index }) => {
  // Použitie useInView na zistenie, kedy je prvok viditeľný
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Upraviť podľa potreby
  });

  // Custom hook na vytvorenie efektu počítania
  const useCountUp = (targetNumber, duration, inView) => {
    const [count, setCount] = useState(0);
    const countingStarted = React.useRef(false);

    useEffect(() => {
      if (!inView || countingStarted.current) return;
      countingStarted.current = true;

      let start = 0;
      const increment = targetNumber / (duration * 60); // Plynulá animácia pri 60 FPS

      const counter = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          clearInterval(counter);
          setCount(targetNumber);
        } else {
          setCount(Math.ceil(start)); // Plynulé zvyšovanie
        }
      }, 1000 / 60); // 60 FPS pre plynulé počítanie

      return () => clearInterval(counter);
    }, [targetNumber, duration, inView]);

    return count;
  };

  const count = useCountUp(stat.number, stat.duration, inView);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <h3 className="text-6xl font-bold text-purple-400">
        {count}
        {stat.suffix || ""}
      </h3>
      <p className="text-lg text-gray-400 mt-2">{stat.text}</p>
      <p className="text-sm text-gray-500 mt-4 max-w-xs">{stat.description}</p>
    </motion.div>
  );
};

export default CountUpComponent;
