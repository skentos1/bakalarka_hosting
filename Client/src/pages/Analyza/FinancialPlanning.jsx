import React, { useState, useEffect } from "react";
import { FaChartPie, FaMoneyBillWave, FaExchangeAlt, FaInfoCircle } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const FinancialPlanning = ({ data }) => {
  if (!data) {
    return <p>Žiadne finančné plánovanie na zobrazenie.</p>;
  }

  const cashFlowData = data.cashFlowProjection;

  // Stav pre sledovanie šírky okna
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Stav pre manuálne prepínanie zobrazenia: "list" alebo "chart"
  const [viewMode, setViewMode] = useState("default");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Definujeme, či ide o malú obrazovku
  const isSmallScreen = windowWidth < 600;
  const chartHeight = isSmallScreen ? 200 : 300;
  const xAxisProps = isSmallScreen ? { angle: -45, textAnchor: "end" } : {};

  // Pre malé zariadenia: ak viewMode je "default", predvolene zobrazíme zoznam, inak podľa voľby
  const effectiveViewMode = isSmallScreen
    ? viewMode === "default"
      ? "list"
      : viewMode
    : "chart";

  // Variants pre flip animáciu (Framer Motion)
  const flipVariants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-md">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <FaMoneyBillWave className="text-green-500 mr-2" />
        Finančné plánovanie
      </h3>

      <div className="space-y-8">
        {/* Sekcia analýzy nákladov a prínosov */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartPie className="text-blue-500 mr-2" />
            Analýza nákladov a prínosov
          </h4>
          <p className="text-gray-300">{data.costBenefitAnalysis || "N/A"}</p>
        </div>

        {/* Sekcia Cash Flow Projekcie */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
          {/* Hlavný nadpis + tlačidlo (na malých obrazovkách) */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h4 className="text-xl font-semibold flex items-center mb-2 md:mb-0">
              <FaMoneyBillWave className="text-yellow-500 mr-2" />
              Cash Flow Projekcia

              {/* Ikona s vysvetlivkou (tooltip) */}
              
            </h4>

            {isSmallScreen && (
              
              <div className="flex justify-center items-center gap-4">
                <div className=" group ml-2">
                <FaInfoCircle className="text-gray-400 cursor-pointer" />
                {/* Tooltip - zobrazí sa pri hover */}
                <div className="absolute hidden group-hover:block w-64 bg-gray-800 text-white p-2 text-sm rounded shadow-lg z-10 top-6 left-0">
                  Cash Flow Projekcia predstavuje odhad budúcich finančných 
                  tokov (príjmov a výdavkov), ktoré pomáhajú posúdiť finančnú 
                  stabilitu a potreby financovania.
                </div>
              </div>
                <button
                  onClick={() =>
                    setViewMode(
                      effectiveViewMode === "list" ? "chart" : "list"
                    )
                  }
                  className="flex items-center bg-gradient-to-r from-purple-600 to-purple-400 text-white px-3 py-1 rounded transition duration-200 hover:scale-105 shadow-lg"
                >
                  <FaExchangeAlt className="mr-2" />
                  {effectiveViewMode === "list" ? "Graf" : "Zoznam"}
                </button>
                
              </div>
            )}
          </div>

          {cashFlowData && cashFlowData.length > 0 ? (
            <div style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait">
                {effectiveViewMode === "list" ? (
                  <motion.div
                    key="list"
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <div className="space-y-2">
                      {cashFlowData.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between p-2 bg-gray-700 rounded"
                        >
                          <span className="text-gray-300">{item.month}</span>
                          <span className="text-white">{item.cashFlow}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="chart"
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <ResponsiveContainer width="100%" height={chartHeight}>
                      <LineChart data={cashFlowData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                        <XAxis dataKey="month" stroke="#ccc" {...xAxisProps} />
                        <YAxis stroke="#ccc" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#333",
                            borderColor: "#555",
                          }}
                          labelStyle={{ color: "#fff" }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="cashFlow"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-gray-300">Cash flow dáta nie sú k dispozícii.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanning;
