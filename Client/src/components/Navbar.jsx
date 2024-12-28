// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons"; // Pridanie faUser
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext); // Prístup k autentifikačnému stavu a funkcii logout

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNav = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Voliteľné: presmerovanie po odhlásení
  };

  return (
    <nav className="relative py-5 px-8 flex justify-between items-center w-full border-b border-purple-300 bg-black">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-transparent bg-clip-text px-2 text-5xl font-bold"
          style={{
            backgroundImage: "linear-gradient(to right, #a066ff, #cea2fd)",
          }}
          aria-label="FinTech Home"
        >
          FinTech
        </Link>
      </div>

      {/* Menu Items pre väčšie obrazovky */}
      <div className="hidden md:flex space-x-8 text-xl font-semibold items-center">
        <Link
          to="/blockchain"
          className="text-white hover:text-purple-200 transition-colors duration-300"
        >
          BlockChain
        </Link>
        <Link
          to="/neobanking"
          className="text-white hover:text-purple-200 transition-colors duration-300"
        >
          NeoBanking
        </Link>
        <Link to="/analyza">
          <button className="bg-white hover:bg-[#cea2fd] text-black font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Sprav si Analyzu
          </button>
        </Link>
        <Link
          to="/AI"
          className="text-white hover:text-purple-200 transition-colors duration-300"
        >
          Umelá inteligencia
        </Link>
        <Link
          to="/zisti-viac"
          className="text-white hover:text-purple-200 transition-colors duration-300"
        >
          Zisti viac
        </Link>
      </div>

      {/* Hamburger Icon pre malé obrazovky */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="text-white text-2xl"
          />
        </button>
      </div>

      {/* Dropdown Menu pre malé obrazovky */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black py-5 text-white flex flex-col md:hidden space-y-6">
          <Link
            to="/blockchain"
            className="hover:text-purple-200 transition-colors duration-300 py-4 px-8 border-b border-gray-300 text-lg w-full"
            onClick={toggleMenu}
          >
            BlockChain
          </Link>
          <Link
            to="/neobanking"
            className="hover:text-purple-200 transition-colors duration-300 py-4 px-8 border-b border-gray-300 text-lg w-full"
            onClick={toggleMenu}
          >
            NeoBanking
          </Link>
          <Link to="/analyza">
            <button
              onClick={toggleMenu}
              className="bg-white hover:bg-[#cea2fd] text-black font-bold py-2 px-8 my-4 mx-8 rounded-full transition-colors duration-300 w-auto"
            >
              Sprav si Analyzu
            </button>
          </Link>
          <Link
            to="/AI"
            className="hover:text-purple-200 transition-colors duration-300 py-4 px-8 border-b border-gray-300 text-lg w-full"
            onClick={toggleMenu}
          >
            Umelá inteligencia
          </Link>
          <Link
            to="/zisti-viac"
            className="hover:text-purple-200 transition-colors duration-300 py-4 px-8 border-b border-gray-300 text-lg w-full"
            onClick={toggleMenu}
          >
            Zisti viac
          </Link>
          
          {/* Podmienečné zobrazenie pre autentifikáciu */}
          {!auth.token ? (
            <>
              <Link
                to="/login"
                className="hover:text-purple-200 transition-colors duration-300 py-4 px-8 text-lg w-full"
                onClick={toggleMenu}
              >
                Prihlásiť sa
              </Link>
              <Link
                to="/register"
                className="hover:text-purple-200 transition-colors duration-300 py-4 px-8 text-lg w-full"
                onClick={toggleMenu}
              >
                Registrácia
              </Link>
            </>
          ) : (
            <div className="flex flex-col space-y-4 px-8">
              <Link to="/moj-profil" onClick={toggleMenu}>
                <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors duration-300 w-full">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Moj Profil
                </button>
              </Link>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition-colors duration-300 w-full"
              >
                Odhlásiť sa
              </button>
            </div>
          )}
        </div>
      )}

      {/* Podmienečné tlačidlá pre väčšie obrazovky */}
      <div className="hidden md:flex pr-8 space-x-4">
        {!auth.token ? (
          <>
            <Link to="/login">
              <button className="bg-transparent hover:bg-pink-500 text-pink-400 font-semibold py-2 px-4 border border-pink-500 hover:text-white rounded-full transition-colors duration-300">
                Prihlásiť sa
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white hover:bg-purple-600 text-purple-400 font-bold py-3 px-5 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                Registrácia
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/moj-profil">
              <button className="flex items-center bg-[white] hover:bg-[#cea2fd] text-black font-bold py-2 px-4 rounded-full transition-colors duration-300">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Moj Profil
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              Odhlásiť sa
            </button>
          </div>
        )}
      </div>

      {/* Najtenší gradientový pruh na spodku */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%]"
        style={{
          height: "0.25px",
          background:
            "linear-gradient(to right, transparent, #a066ff, transparent)",
        }}
      ></div>
    </nav>
  );
}

export default Navbar;
