import React, { createContext, useContext, useState } from 'react';
import { mockUserProfile, UserProfileData } from '../data/mock';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfileData | null;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfileData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fraudguard_logged_in') === 'true';
  });

  const [user, setUser] = useState<UserProfileData | null>(() => {
    return mockUserProfile;
  });

  const login = (email: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('fraudguard_logged_in', 'true');
    if (user) {
      setUser({ ...user, email: email || user.email });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fraudguard_logged_in');
  };

  const updateProfile = (updated: Partial<UserProfileData>) => {
    if (user) {
      setUser((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile }}>
      {children}
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
