import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  // Použitie useAnimation z framer-motion
  const controls = useAnimation();
  // Nastavenie useInView na sledovanie viditeľnosti footera
  const [ref, inView] = useInView({
    threshold: 0.1, // Animácia sa spustí, keď je 10% footera viditeľných
    triggerOnce: true, // Animácia sa spustí iba raz
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.footer
      ref={ref} // Priradenie referencie pre useInView
      className="bg-gradient-to-b from-black to-gray-800 text-white py-10"
      animate={controls} // Ovládanie animácie
      initial="hidden" // Počiatočný stav
      variants={{
        hidden: { opacity: 0, y: 50 }, // Skrytý stav
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }, // Viditeľný stav s animáciou
        },
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-0">
        {/* About Section */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-purple-400 mb-4">O nás</h4>
          <p className="text-gray-400 text-sm">
            Sme technologická firma, ktorá zlepšuje budúcnosť financií pomocou
            najnovších FinTech riešení. Venujeme sa vytváraniu inovatívnych a
            bezpečných riešení pre vaše podnikanie.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-purple-400 mb-4">
            Rýchle Odkazy
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Domov
              </a>
            </li>
            <li>
              <a
                href="/analyza"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Analýza
              </a>
            </li>
            <li>
              <a
                href="/blockchain"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                BlockChain technológia
              </a>
            </li>
            <li>
              <a
                href="/umela-inteligencia"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Umelá Inteligencia
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-purple-400 mb-4">Kontakt</h4>
          <p className="text-gray-400 text-sm mb-2">Email: info@fintech.com</p>
          <p className="text-gray-400 text-sm">Telefón: +421 123 456 789</p>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-purple-400 mb-4">
            Odber noviniek
          </h4>
          <p className="text-gray-400 text-sm mb-4">
            Prihláste sa na odber a získajte aktuálne informácie o najnovších
            trendoch v oblasti FinTech.
          </p>
          <form className="flex">
            <input
              type="email"
              className="px-4 py-2 rounded-l-md bg-gray-800 text-white placeholder-gray-400 outline-none"
              placeholder="Váš email"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-r-md text-white font-bold hover:opacity-90 transition"
            >
              Prihlásiť
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 py-4">
        <div className="max-w-6xl mx-auto flex flex-col justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FinTech Company. Všetky práva vyhradené.
          </p>
          <div className="flex flex-wrap space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/s.kentos2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition"
          >
            <FaFacebookF className="text-2xl" />
            <span>Facebook</span>
          </a>
          <a
            href="https://www.linkedin.com/in/simon-kento%C5%A1-7a668133a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition"
          >
            <FaLinkedinIn className="text-2xl" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/s.kentos/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition"
          >
            <FaInstagram className="text-2xl" />
            <span>Instagram</span>
          </a>
        </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
