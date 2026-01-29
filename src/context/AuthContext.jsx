import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('jobPortalUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('jobPortalUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple authentication - in real app, this would call a backend
    if (email && password.length >= 6) {
      const userData = {
        id: Date.now(),
        email,
        profile: {
          fullName: '',
          phone: '',
          location: '',
          headline: '',
          bio: ''
        },
        resume: null,
        createdAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('jobPortalUser', JSON.stringify(userData));
      return userData;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobPortalUser');
  };

  const updateProfile = (profileData) => {
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profileData
      }
    };
    setUser(updatedUser);
    localStorage.setItem('jobPortalUser', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const updateResume = (resumeData) => {
    const updatedUser = {
      ...user,
      resume: resumeData
    };
    setUser(updatedUser);
    localStorage.setItem('jobPortalUser', JSON.stringify(updatedUser));
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
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
