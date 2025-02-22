// FintechForm.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const FintechForm = ({ setCompanyInfo, setSuggestions, setError }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [location, setLocation] = useState("");
  const [currentTech, setCurrentTech] = useState("");
  const [financialGoals, setFinancialGoals] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [businessChallenges, setBusinessChallenges] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [competitiveLandscape, setCompetitiveLandscape] = useState("");
  const [digitalPresence, setDigitalPresence] = useState([]);
  const [budgetConstraints, setBudgetConstraints] = useState("");
  const [regulatoryConsiderations, setRegulatoryConsiderations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");

  const handleDigitalPresenceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDigitalPresence([...digitalPresence, value]);
    } else {
      setDigitalPresence(digitalPresence.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      companyName,
      industry,
      companyType,
      companySize,
      location,
      currentTech,
      financialGoals,
      customerType,
      businessChallenges,
      targetMarket,
      competitiveLandscape,
      digitalPresence,
      budgetConstraints,
      regulatoryConsiderations,
    };

    setCompanyInfo(formData);

    // // Construct companyInfo from form inputs
    // const companyInfo = {
    //   companyName,
    //   industry,
    //   companyType,
    //   companySize,
    //   location,
    //   currentTech,
    //   financialGoals,
    //   customerType,
    //   businessChallenges,
    //   targetMarket,
    //   competitiveLandscape,
    //   digitalPresence,
    //   budgetConstraints,
    //   regulatoryConsiderations,
    // };

    // Pass companyInfo to parent component
    //setCompanyInfo(companyInfo);

    // Prepare data for the backend
    const companyData = `
      Názov spoločnosti: ${companyName}
      Odvetvie: ${industry}
      Typ podniku: ${companyType}
      Veľkosť spoločnosti: ${companySize}
      Lokalita: ${location}
      Aktuálne používané technológie: ${currentTech}
      Finančné ciele: ${financialGoals}
      Typ zákazníkov: ${customerType}
      Obchodné výzvy: ${businessChallenges}
      Cieľový trh: ${targetMarket}
      Konkurenčné prostredie: ${competitiveLandscape}
      Digitálna prítomnosť: ${digitalPresence.join(", ")}
      Rozpočtové obmedzenia: ${budgetConstraints}
      Regulačné požiadavky: ${regulatoryConsiderations}
    `;

    setIsLoading(true);
    setProgress(0);
    setProgressMessage("Spracúvam dáta...");

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          return prev + 1;
        } else if (prev < 60) {
          setProgressMessage("Analyzujem informácie...");
          return prev + 1;
        } else if (prev < 90) {
          setProgressMessage("Generujem odporúčania...");
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 100);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://bakalarka-hosting.onrender.com/api/analyze", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? {Authorization: `Bearer ${token}` } : {}),
         },
         body: JSON.stringify({ formData, companyData }),
      });

      clearInterval(progressInterval);
      setProgress(100);
      setProgressMessage("Dokončené!");

      if (!response.ok) {
        const errorData = await response.text();
        setError(`Server vrátil chybu: ${errorData}`);
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      // Now result.suggestions should be an object
      if (typeof result.suggestions === "object") {
        setSuggestions(result.suggestions);
        setIsLoading(false);
      } else {
        console.error(
          "Expected suggestions to be an object but got:",
          typeof result.suggestions
        );
        setError("Neplatný formát údajov z servera.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Chyba pri získavaní údajov:", error);
      setError("Nastala neočakávaná chyba.");
      setIsLoading(false);
      clearInterval(progressInterval);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">
              Krok 1: Základné informácie o spoločnosti
            </h2>
            <label className="block font-semibold mb-2">
              Názov spoločnosti:
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Napríklad: ABC s.r.o."
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
            </label>
            <label className="block font-semibold mb-2">
              Odvetvie:
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              >
                <option value="">Vyberte odvetvie</option>
                <option value="Maloobchod">Maloobchod</option>
                <option value="Financie">Financie</option>
                <option value="Zdravotníctvo">Zdravotníctvo</option>
                <option value="Technológie">Technológie</option>
                <option value="Potravinárstvo">Potravinárstvo</option>
              </select>
            </label>
            <label className="block font-semibold mb-2">
              Typ podniku:
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                required
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              >
                <option value="">Vyberte typ podniku</option>
                <option value="Súkromná spoločnosť">Súkromná spoločnosť</option>
                <option value="Štátna organizácia">Štátna organizácia</option>
                <option value="Nezisková organizácia">
                  Nezisková organizácia
                </option>
                <option value="Startup">Startup</option>
              </select>
            </label>
            <label className="block font-semibold mb-2">
              Veľkosť spoločnosti:
              <input
                type="text"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                required
                placeholder="Napríklad: 50 zamestnancov"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
            </label>
            <label className="block font-semibold mb-2">
              Lokalita:
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Napríklad: Bratislava"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">
              Krok 2: Technológie a Finančné ciele
            </h2>
            <label className="block font-semibold mb-2">
              Aktuálne používané technológie:
              <textarea
                value={currentTech}
                onChange={(e) => setCurrentTech(e.target.value)}
                required
                placeholder="Napríklad: Excel pre finančné výkazy, online fakturačný systém..."
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 resize-none h-24"
              />
            </label>
            <label className="block font-semibold mb-2">
              Finančné ciele:
              <textarea
                value={financialGoals}
                onChange={(e) => setFinancialGoals(e.target.value)}
                required
                placeholder="Napríklad: Zvýšiť ročné tržby o 20%, znížiť náklady o 10%..."
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 resize-none h-24"
              />
            </label>
            <label className="block font-semibold mb-2">
              Typ zákazníkov:
              <input
                type="text"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                required
                placeholder="Napríklad: Maloobchodní zákazníci, firmy"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
            </label>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">
              Krok 3: Cieľový trh a výzvy
            </h2>
            <label className="block font-semibold mb-2">
              Obchodné výzvy:
              <textarea
                value={businessChallenges}
                onChange={(e) => setBusinessChallenges(e.target.value)}
                required
                placeholder="Napríklad: Nízka online viditeľnosť, zastaralé platobné systémy..."
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 resize-none h-24"
              />
            </label>
            <label className="block font-semibold mb-2">
              Cieľový trh:
              <input
                type="text"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                required
                placeholder="Napríklad: Mladí profesionáli vo veku 25-35 rokov"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
            </label>
            <label className="block font-semibold mb-2">
              Konkurenčné prostredie:
              <textarea
                value={competitiveLandscape}
                onChange={(e) => setCompetitiveLandscape(e.target.value)}
                required
                placeholder="Napríklad: Niekoľko miestnych konkurentov s online prítomnosťou"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 resize-none h-24"
              />
            </label>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">
              Krok 4: Rozpočet a digitálna prítomnosť
            </h2>
            <label className="block font-semibold mb-2">
              Digitálna prítomnosť:
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Webová stránka"
                  onChange={handleDigitalPresenceChange}
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Webová stránka</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Mobilná aplikácia"
                  onChange={handleDigitalPresenceChange}
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Mobilná aplikácia</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Sociálne siete"
                  onChange={handleDigitalPresenceChange}
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Sociálne siete</span>
              </label>
            </div>

            <label className="block font-semibold mb-2 mt-4">
              Rozpočtové obmedzenia (EUR):
              <input
                type="number"
                min="0"
                value={budgetConstraints}
                onChange={(e) => setBudgetConstraints(e.target.value)}
                required
                placeholder="Napríklad: 10 000"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
            </label>
            <label className="block font-semibold mb-2">
              Regulačné požiadavky:
              <textarea
                value={regulatoryConsiderations}
                onChange={(e) => setRegulatoryConsiderations(e.target.value)}
                required
                placeholder="Napríklad: Potravinárske predpisy, hygienické normy..."
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 resize-none h-24"
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {renderStepContent(currentStep)}
      </motion.div>

      {/* Loading and Progress */}
      {isLoading && (
        <div className="mt-6">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600 transition-all duration-200"
              ></div>
            </div>
            <p className="text-center text-gray-400">{progressMessage}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      {!isLoading && (
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-700 text-white rounded-md"
            >
              Späť
            </button>
          )}
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            >
              Ďalej
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Analyzovať
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FintechForm;
