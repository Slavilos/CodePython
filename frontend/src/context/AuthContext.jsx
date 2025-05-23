import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdminSession, setIsAdminSession] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const adminSession = localStorage.getItem('isAdminSession') === 'true';
    if (storedUser && storedUser.token) {
      if (storedUser.user) {
        setUser({ ...storedUser.user, token: storedUser.token });
      } else {
        setUser(storedUser);
      }
    }
    setIsAdminSession(adminSession);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      let userData;
      if (data.user) {
        userData = { ...data.user, token: data.token };
      } else {
        userData = { ...data, token: data.token };
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      let newUserData;
      if (data.user) {
        newUserData = { ...data.user, token: data.token };
      } else {
        newUserData = { ...data, token: data.token };
      }
      setUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));
      return newUserData;
    } catch (error) {
      throw error;
    }
  };

  const setAdminSession = () => {
    setIsAdminSession(true);
    localStorage.setItem('isAdminSession', 'true');
  };

  const clearAdminSession = () => {
    setIsAdminSession(false);
    localStorage.removeItem('isAdminSession');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user');
    clearAdminSession();
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
    isAdminSession,
    setAdminSession,
    clearAdminSession
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 