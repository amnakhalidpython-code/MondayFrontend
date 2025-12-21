// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../utils/firebase';

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
  const [userCategory, setUserCategory] = useState(null); // 🆕 NEW STATE
  const [userRole, setUserRole] = useState(null); // 🆕 NEW STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    
    const storedUser = sessionStorage.getItem('mondayUser');
    const storedEmail = sessionStorage.getItem('mondaySignupEmail');
    const storedCategory = sessionStorage.getItem('userCategory'); // 🆕
    const storedRole = sessionStorage.getItem('userRole'); // 🆕
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        sessionStorage.removeItem('mondayUser');
      }
    }
    
    if (storedEmail) setEmailForSignup(storedEmail);
    if (storedCategory) setUserCategory(storedCategory); // 🆕
    if (storedRole) setUserRole(storedRole); // 🆕
    
    unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && !storedUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        };
        setUser(userData);
        sessionStorage.setItem('mondayUser', JSON.stringify(userData));
      }
      setLoading(false);
    });

    const timeout = setTimeout(() => setLoading(false), 500);

    return () => {
      if (unsubscribe) unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const saveEmailForSignup = (email) => {
    setEmailForSignup(email);
    sessionStorage.setItem('mondaySignupEmail', email);
  };

  // 🆕 Save category aur role
  const saveUserCategory = (category, role) => {
    setUserCategory(category);
    setUserRole(role);
    sessionStorage.setItem('userCategory', category);
    sessionStorage.setItem('userRole', role);
  };

  const clearEmailForSignup = () => {
    setEmailForSignup(null);
    sessionStorage.removeItem('mondaySignupEmail');
  };

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('mondayUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setEmailForSignup(null);
    setUserCategory(null); // 🆕
    setUserRole(null); // 🆕
    sessionStorage.removeItem('mondayUser');
    sessionStorage.removeItem('mondaySignupEmail');
    sessionStorage.removeItem('userCategory'); // 🆕
    sessionStorage.removeItem('userRole'); // 🆕
  };

  const value = {
    user,
    emailForSignup,
    userCategory, // 🆕
    userRole, // 🆕
    saveEmailForSignup,
    saveUserCategory, // 🆕
    clearEmailForSignup,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};