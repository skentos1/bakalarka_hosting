import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  
  const blockchainLinkClasses = ({ isActive }) =>
    isActive
      ? "relative inline-block pb-1 text-white transition-colors duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-[2px] before:h-[2px] before:w-full before:bg-gradient-to-r before:from-pink-500 before:to-pink-300"
      : "text-white hover:text-purple-200 transition-colors duration-300";

  // /umela-inteligencia -> modrý gradient
  const aiLinkClasses = ({ isActive }) =>
    isActive
      ? "relative inline-block pb-1 text-white transition-colors duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-[2px] before:h-[2px] before:w-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300"
      : "text-white hover:text-purple-200 transition-colors duration-300";

  return (
    <nav className="relative py-5 px-8 flex justify-between items-center w-full border-b border-purple-300 bg-black">
      {/* Logo */}
      <div className="flex items-center">
        <NavLink
          to="/"
          className="text-transparent bg-clip-text px-2 text-5xl font-bold"
          style={{
            backgroundImage: "linear-gradient(to right, #a066ff, #cea2fd)",
          }}
          aria-label="FinTech Home"
        >
          FinTech
        </NavLink>
      </div>

      {/* Menu Items pro velke obrazovky */}
      <div className="hidden md:flex space-x-8 text-xl font-semibold items-center">
        <NavLink to="/blockchain" className={blockchainLinkClasses}>
          BlockChain
        </NavLink>

        <NavLink to="/analyza">
          <button className="bg-white hover:bg-[#cea2fd] text-black font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Sprav si Analyzu
          </button>
        </NavLink>

        <NavLink to="/umela-inteligencia" className={aiLinkClasses}>
          Umelá inteligencia
        </NavLink>
      </div>

      {/* Hamburger (mobilne) */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="text-white text-2xl"
          />
        </button>
      </div>

      {/* Overlay Menu pre malé obrazovky (animované) */}
      <div
        className={`
          fixed top-0 left-0 w-full h-full bg-black text-white z-50 flex flex-col md:hidden overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}
        `}
      >
        {/* Horna lišta s FinTech a "X" */}
        <div className="flex items-center justify-between p-4 border-b border-purple-300">
          <NavLink
            to="/"
            className="text-transparent bg-clip-text text-5xl font-bold"
            style={{
              backgroundImage: "linear-gradient(to right, #a066ff, #cea2fd)",
            }}
            onClick={toggleMenu}
          >
            FinTech
          </NavLink>
          <button onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} className="text-white text-3xl" />
          </button>
        </div>

        {/* mobilne menu */}
        <div className="flex flex-col space-y-6 px-8 pb-8 pt-6">
          <NavLink
            to="/"
            className="hover:text-purple-200 transition-colors duration-300 py-4 border-b border-gray-300 text-lg"
            onClick={toggleMenu}
          >
            Domov
          </NavLink>

          <NavLink
            to="/blockchain"
            className={`py-4 border-b border-gray-300 text-lg ${blockchainLinkClasses}`}
            onClick={toggleMenu}
          >
            BlockChain
          </NavLink>

          <NavLink to="/analyza" onClick={toggleMenu}>
            <button className="bg-white hover:bg-[#cea2fd] text-black font-bold py-2 px-8 my-4 rounded-full transition-colors duration-300">
              Sprav si Analyzu
            </button>
          </NavLink>

          <NavLink
            to="/umela-inteligencia"
            className={`py-4 border-b border-gray-300 text-lg ${aiLinkClasses}`}
            onClick={toggleMenu}
          >
            Umelá inteligencia
          </NavLink>

          
          {!auth.token ? (
            <>
            <NavLink
              to="/login"
              className="hover:text-purple-200 transition-colors duration-300 py-4 text-lg"
              onClick={toggleMenu}
            >
              <button className="w-full bg-gradient-to-r from-pink-500 to-pink-300 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Prihlásiť sa
              </button>
            </NavLink>
            <NavLink
              to="/register"
              className="hover:text-purple-200 transition-colors duration-300 py-4 text-lg"
              onClick={toggleMenu}
            >
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Registrácia
              </button>
            </NavLink>
          </>
          ) : (
            <div className="flex flex-col space-y-4 mt-4">
              <NavLink to="/moj-profil" onClick={toggleMenu}>
                <button className="flex items-center bg-white hover:bg-[#cea2fd] text-black py-2 px-4 rounded-full transition-colors duration-300 w-full">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Moj Profil
                </button>
              </NavLink>
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
      </div>

      {/* Tlačítka pro velke obrazovky (Auth) */}
      <div className="hidden md:flex pr-8 space-x-4">
  {!auth.token ? (
    <>
      <NavLink to="/login">
        <button className="bg-gradient-to-r from-pink-500 to-pink-300 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
          Prihlásiť sa
        </button>
      </NavLink>
      <NavLink to="/register">
        <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
          Registrácia
        </button>
      </NavLink>
    </>
  ) : (
    <div className="flex items-center space-x-4">
      <NavLink to="/moj-profil">
        <button className="flex items-center bg-white hover:bg-[#cea2fd] text-black font-bold py-2 px-4 rounded-full transition-colors duration-300">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Moj Profil
        </button>
      </NavLink>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
      >
        Odhlásiť sa
      </button>
    </div>
  )}
</div>


      {/* Gradientový pruh na spodku */}
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
