import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected Route for /two, /three, /four, /five, /six pages
// Allows access if:
// 1. User has emailForSignup (email signup flow), OR
// 2. User is authenticated via OAuth (Google/Microsoft)
export const SignupProtectedRoute = ({ children }) => {
  const { emailForSignup, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '18px',
        color: '#323338'
      }}>
        Loading...
      </div>
    );
  }

  // Allow access if:
  // - User completed email step (emailForSignup exists), OR
  // - User authenticated via OAuth (user exists)
  if (!emailForSignup && !user) {
    return <Navigate to="/one" replace />;
  }

  return children;
};

// Protected Route for authenticated pages (after complete signup)
// Only for fully authenticated users
export const AuthProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '18px',
        color: '#323338'
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to /one
  if (!user) {
    return <Navigate to="/one" replace />;
  }

  return children;
};