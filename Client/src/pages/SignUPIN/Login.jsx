// src/components/Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // Import ikoniek
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const Login = () => {
  // Stavové premenné pre polia formulára
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stavové premenné pre chybové správy
  const [errors, setErrors] = useState({});

  // Stavové premenné pre feedback správy
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Stav pre zobrazenie hesla
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext); // Prístup k funkcii login z AuthContext
  const navigate = useNavigate();

  // Handler pre odoslanie formulára
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset chýb a feedback správ
    setErrors({});
    setSuccess("");

    // Základná klientská validácia
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email je povinný.";
    } else {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Prosím, zadaj platnú emailovú adresu.";
      }
    }

    if (!password) {
      newErrors.password = "Heslo je povinné.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://bakalarka-hosting.onrender.com/api/auth/login`,
        {
          email,
          password,
        }
      );

      setSuccess(response.data.message);
      // Clear form fields
      setEmail("");
      setPassword("");

      // Uloženie tokenu do AuthContext
      login(response.data.token);

      // Presmerovanie na dashboard alebo inú stránku po úspešnom prihlásení
      setTimeout(() => {
        navigate("/"); // Zmeňte na vašu cieľovú stránku
      }, 2000);
    } catch (err) {
      // Spracovanie chýb zo servera
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || { server: err.response.data.error });
      } else {
        setErrors({ server: "Chyba pri prihlásení." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#cea2fd] mb-6">Prihlásenie</h2>

        {/* Success Message */}
        {success && (
          <div className="mb-6 flex items-center bg-green-800 text-green-400 px-4 py-3 rounded">
            <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>{success} 
              <Link to="/" className="text-pink-400 hover:underline">
                
              </Link>.
            </span>
          </div>
        )}

        {/* Server Error Message */}
        {errors.server && (
          <div className="mb-6 flex items-center bg-red-800 text-red-400 px-4 py-3 rounded">
            <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-3a1 1 0 112 0v2a1 1 0 11-2 0V7zm1 4a1.25 1.25 0 00-.012 2.5A1.25 1.25 0 0010 13.5a1.25 1.25 0 010-2.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errors.server}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 bg-gray-800 text-gray-200 border ${
                errors.email ? "border-red-500" : "border-[#cea2fd]"
              } rounded focus:outline-none focus:ring-2 focus:ring-pink-400`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Zadaj svoj email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="box text-gray-300 mb-4">Heslo:
          <div className="relative">
            
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full px-4 py-2 bg-gray-800 text-gray-200 border ${
                errors.password ? "border-red-500" : "border-[#cea2fd]"
              } rounded focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10`} // Zvýšený padding-right pre ikonku
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zadaj svoje heslo"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center justify-center h-full text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Skryť heslo" : "Zobraziť heslo"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Prihlasujem..." : "Prihlásiť sa"}
          </button>
        </form>

        {/* Link to Sign Up */}
        <p className="mt-4 text-center text-gray-400">
          Nemáte účet?{" "}
          <Link to="/signup" className="text-pink-400 hover:underline">
            Registrovať sa
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
