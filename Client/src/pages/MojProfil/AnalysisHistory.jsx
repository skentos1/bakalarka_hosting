// src/components/AnalysisHistory.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AnalysisHistory = () => {
  const { auth } = useContext(AuthContext);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get('/api/analyze', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setAnalyses(response.data.analyses);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error fetching analyses.</div>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#cea2fd] mb-6">História Analýz</h2>

        {analyses.length === 0 ? (
          <div className="text-center text-gray-400">Nemáte žiadne analýzy.</div>
        ) : (
          <ul className="space-y-4">
            {analyses.map((analysis) => (
              <li key={analysis._id} className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">Analýza z: {new Date(analysis.createdAt).toLocaleString()}</p>
                    <p className="text-gray-400">ID: {analysis._id}</p>
                  </div>
                  <Link to={`/analysis/${analysis._id}`} className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full transition-colors">
                    Zobraziť
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnalysisHistory;
