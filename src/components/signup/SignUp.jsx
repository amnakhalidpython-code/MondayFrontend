import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  auth, 
  googleProvider, 
  microsoftProvider, 
  signInWithPopup,
  database,
  ref,
  set,
  onAuthStateChanged
} from '../../utils/firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const { saveEmailForSignup, login } = useAuth();
  
  // Navigation guards
  const hasNavigated = useRef(false);
  const isAuthenticating = useRef(false);
  const unsubscribeRef = useRef(null);
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is already authenticated - ONLY ONCE!
  useEffect(() => {
    let isMounted = true;

    const checkAuth = () => {
      unsubscribeRef.current = onAuthStateChanged(auth, (user) => {
        if (!isMounted) return;
        
        if (user && !hasNavigated.current) {
          console.log('User already authenticated, redirecting...');
          hasNavigated.current = true;
          
          // Cleanup listener before navigation
          if (unsubscribeRef.current) {
            unsubscribeRef.current();
          }
          
          // Use setTimeout to prevent React warning
          setTimeout(() => {
            navigate('/three', { replace: true });
          }, 0);
        } else if (!user) {
          setCheckingAuth(false);
        }
      });
    };

    checkAuth();

    return () => {
      isMounted = false;
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []); // Empty dependency array - run ONCE only

  // Show loading spinner while checking authentication
  if (checkingAuth) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #0073ea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Save email to backend
  const saveEmailToBackend = async (emailAddress) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailAddress })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Email saved successfully:', data);
        return true;
      } else {
        console.error('Failed to save email:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error saving email:', error);
      alert('Failed to save email. Please try again.');
      return false;
    }
  };

  const handleGoogleSignIn = async () => {
    if (googleLoading || isAuthenticating.current || hasNavigated.current) {
      console.log('Auth already in progress');
      return;
    }
    
    isAuthenticating.current = true;
    setGoogleLoading(true);
    
    try {
      // Cleanup auth listener before popup to prevent double navigation
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('Google Sign-In successful:', user);
      
      // Save user data to Firebase database
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google',
        createdAt: new Date().toISOString()
      });
      
      // Save user to context
      await login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google'
      });
      
      // Navigate only once
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        console.log('Navigating to /three...');
        
        setTimeout(() => {
          navigate('/three', { replace: true });
        }, 100);
      }
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      isAuthenticating.current = false;
      setGoogleLoading(false);
      
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      } else if (error.code === 'auth/popup-blocked') {
        alert('Pop-up blocked by browser. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        return;
      } else {
        alert('Google Sign-In failed: ' + error.message);
      }
    }
  };

  const handleMicrosoftSignIn = async () => {
    if (microsoftLoading || isAuthenticating.current || hasNavigated.current) {
      console.log('Auth already in progress');
      return;
    }
    
    isAuthenticating.current = true;
    setMicrosoftLoading(true);
    
    try {
      // Cleanup auth listener before popup to prevent double navigation
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;
      
      console.log('Microsoft Sign-In successful:', user);
      
      // Save user data to Firebase database
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'microsoft',
        createdAt: new Date().toISOString()
      });
      
      // Save user to context
      await login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'microsoft'
      });
      
      // Navigate only once
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        console.log('Navigating to /three...');
        
        setTimeout(() => {
          navigate('/three', { replace: true });
        }, 100);
      }
      
    } catch (error) {
      console.error('Microsoft Sign-In error:', error);
      isAuthenticating.current = false;
      setMicrosoftLoading(false);
      
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      } else if (error.code === 'auth/popup-blocked') {
        alert('Pop-up blocked by browser. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        return;
      } else {
        alert('Microsoft Sign-In failed: ' + error.message);
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
    
    const saved = await saveEmailToBackend(email);
    
    if (saved) {
      console.log('Continue with email:', email);
      saveEmailForSignup(email);
      navigate('/two');
    }
    
    setContinueLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
      fontWeight: 400,
      overflow: 'hidden'
    }}>
      {/* Left Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '88px 100px',
        width: '768px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '660px',
          minWidth: '300px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {/* Header */}
              <div style={{ display: 'block', marginBottom: '48px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <h1 style={{
                    fontFamily: 'Poppins, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
                    fontSize: '32px',
                    fontWeight: 500,
                    lineHeight: '40px',
                    letterSpacing: '-0.5px',
                    color: '#323338',
                    textAlign: 'center',
                    margin: '0 0 8px 0',
                    WebkitFontSmoothing: 'antialiased'
                  }}>
                    Welcome to monday.com
                  </h1>
                </div>
                <h2 style={{
                  fontFamily: 'Poppins, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '30px',
                  letterSpacing: '-0.1px',
                  color: '#323338',
                  textAlign: 'center',
                  margin: '0',
                  WebkitFontSmoothing: 'antialiased'
                }}>
                  Get started - it's free. No credit card needed.
                </h2>
              </div>

              {/* Form Content */}
              <div style={{ width: '400px' }}>
                {/* OAuth Buttons */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '16px'
                }}>
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '40px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      border: '0.8px solid #c3c6d4',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#323338',
                      cursor: googleLoading ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      outline: 'none',
                      opacity: googleLoading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => !googleLoading && (e.currentTarget.style.backgroundColor = '#f6f7fb')}
                    onMouseLeave={(e) => !googleLoading && (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)')}
                  >
                    <img 
                      src="https://dapulse-res.cloudinary.com/image/upload/remote_logos/995426/google-icon.svg" 
                      alt="Continue with Google"
                      style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    />
                    <span>{googleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                  </button>

                  <button
                    onClick={handleMicrosoftSignIn}
                    disabled={microsoftLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '40px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      border: '0.8px solid #c3c6d4',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#323338',
                      cursor: microsoftLoading ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      outline: 'none',
                      opacity: microsoftLoading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => !microsoftLoading && (e.currentTarget.style.backgroundColor = '#f6f7fb')}
                    onMouseLeave={(e) => !microsoftLoading && (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)')}
                  >
                    <img 
                      src="https://dapulse-res.cloudinary.com/image/upload/v1702826399/Growth%20Activation/Signup/soft-signup/logo_microsoft.png" 
                      alt="Continue with Microsoft"
                      style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    />
                    <span>{microsoftLoading ? 'Signing in...' : 'Continue with Microsoft'}</span>
                  </button>
                </div>

                {/* Divider */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  columnGap: '8px',
                  alignItems: 'center',
                  margin: '16px 0',
                  height: '19.2px'
                }}>
                  <div style={{ height: '1px', backgroundColor: '#dcdfec' }}></div>
                  <div style={{ fontSize: '14px', color: '#676879' }}>Or</div>
                  <div style={{ height: '1px', backgroundColor: '#dcdfec' }}></div>
                </div>

                {/* Email Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '100%', marginBottom: '16px' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      autoComplete="email"
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '8px 16px',
                        border: emailError ? '2px solid #ff0000' : '0.8px solid #c3c6d4',
                        borderRadius: '4px',
                        fontSize: '16px',
                        lineHeight: '22px',
                        color: '#323338',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        transition: 'border-color 0.1s ease-in',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => !emailError && (e.target.style.borderColor = '#0073ea')}
                      onBlur={(e) => !emailError && (e.target.style.borderColor = '#c3c6d4')}
                    />
                    {emailError && (
                      <div style={{
                        fontSize: '12px',
                        color: '#ff0000',
                        marginTop: '4px'
                      }}>
                        Please enter a valid email address
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleContinue}
                    disabled={continueLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '40px',
                      padding: '8px 16px',
                      backgroundColor: '#0073ea',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#ffffff',
                      cursor: continueLoading ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      outline: 'none',
                      marginBottom: '16px',
                      opacity: continueLoading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => !continueLoading && (e.currentTarget.style.backgroundColor = '#0060b9')}
                    onMouseLeave={(e) => !continueLoading && (e.currentTarget.style.backgroundColor = '#0073ea')}
                  >
                    {continueLoading ? 'Saving...' : 'Continue'}
                  </button>
                </div>

                {/* Terms */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#323338',
                      fontWeight: 300
                    }}>
                      By proceeding, you agree to the
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'max-content'
                  }}>
                    <a 
                      href="https://monday.com/l/legal/tos/" 
                      target="_blank" 
                      rel="noreferrer"
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#1f76c2',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Terms of Service
                    </a>
                    <div style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#323338',
                      fontWeight: 300,
                      margin: '0 4px'
                    }}>
                      and
                    </div>
                    <a 
                      href="https://monday.com/l/privacy/privacy-policy/" 
                      target="_blank" 
                      rel="noreferrer"
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#1f76c2',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '48px'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  color: '#323338',
                  marginRight: '4px'
                }}>
                  Already have a monday.com account?
                </span>
                <a 
                  href="/auth/login_monday?product_kind=core"
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1f76c2',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        flexBasis: '0%',
        flexGrow: 1,
        flexShrink: 1,
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          height: '100vh'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgb(97, 97, 255)',
            overflow: 'hidden',
            width: '100%'
          }}>
            <img 
              src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png" 
              alt=""
              data-testid="right-side-asset"
              style={{
                display: 'block',
                height: '100%',
                width: 'auto',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;