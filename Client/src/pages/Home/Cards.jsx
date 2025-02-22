import React from "react";
import { motion } from "framer-motion";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { GiTriangleTarget } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {Link} from 'react-router-dom';

const CardComponent = () => {
  const cards = [
    {
      title: "Blockchain Technológie",
      description:
        "Objavte potenciál decentralizovaných financií a bezpečných transakcií prostredníctvom blockchainových riešení novej generácie.",
      buttonText: "Preskúmať Blockchain",
      icon: <FaFilter className="text-[35px] md:text-[40px]" />,
      bgColor: "#a855f7",
      boxShadowColor: "rgba(173, 0, 255, 0.8)",
      // Použijeme md:col-span-2, takže na malých obrazovkách karty nezaberú viac stĺpcov
      colSpan: "md:col-span-2",
      link:"blockchain"
    },
    {
      title: "Umelá Inteligencia vo Financovaní",
      description:
        "Využite AI pre prediktívnu analýzu a automatizáciu finančných procesov pre efektívnejšie rozhodovanie.",
      buttonText: "Implementovať AI",
      icon: <BsCircle className="text-[35px] md:text-[40px]" />,
      bgColor: "#007791",
      boxShadowColor: "rgba(0, 153, 255, 0.8)",
      link:"/umela-inteligencia"
    },
    {
      title: "Mobilné Platby",
      description:
        "Ponúknite svojim zákazníkom rýchle a bezpečné mobilné platobné riešenia pre moderný svet.",
      buttonText: "Zaviesť Platby",
      icon: <AiFillStar className="text-[35px] md:text-[40px]" />,
      bgColor: "#e8a435",
      boxShadowColor: "rgba(255, 230, 0, 0.8)",
      link:"/"
    },
    {
      title: "Kybernetická Bezpečnosť",
      description:
        "Chráňte svoje finančné dáta pomocou najnovších bezpečnostných protokolov a technológií.",
      buttonText: "Zabezpečiť Dáta",
      icon: <GiTriangleTarget className="text-[35px] md:text-[40px]" />,
      bgColor: "#9fcb8d",
      boxShadowColor: "rgba(0, 255, 153, 0.8)",
      link:"/"
    },
    {
      title: "RegTech Riešenia",
      description:
        "Automatizujte súlad s regulačnými požiadavkami a minimalizujte riziká spojené s dodržiavaním predpisov.",
      buttonText: "Optimalizovať Súlad",
      icon: <AiOutlineUsergroupAdd className="text-[35px] md:text-[40px]" />,
      bgColor: "#e66d74",
      boxShadowColor: "rgba(255, 0, 102, 0.8)",
      link:"/"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`rounded-xl overflow-hidden shadow-lg text-white transform transition duration-500 ${card.colSpan ? card.colSpan : ""}`}
          style={{ background: "rgba(59, 42, 104, 0.3)" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="p-6 flex items-center">
            <motion.div
              className="flex items-center justify-center rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
              style={{
                backgroundColor: card.bgColor,
                boxShadow: `0 0 20px ${card.boxShadowColor}`,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 30px ${card.boxShadowColor}`,
              }}
            >
              {card.icon}
            </motion.div>
            <h2 className="text-lg md:text-xl font-bold ml-4">{card.title}</h2>
          </div>
          <div className="px-4 sm:px-6 py-4">
            <p className="text-gray-300 mb-4 text-sm md:text-base">{card.description}</p>
            <Link to={card.link}>
            <motion.button
              className="text-white py-2 px-4 rounded-full font-bold flex items-center transition text-sm md:text-base"
              style={{ 
                backgroundColor: card.bgColor,
                boxShadow: `0 0 20px ${card.boxShadowColor}`
               }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 30px ${card.boxShadowColor}`
              }}
            >
              {card.buttonText}
              <AiOutlineArrowRight className="ml-2" />
            </motion.button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardComponent;
