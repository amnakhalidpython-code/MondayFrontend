import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './signup.css';
import { 
  auth, 
  googleProvider, 
  microsoftProvider, 
  signInWithPopup,
  database,
  ref,
  set,
  onAuthStateChanged
} from '../../../utils/firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const { saveEmailForSignup, login, user: contextUser } = useAuth();
  
  const hasNavigated = useRef(false);
  const isAuthenticating = useRef(false);
  const unsubscribeRef = useRef(null);
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  useEffect(() => {
    let isMounted = true;

    const checkAuth = () => {
      if (contextUser && !hasNavigated.current) {
        hasNavigated.current = true;
        setCheckingAuth(false);
        setTimeout(() => navigate('/three', { replace: true }), 0);
        return;
      }

      unsubscribeRef.current = onAuthStateChanged(auth, (user) => {
        if (!isMounted) return;
        
        if (user && !hasNavigated.current) {
          hasNavigated.current = true;
          if (unsubscribeRef.current) unsubscribeRef.current();
          setTimeout(() => navigate('/three', { replace: true }), 0);
        } else if (!user) {
          setCheckingAuth(false);
        }
      });
    };

    checkAuth();

    return () => {
      isMounted = false;
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [contextUser, navigate]);

  if (checkingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#ffffff' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #0073ea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const saveEmailToBackend = async (emailAddress) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress })
      });

      if (!response.ok) {
        // If server responds with error status (e.g. 500), handle it
        throw new Error('Server error');
      }

      const data = await response.json();
      console.log('Email saved successfully:', data);
      return true;
    } catch (error) {
      console.error('Error saving email:', error);
      // Even if backend fails, return TRUE so frontend flow continues
      // Remove this behavior in production if backend is critical
      return true; 
    }
  };

  const saveAccountToMongoDB = async (user) => {
    try {
      await fetch('http://localhost:5000/api/account/save-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          fullName: user.displayName || user.email.split('@')[0],
          accountName: user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
        })
      });
    } catch (error) {
      console.error('❌ MongoDB account save error:', error);
    }
  };

  const handleOAuthSignIn = async (provider, setLoading, providerName) => {
    if (isAuthenticating.current || hasNavigated.current) return;
    
    isAuthenticating.current = true;
    setLoading(true);
    
    try {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: providerName,
        createdAt: new Date().toISOString()
      });
      
      // Try to save to MongoDB, but don't block navigation if it fails
      saveAccountToMongoDB(user).catch(err => console.log('MongoDB save skipped'));

      localStorage.setItem('userEmail', user.email);
      
      await login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: providerName
      });
      
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        navigate('/three', { replace: true });
      }
    } catch (error) {
      console.error(`${providerName} Sign-In error:`, error);
      isAuthenticating.current = false;
      setLoading(false);
      
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        alert(`${providerName} Sign-In failed: ${error.message}`);
      }
    }
  };

  const handleContinue = async () => {
    if (!email || !isValidEmail(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
      return;
    }
    
    setContinueLoading(true);
    
    // Attempt save, but proceed regardless of backend status (due to catch block returning true)
    await saveEmailToBackend(email);
    
    localStorage.setItem('userEmail', email);
    saveEmailForSignup(email);
    navigate('/two');
    
    setContinueLoading(false);
  };

  return (
    <div className="signup-container">
      <motion.div className="left-section" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="content-wrapper">
          <motion.div variants={itemVariants}>
            <h1 className="main-heading">Welcome to monday.com</h1>
            <h2 className="sub-heading">Get started - it's free. No credit card needed.</h2>
          </motion.div>

          <motion.div className="form-content" variants={itemVariants}>
            {/* OAuth Buttons */}
            <div className="oauth-buttons">
              <motion.button
                onClick={() => handleOAuthSignIn(googleProvider, setGoogleLoading, 'google')}
                disabled={googleLoading}
                className="oauth-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <img src="https://dapulse-res.cloudinary.com/image/upload/remote_logos/995426/google-icon.svg" alt="" className="oauth-icon" />
                <span>{googleLoading ? 'Signing in...' : 'Continue with Google'}</span>
              </motion.button>

              <motion.button
                onClick={() => handleOAuthSignIn(microsoftProvider, setMicrosoftLoading, 'microsoft')}
                disabled={microsoftLoading}
                className="oauth-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <img src="https://dapulse-res.cloudinary.com/image/upload/v1702826399/Growth%20Activation/Signup/soft-signup/logo_microsoft.png" alt="" className="oauth-icon" />
                <span>{microsoftLoading ? 'Signing in...' : 'Continue with Microsoft'}</span>
              </motion.button>
            </div>

            {/* Divider */}
            <motion.div className="divider" variants={itemVariants}>
              <div className="divider-line"></div>
              <div className="divider-text">Or</div>
              <div className="divider-line"></div>
            </motion.div>

            {/* Email Section */}
            <motion.div variants={itemVariants}>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`email-input ${emailError ? 'error' : ''}`}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
              <AnimatePresence>
                {emailError && (
                  <motion.div className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    Please enter a valid email address
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleContinue}
                disabled={continueLoading}
                className="continue-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {continueLoading ? 'Saving...' : 'Continue'}
              </motion.button>
            </motion.div>

            {/* Terms */}
            <motion.div className="terms" variants={itemVariants}>
              <div>By proceeding, you agree to the</div>
              <div>
                <a href="https://monday.com/l/legal/tos/" target="_blank" rel="noreferrer">Terms of Service</a>
                <span> and </span>
                <a href="https://monday.com/l/privacy/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="footer" variants={itemVariants}>
            <span>Already have a monday.com account? </span>
            <a href="/auth/login_monday?product_kind=core">Log in</a>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div className="right-section" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.img 
          src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png" 
          alt=""
          className="right-image"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default SignUp;