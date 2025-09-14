import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { loadIsLoggedIn, saveIsLoggedIn } from '../storage/Storage';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await loadIsLoggedIn();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  const login = async () => {
    // In a real app, this would involve API calls
    await saveIsLoggedIn(true);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await saveIsLoggedIn(false);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
