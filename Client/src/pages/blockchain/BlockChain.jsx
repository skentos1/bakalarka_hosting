import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const BlockchainComponent = () => {
  const benefits = [
    {
      title: "Decentralizácia",
      description:
        "Blockchain eliminuje potrebu sprostredkovateľov, čím sa finančné procesy stávajú transparentnejšími a efektívnejšími.",
    },
    {
      title: "Bezpečnosť a súkromie",
      description:
        "Blockchain zvyšuje bezpečnosť dát vďaka nezmeniteľnej knihe záznamov, čím znižuje riziko podvodov a narušenia dát pri finančných transakciách.",
    },
    {
      title: "Transparentnosť",
      description:
        "Každá transakcia je zaznamenaná a dostupná na blockchaine, čo podporuje dôveru a zodpovednosť vo finančných službách.",
    },
    {
      title: "Efektivita a rýchlosť",
      description:
        "Blockchain technológia umožňuje rýchlejšie a efektívnejšie medzinárodné transakcie, čo skracuje čas spracovania platieb.",
    },
    {
      title: "Zníženie nákladov",
      description:
        "Vďaka odstráneniu sprostredkovateľov môže blockchain výrazne znížiť poplatky za transakcie a prevádzkové náklady.",
    },
  ];

  const sectionRefs = useRef([]);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      sectionRefs.current[sectionRefs.current.length - 1]?.offsetTop -
      sectionRefs.current[0]?.offsetTop;

    const scrollTop = window.scrollY;
    const elementOffsetTop = sectionRefs.current[0]?.offsetTop;
    const currentScroll = scrollTop - elementOffsetTop;

    const progressPercentage = (currentScroll / totalHeight) * 100;

    if (progressPercentage >= 0 && progressPercentage <= 100) {
      setProgress(progressPercentage);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-white min-h-screen py-16 pb-24">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-16 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Vplyv Blockchain <br /> technológie vo FinTech
      </h1>
      <div className="relative max-w-6xl mx-auto px-8">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gray-600">
          <motion.div
            className="absolute left-0 top-0 w-full bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"
            style={{ height: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className={`flex items-center w-full mb-32 ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Adjusted for better visibility
            transition={{
              duration: 0.6,
              ease: "easeOut",
              staggerChildren: 0.15,
            }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: index % 2 === 0 ? 100 : -100 },
            }}
            ref={(el) => (sectionRefs.current[index] = el)} // Assigning refs to sections
          >
            <motion.div
              className="w-5/12 px-6 sm:px-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>

            <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
              <motion.div
                className="w-8 h-8 sm:w-8 sm:h-8 bg-purple-600 rounded-full border-4 border-gray-800 shadow-md transition-transform transform hover:scale-110 duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              ></motion.div>
              {index !== benefits.length - 1 && (
                <div className="h-full w-1 bg-gray-600"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainComponent;
