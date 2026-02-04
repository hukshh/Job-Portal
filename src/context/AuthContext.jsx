import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const AuthContext = createContext();

const USER_KEY = 'jobPortalUser';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = storage.get(USER_KEY);
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple auth — real impl would call a backend API
    if (email && password.length >= 6) {
      const userData = {
        id: Date.now(),
        email,
        profile: {
          fullName: '',
          phone: '',
          location: '',
          headline: '',
          bio: '',
        },
        resume: null,
        createdAt: new Date().toISOString(),
      };
      setUser(userData);
      storage.set(USER_KEY, userData);
      return userData;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    storage.remove(USER_KEY);
  };

  const updateProfile = (profileData) => {
    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...profileData },
    };
    setUser(updatedUser);
    storage.set(USER_KEY, updatedUser);
    return updatedUser;
  };

  const updateResume = (resumeData) => {
    const updatedUser = { ...user, resume: resumeData };
    setUser(updatedUser);
    storage.set(USER_KEY, updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile,
        updateResume,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
