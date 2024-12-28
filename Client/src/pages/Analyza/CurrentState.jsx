// CurrentState.jsx
import React from "react";
import {
  FaBuilding,
  FaIndustry,
  FaUsers,
  FaMapMarkerAlt,
  FaLaptop,
  FaBullseye,
  FaChartLine,
  FaHandshake,
  FaGlobe,
  FaMoneyBillWave,
  FaBalanceScale,
} from "react-icons/fa";

const CurrentState = ({ data }) => {
  if (!data) {
    return <p>Žiadne dáta na zobrazenie.</p>;
  }

  const items = [
    {
      label: "Názov spoločnosti",
      value: data.companyName || "Neuvedené",
      icon: FaBuilding,
    },
    {
      label: "Odvetvie",
      value: data.industry || "Neuvedené",
      icon: FaIndustry,
    },
    {
      label: "Typ podniku",
      value: data.companyType || "Neuvedené",
      icon: FaUsers,
    },
    {
      label: "Veľkosť spoločnosti",
      value: data.companySize || "Neuvedené",
      icon: FaUsers,
    },
    {
      label: "Lokalita",
      value: data.location || "Neuvedené",
      icon: FaMapMarkerAlt,
    },
    {
      label: "Aktuálne používané technológie",
      value: data.currentTech || "Neuvedené",
      icon: FaLaptop,
    },
    {
      label: "Finančné ciele",
      value: data.financialGoals || "Neuvedené",
      icon: FaBullseye,
    },
    {
      label: "Typ zákazníkov",
      value: data.customerType || "Neuvedené",
      icon: FaHandshake,
    },
    {
      label: "Obchodné výzvy",
      value: data.businessChallenges || "Neuvedené",
      icon: FaChartLine,
    },
    {
      label: "Cieľový trh",
      value: data.targetMarket || "Neuvedené",
      icon: FaGlobe,
    },
    {
      label: "Konkurenčné prostredie",
      value: data.competitiveLandscape || "Neuvedené",
      icon: FaBalanceScale,
    },
    {
      label: "Digitálna prítomnosť",
      value:
        data.digitalPresence && data.digitalPresence.length > 0
          ? data.digitalPresence.join(", ")
          : "Neuvedené",
      icon: FaLaptop,
    },
    {
      label: "Rozpočtové obmedzenia",
      value: data.budgetConstraints
        ? `${data.budgetConstraints} EUR`
        : "Neuvedené",
      icon: FaMoneyBillWave,
    },
    {
      label: "Regulačné požiadavky",
      value: data.regulatoryConsiderations || "Neuvedené",
      icon: FaBalanceScale,
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center">
        Základný stav spoločnosti
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 flex items-start shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0">
                <Icon className="text-purple-500 h-6 w-6 mt-1" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">{item.label}</h4>
                <p className="text-gray-300 mt-1 whitespace-pre-line">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentState;
