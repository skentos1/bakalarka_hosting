import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai"; // Star icon
import { BsCircle } from "react-icons/bs"; // Circle icon
import { FaFilter } from "react-icons/fa"; // Funnel/Filter icon
import { GiTriangleTarget } from "react-icons/gi"; // Triangle icon
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const ChannelSelection = () => {
  return (
    <motion.div
      className="flex flex-col items-center bg-black text-white px-8 mt-32 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Tlačidlo pre Technológie */}
      <motion.button
        className="px-6 py-2 mb-8 rounded-full border-b-2 border-gray-400 text-gray-200 text-2xl"
        whileHover={{ scale: 1.05 }}
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Technológie
      </motion.button>

      {/* Riadok ikon s progresívnou veľkosťou */}
      <motion.div
        className="flex justify-center space-x-8 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
          hidden: {},
        }}
      >
        {/* Najmenší kruh */}
        <motion.div
          className="bg-[#e8a435] w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255, 230, 0, 0.8)",
          }}
          style={{
            boxShadow: "0 0 20px rgba(255, 230, 0, 0.8)",
          }}
        >
          <AiFillStar className="text-3xl text-black" />
        </motion.div>

        {/* Stredný kruh */}
        <motion.div
          className="bg-[#007791] w-20 h-20 flex items-center justify-center rounded-full shadow-lg"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(0, 153, 255, 0.8)",
          }}
          style={{
            boxShadow: "0 0 40px rgba(0, 153, 255, 0.8)",
          }}
        >
          <BsCircle className="text-4xl text-black" />
        </motion.div>

        {/* Najväčší kruh */}
        <motion.div
          className="bg-purple-500 w-24 h-24 flex items-center justify-center rounded-full shadow-lg"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(173, 0, 255, 0.8)",
          }}
          style={{
            boxShadow: "0 0 60px rgba(173, 0, 255, 0.8)",
          }}
        >
          <FaFilter className="text-5xl text-black" />
        </motion.div>

        {/* Stredný kruh (zmenšujúci sa) */}
        <motion.div
          className="bg-[#e66d74] w-20 h-20 flex items-center justify-center rounded-full shadow-lg"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255, 0, 102, 0.8)",
          }}
          style={{
            boxShadow: "0 0 40px rgba(255, 0, 102, 0.8)",
          }}
        >
          <AiOutlineUsergroupAdd className="text-4xl text-black" />
        </motion.div>

        {/* Najmenší kruh (zmenšujúci sa) */}
        <motion.div
          className="bg-[#9fcb8d] w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(0, 255, 153, 0.8)",
          }}
          style={{
            boxShadow: "0 0 20px rgba(0, 255, 153, 0.8)",
          }}
        >
          <GiTriangleTarget className="text-3xl text-black" />
        </motion.div>
      </motion.div>

      {/* Nadpis */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Zvoľte si technológiu <br /> ktorá Vám najviac vyhovuje
      </motion.h1>

      {/* Podtext */}
      <motion.p
        className="text-gray-300 text-center max-w-xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Máte možnosť si vybrať technológiu, ktorá bude Vašim podmienkam
        najprístupnejšia
      </motion.p>
    </motion.div>
  );
};

export default ChannelSelection;
