// src/components/SignUp.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // Import ikon

const SignUp = () => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variables for field-specific errors
  const [errors, setErrors] = useState({});

  // State variables for feedback messages
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset feedback messages and errors
    setErrors({});
    setSuccess("");

    // Client-side validation
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Meno je povinné.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Priezvisko je povinné.";
    }

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
    } else if (password.length < 6) {
      newErrors.password = "Heslo musí mať minimálne 6 znakov.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Potvrdenie hesla je povinné.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Heslá sa nezhodujú.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://bakalarka-hosting.onrender.com/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      setSuccess(response.data.message);
      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Handle errors from the server
      if (err.response && err.response.data) {
        setErrors(
          err.response.data.errors || { server: err.response.data.error }
        );
      } else {
        setErrors({ server: "Chyba pri registrácii." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#cea2fd] mb-6">
          Registrácia
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-6 flex items-center bg-green-800 text-green-400 px-4 py-3 rounded">
            <svg
              className="h-6 w-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {success} Prejdete na{" "}
              <Link to="/login" className="text-pink-400 hover:underline">
                prihlásenie
              </Link>
              .
            </span>
          </div>
        )}

        {/* Server Error Message */}
        {errors.server && (
          <div className="mb-6 flex items-center bg-red-800 text-red-400 px-4 py-3 rounded">
            <svg
              className="h-6 w-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
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
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-gray-300 mb-2">
              Meno
            </label>
            <input
              type="text"
              id="firstName"
              className={`w-full px-4 py-2 bg-gray-800 text-gray-200 border ${
                errors.firstName ? "border-red-500" : "border-[#cea2fd]"
              } rounded focus:outline-none focus:ring-2 focus:ring-pink-400`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Zadaj svoje meno"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-gray-300 mb-2">
              Priezvisko
            </label>
            <input
              type="text"
              id="lastName"
              className={`w-full px-4 py-2 bg-gray-800 text-gray-200 border ${
                errors.lastName ? "border-red-500" : "border-[#cea2fd]"
              } rounded focus:outline-none focus:ring-2 focus:ring-pink-400`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Zadaj svoje priezvisko"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
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

          <div className="mb-4">
            {/* Label s vlastným marginom, bez relative */}
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Heslo
            </label>

            {/* Tu je 'relative' iba na obal, kde je input a tlačidlo s ikonou */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-[#cea2fd] rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Zadaj svoje heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">
                Potvrdťe Heslo
            </label>

          
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={`w-full px-4 py-2 bg-gray-800 text-gray-200 border ${
                errors.confirmPassword ? "border-red-500" : "border-[#cea2fd]"
              } rounded focus:outline-none focus:ring-2 focus:ring-pink-400`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Potvrď svoje heslo"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Skryť heslo" : "Zobraziť heslo"
              }
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
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
            {loading ? "Registrujem..." : "Zaregistrovať sa"}
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-400">
          Už máš účet?{" "}
          <Link to="/login" className="text-pink-400 hover:underline">
            Prihlás sa
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
