import React from "react";
import { motion } from "framer-motion";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { GiTriangleTarget } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const CardComponent = () => {
  const cards = [
    {
      title: "Blockchain Technológie",
      description:
        "Objavte potenciál decentralizovaných financií a bezpečných transakcií prostredníctvom blockchainových riešení novej generácie.",
      buttonText: "Preskúmať Blockchain",
      icon: <FaFilter size={40} />,
      bgColor: "#a855f7",
      boxShadowColor: "rgba(173, 0, 255, 0.8)",
      colSpan: "col-span-2",
    },
    {
      title: "Umelá Inteligencia v Financovaní",
      description:
        "Využite AI pre prediktívnu analýzu a automatizáciu finančných procesov pre efektívnejšie rozhodovanie.",
      buttonText: "Implementovať AI",
      icon: <BsCircle size={40} />,
      bgColor: "#007791",
      boxShadowColor: "rgba(0, 153, 255, 0.8)",
    },
    {
      title: "Mobilné Platby",
      description:
        "Ponúknite svojim zákazníkom rýchle a bezpečné mobilné platobné riešenia pre moderný svet.",
      buttonText: "Zaviesť Platby",
      icon: <AiFillStar size={40} />,
      bgColor: "#e8a435",

      boxShadowColor: "rgba(255, 230, 0, 0.8)",
    },
    {
      title: "Kybernetická Bezpečnosť",
      description:
        "Chráňte svoje finančné dáta pomocou najnovších bezpečnostných protokolov a technológií.",
      buttonText: "Zabezpečiť Dáta",
      icon: <GiTriangleTarget size={40} />,
      bgColor: "#9fcb8d",
      boxShadowColor: "rgba(0, 255, 153, 0.8)",
    },
    {
      title: "RegTech Riešenia",
      description:
        "Automatizujte súlad s regulačnými požiadavkami a minimalizujte riziká spojené s dodržiavaním predpisov.",
      buttonText: "Optimalizovať Súlad",
      icon: <AiOutlineUsergroupAdd size={40} />,
      bgColor: "#e66d74",
      boxShadowColor: "rgba(255, 0, 102, 0.8)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`rounded-xl overflow-hidden shadow-lg text-white transform transition duration-500 ${card.colSpan}`}
          style={{
            background: "rgba(59, 42, 104, 0.3)",
            padding: "20px",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="p-6 flex items-center">
            <motion.div
              className="flex items-center justify-center rounded-full"
              style={{
                backgroundColor: card.bgColor,
                width: "60px",
                height: "60px",
                boxShadow: `0 0 20px ${card.boxShadowColor}`,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 30px ${card.boxShadowColor}`,
              }}
            >
              {card.icon}
            </motion.div>
            <h2 className="text-xl font-bold ml-4">{card.title}</h2>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-300 mb-4">{card.description}</p>
            <button
              className="text-white py-2 px-4 rounded-full font-bold flex items-center transition"
              style={{ backgroundColor: card.bgColor }}
            >
              {card.buttonText}
              <AiOutlineArrowRight className="ml-2" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardComponent;
