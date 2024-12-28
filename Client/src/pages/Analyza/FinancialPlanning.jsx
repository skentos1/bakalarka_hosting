// FinancialPlanning.jsx
import React from "react";
import { FaChartPie, FaMoneyBillWave } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const FinancialPlanning = ({ data }) => {
  if (!data) {
    return <p>Žiadne finančné plánovanie na zobrazenie.</p>;
  }

  const cashFlowData = data.cashFlowProjection;

  return (
    <div className="bg-gray-900 p-6 rounded-md">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <FaMoneyBillWave className="text-green-500 mr-2" />
        Finančné plánovanie
      </h3>
      <div className="space-y-8">
        {/* Analýza nákladov a prínosov */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartPie className="text-blue-500 mr-2" />
            Analýza nákladov a prínosov
          </h4>
          <p className="text-gray-300">{data.costBenefitAnalysis || "N/A"}</p>
        </div>
        {/* Cash Flow Projection with Chart */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <FaMoneyBillWave className="text-yellow-500 mr-2" />
            Cash Flow Projekcia
          </h4>
          {cashFlowData && cashFlowData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="month" stroke="#ccc" />
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
          ) : (
            <p className="text-gray-300">Cash flow dáta nie sú k dispozícii.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanning;
