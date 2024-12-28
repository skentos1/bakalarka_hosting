// Conclusion.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Conclusion = ({ data }) => {
  if (!data) {
    return <p>Žiadny záver na zobrazenie.</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-md">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <FaCheckCircle className="text-green-500 mr-2" />
        Záver Analýzy
      </h3>
      <div className="bg-gray-800 p-6 rounded-md shadow-md">
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {data}
        </p>
      </div>
    </div>
  );
};

export default Conclusion;
