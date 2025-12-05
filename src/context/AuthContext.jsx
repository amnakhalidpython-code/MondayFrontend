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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    
    // Check if user data exists in sessionStorage
    const storedUser = sessionStorage.getItem('mondayUser');
    const storedEmail = sessionStorage.getItem('mondaySignupEmail');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        sessionStorage.removeItem('mondayUser');
      }
    }
    
    if (storedEmail) {
      setEmailForSignup(storedEmail);
    }
    
    // Also listen to Firebase auth state changes
    unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && !storedUser) {
        // If Firebase has a user but sessionStorage doesn't, sync them
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

    // If no Firebase auth state change, just set loading to false after a brief moment
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      if (unsubscribe) unsubscribe();
      clearTimeout(timeout);
    };
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