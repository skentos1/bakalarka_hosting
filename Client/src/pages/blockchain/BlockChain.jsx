import React from "react";
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

  return (
    <section className="relative text-white py-16 pb-24">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-16 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Vplyv Blockchain <br /> technológie vo FinTech
      </h1>
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Vertikálna línia timeline (iba pre desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-600"></div>

        <div className="space-y-12">
          {benefits.map((benefit, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-3 md:items-center">
                  {isEven ? (
                    <>
                      {/* Ľavý prázdny stĺpec */}
                      <div></div>
                      {/* Centrálna značka */}
                      <div className="flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-8 h-8 bg-purple-600 rounded-full border-4 border-gray-800 shadow-md"
                        ></motion.div>
                      </div>
                      {/* Obsah na pravej strane */}
                      <div className="pl-8 text-left">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Obsah na ľavej strane */}
                      <div className="pr-8 text-right">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                      {/* Centrálna značka */}
                      <div className="flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-8 h-8 bg-purple-600 rounded-full border-4 border-gray-800 shadow-md"
                        ></motion.div>
                      </div>
                      {/* Pravý prázdny stĺpec */}
                      <div></div>
                    </>
                  )}
                </div>

                {/* Mobile View */}
                <div className="md:hidden flex items-start">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-8 h-8 bg-purple-600 rounded-full border-4 border-gray-800 shadow-md mr-4 flex-shrink-0"
                  ></motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlockchainComponent;
