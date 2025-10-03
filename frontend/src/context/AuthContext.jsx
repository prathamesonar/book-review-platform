import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);
    } catch (error) {
      
      throw error.response.data.message || 'An error occurred during login.';
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post('/api/users/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);
    } catch (error) {
      throw error.response.data.message || 'An error occurred during sign up.';
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};