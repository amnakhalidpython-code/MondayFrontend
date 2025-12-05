import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [emailForSignup, setEmailForSignup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in sessionStorage
    const storedUser = sessionStorage.getItem('mondayUser');
    const storedEmail = sessionStorage.getItem('mondaySignupEmail');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        sessionStorage.removeItem('mondayUser');
      }
    }
    
    if (storedEmail) {
      setEmailForSignup(storedEmail);
    }
    
    setLoading(false);
  }, []);

  // Save email after first step
  const saveEmailForSignup = (email) => {
    setEmailForSignup(email);
    sessionStorage.setItem('mondaySignupEmail', email);
  };

  // Clear email (after complete signup)
  const clearEmailForSignup = () => {
    setEmailForSignup(null);
    sessionStorage.removeItem('mondaySignupEmail');
  };

  // Login/Register user
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('mondayUser', JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
    setEmailForSignup(null);
    sessionStorage.removeItem('mondayUser');
    sessionStorage.removeItem('mondaySignupEmail');
  };

  const value = {
    user,
    emailForSignup,
    saveEmailForSignup,
    clearEmailForSignup,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};