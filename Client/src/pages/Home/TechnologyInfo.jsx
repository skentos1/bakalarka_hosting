import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const TechnologyInfo = ({ technology }) => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto py-12 px-4 sm:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      key={technology.name}
      transition={{ duration: 0.6 }}
    >
      {/* Left Side: Title, Description, and Action Button */}
      <div className="lg:w-1/2 w-full text-left lg:pr-12 mb-12 lg:mb-0">
        <h1 className="text-5xl sm:text-6xl  font-bold leading-tight text-white mb-4">
          Introducing{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            {technology.name}
          </span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">{technology.description}</p>
        <Link to={technology.link}>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transform transition"
            whileHover={{ scale: 1.05 }}
          >
            Zistiť viac
          </motion.button>
        </Link>
      </div>

      {/* Right Side: Graph */}
      <div className="lg:w-1/2 w-full">
      <div className="h-96 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={technology.chartData}>
              <defs>
                <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2a32" />
              <XAxis dataKey="year" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2a2730",
                  borderColor: "#8884d8",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey={technology.dataKey}
                stroke="url(#lineColor)"
                strokeWidth={4}
                dot={{ r: 5, fill: "#8884d8" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default TechnologyInfo;
