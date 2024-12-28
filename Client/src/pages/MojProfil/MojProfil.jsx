// src/components/MojProfil.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const MojProfil = () => {
  const { auth, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setProfile(response.data.user);
        } catch (err) {
          console.error(err);
          setError('Nepodarilo sa načítať profil.');
          logout();
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [auth.token, logout]);

  if (loading) {
    return <div className="text-white">Načítavanie...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#cea2fd] mb-6">Môj Profil</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-300"><strong>Meno:</strong> {profile.firstName}</p>
          </div>
          <div>
            <p className="text-gray-300"><strong>Priezvisko:</strong> {profile.lastName}</p>
          </div>
          <div>
            <p className="text-gray-300"><strong>Email:</strong> {profile.email}</p>
          </div>
          {/* Pridajte ďalšie polia podľa potreby */}
        </div>
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Odhlásiť sa
        </button>
      </div>
    </div>
  );
};

export default MojProfil;
