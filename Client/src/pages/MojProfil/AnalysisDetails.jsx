// src/components/AnalysisDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const AnalysisDetails = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(`/api/analyze/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error || !analysis) return <div className="text-red-500">Error fetching analysis.</div>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#cea2fd] mb-6">Detail Analýzy</h2>

        <div className="mb-4">
          <p className="text-white font-semibold">Údaje spoločnosti:</p>
          <p className="text-gray-300 whitespace-pre-wrap">{analysis.companyData}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#cea2fd] mb-2">Odporúčania</h3>
          {analysis.analysisResult.recommendations.map((rec, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-xl font-semibold text-white">{rec.title}</p>
              <p className="text-gray-300">{rec.description}</p>
              <p className="text-gray-400"><strong>Implementačné kroky:</strong> {rec.implementationSteps.join(', ')}</p>
              <p className="text-gray-400"><strong>Očakávané náklady:</strong> {rec.expectedCosts}</p>
              <p className="text-gray-400"><strong>Potenciálne výhody:</strong> {rec.potentialBenefits}</p>
              <p className="text-gray-400"><strong>Riziká a výzvy:</strong> {rec.risks}</p>
              <p className="text-gray-400"><strong>Príklady úspešného využitia:</strong> {rec.examples}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#cea2fd] mb-2">Finančné plánovanie</h3>
          <p className="text-gray-300"><strong>Analýza nákladov a prínosov:</strong> {analysis.analysisResult.financialPlanning.costBenefitAnalysis}</p>
          <div className="mt-2">
            <strong>Cash flow projekcia:</strong>
            <table className="w-full mt-2 text-left text-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2">Mesiac</th>
                  <th className="px-4 py-2">Peňažný tok</th>
                </tr>
              </thead>
              <tbody>
                {analysis.analysisResult.financialPlanning.cashFlowProjection.map((item, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-4 py-2">{item.month}</td>
                    <td className="px-4 py-2">{item.cashFlow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#cea2fd] mb-2">Záver</h3>
          <p className="text-gray-300">{analysis.analysisResult.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
