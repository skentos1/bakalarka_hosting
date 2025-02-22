// src/components/MojProfil.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { XIcon } from "@heroicons/react/solid"; // Pre zavretie modálu

// Dôležité: Importni si AnalysisResult (a prípadne aj iné) zodpovedajúcou cestou
import AnalysisResult from "../Analyza/AnalysisResult";
// Prispôsob import podľa toho, kde máš AnalysisResult uložený
// napr.  "./AnalysisResult"  alebo  "../AnalysisResult"

const MojProfil = () => {
  const { auth, logout } = useContext(AuthContext);

  // -- Stavy pre profil používateľa
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState("");

  // -- Stavy pre históriu analýz
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);
  const [errorAnalyses, setErrorAnalyses] = useState("");

  // 1) Načítanie profilu používateľa
  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.token) {
        setLoadingProfile(false);
        return;
      }
      try {
        const response = await axios.get("https://bakalarka-hosting.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setProfile(response.data.user);
        setErrorProfile("");
      } catch (err) {
        console.error(err);
        setErrorProfile("Nepodarilo sa načítať profil.");
        logout();
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [auth.token, logout]);

  // 2) Načítanie histórie analýz
  useEffect(() => {
    const fetchAnalyses = async () => {
      if (!auth.token) {
        setLoadingAnalyses(false);
        return;
      }
      try {
        // POZOR: Uisti sa, že tvoj endpoint je "/api/analyze/history" alebo "/api/analysis/history"
        // Podľa toho, ako ho máš definovaný na backende
        const res = await axios.get("https://bakalarka-hosting.onrender.com/api/analyze/history", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        // Očakávame: { analyses: [...] }
        if (res.data && Array.isArray(res.data.analyses)) {
          setAnalyses(res.data.analyses);
        } else {
          setAnalyses([]);
        }
        setErrorAnalyses("");
      } catch (err) {
        console.error("Chyba pri načítaní histórie:", err);
        setErrorAnalyses("Nastala chyba pri načítaní histórie analýz.");
      } finally {
        setLoadingAnalyses(false);
      }
    };

    fetchAnalyses();
  }, [auth.token]);

  // 3) Funkcia na rozkliknutie detailu analýzy
  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  // 4) Funkcia na zavretie modálu
  const closeModal = () => {
    setSelectedAnalysis(null);
  };

  // 5) Rôzne stavy načítania/chýb pre profil
  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-black">
        <div className="text-white animate-pulse text-xl">Načítavanie profilu...</div>
      </div>
    );
  }
  if (errorProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500 bg-gray-900 p-4 rounded-md text-center">
          {errorProfile}
        </p>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Profil sa nenašiel.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hlavný kontajner */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profilová karta */}
          <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-xl">
            <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-6">
              Môj Profil
            </h2>

            <div className="space-y-6 text-gray-300">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-purple-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.632 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>
                  <span className="font-semibold">Meno:</span> {profile.firstName}
                </p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-purple-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                  />
                </svg>
                <p>
                  <span className="font-semibold">Priezvisko:</span> {profile.lastName}
                </p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-purple-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2m4-4v4m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                <p>
                  <span className="font-semibold">Email:</span> {profile.email}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Odhlásiť sa
            </button>
          </div>

          {/* História analýz */}
          <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-purple-400 mb-6">
              Moja História Analýz
            </h3>

            {/* Loading analýz */}
            {loadingAnalyses && (
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                <div className="w-24 h-4 bg-purple-400 rounded"></div>
              </div>
            )}

            {/* Chyba pri analýzach */}
            {errorAnalyses && (
              <p className="text-red-500 mb-4">{errorAnalyses}</p>
            )}

            {/* Zoznam analýz */}
            {!loadingAnalyses && !errorAnalyses && analyses.length === 0 && (
              <p className="text-white">Zatiaľ nemáte uložené žiadne analýzy.</p>
            )}

            {!loadingAnalyses && !errorAnalyses && analyses.length > 0 && (
              <ul className="space-y-4">
                {analyses.map((analysis) => (
                  <li key={analysis._id}>
                    <button
                      onClick={() => handleViewDetails(analysis)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-4 rounded-lg shadow-md flex items-center justify-between transition duration-300"
                    >
                      <span>
                        Analýza z{" "}
                        {new Date(analysis.createdAt).toLocaleString("sk-SK", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Detail konkrétnej analýzy - Modál */}
            {selectedAnalysis && (
              <div className="fixed inset-0 text-white bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
                <div className="bg-gray-800 p-8 rounded-lg w-11/12 max-w-5xl relative">
                  {/* Tlačidlo na zatvorenie modálu */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>

                  {/* Namiesto <pre>... tu ...*/}

                  {/* Sem vložíme AnalysisResult, aby sa zobrazilo ako pri novej analýze */}
                  <AnalysisResult
                    // Pôvodné "companyInfo" = selectedAnalysis.formData
                    companyInfo={selectedAnalysis.formData}
                    // Pôvodné "suggestions" = selectedAnalysis.suggestions
                    suggestions={selectedAnalysis.suggestions}
                    // Môžeme použiť closeModal ako "resetAnalysis" (zatvorí modál)
                    resetAnalysis={closeModal}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MojProfil;
