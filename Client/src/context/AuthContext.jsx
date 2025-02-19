// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Vytvorenie kontextu
export const AuthContext = createContext();

// Poskytovateľ kontextu
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: null,
  });

  console.log('Initial auth state:', auth);

  // Funkcia na načítanie používateľa zo servera
  const fetchUser = async (token) => {
    try {
      console.log("Calling /api/auth/me with token =", token);
  
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Response data:", response.data); // Skontroluj celé response.data
      console.log("Fetched user:", response.data.user);
  
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: response.data.user,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  // Načítanie používateľa pri zmene tokenu
  useEffect(() => {
    if (auth.token) {
      fetchUser(auth.token);
    }
  }, [auth.token]);

  // Nastavenie hlavičky Authorization pre Axios
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [auth.token]);

  // Funkcia na prihlásenie
  const login = (token) => {
    console.log('Logging in with token:', token);
    localStorage.setItem('token', token);
    setAuth({ token, user: null }); // Používateľ bude načítaný v useEffect
  };

  // Funkcia na odhlásenie
  const logout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
