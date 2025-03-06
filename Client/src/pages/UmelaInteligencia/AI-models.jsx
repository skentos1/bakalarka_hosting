import React from 'react';
import { motion } from 'framer-motion';

// Nahraď tieto cesty k obrázkom tvojimi vlastnými súbormi
import ai4o from '../../assets/GPT-4o.webp';
import aio1 from '../../assets/OpenAI-1.webp';
import claude from '../../assets/claude-3-7-sonnet.webp';

const ThreeCardSection = () => {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hlavný nadpis a popis sekcie */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Vyberte ten správny model pre optimalizáciu podniku
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto pt-8 text-lg">
            Dosiahnite najlepšie  AI riešenia s flexibilným prístupom, ktoré sa bez problémov
            integrujú s vašimi zdrojmi dát, modelmi a infraštruktúrou.
          </p>
        </motion.div>

        {/* Tri karty */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* KARTA 1: 4o Model */}
          <motion.div
            className="flex-1 bg-[#1a1a1a] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={ai4o}
              alt="4o Model"
              className="mx-auto mb-4 h-20 w-auto my-2 object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="text-2xl font-bold mb-2 text-center">4o Model</h3>
            <p className="text-gray-400 text-center">
              4o Model je najmodernejší jazykový model navrhnutý pre pokročilé logické uvažovanie a
              úlohy spracovania prirodzeného jazyka. Vyniká v generovaní koherentných, kontextovo prispôsobených
              odpovedí a môže byť doladený pre špecializované oblasti.
            </p>
          </motion.div>

          {/* KARTA 2: o1 Model */}
          <motion.div
            className="flex-1 bg-[#1a1a1a] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={aio1}
              alt="o1 Model"
              className="mx-auto mb-4 h-20 my-2 w-auto object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="text-2xl font-bold mb-2 text-center">o1 Model</h3>
            <p className="text-gray-400 text-center">
              o1 Model ponúka robustný výkon pre rôzne generatívne úlohy, od tvorby obsahu až po návrhy kódu.
              Jeho zabudované optimalizácie zaručujú efektívne nasadenie na viacerých platformách a pre rôzne prípady
              použitia.
            </p>
          </motion.div>

          {/* KARTA 3: Claude3-7-Sonnet */}
          <motion.div
            className="flex-1 bg-[#1a1a1a] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={claude}
              alt="Claude3-7-Sonnet"
              className="mx-auto mb-4 h-20 my-2 w-auto object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="text-2xl font-bold mb-2 text-center">Claude3-7-Sonnet</h3>
            <p className="text-gray-400 text-center">
              Claude3-7-Sonnet je známy svojou kreativnosťou a poetickou generáciou jazyka.
              Či už ide o umelecké projekty alebo sofistikované príbehy, bez problémov sa integruje do
              moderných AI riešení.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThreeCardSection;
