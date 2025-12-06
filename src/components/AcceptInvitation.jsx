import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

const AcceptInvitation = () => {
  const { accountName } = useParams(); // Dynamic account name from URL
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const acceptInvitation = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid invitation link. Token is missing.');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Accepting invitation...');
        console.log('Account:', accountName);
        console.log('Token:', token);

        const response = await fetch(
          `https://monday-clone-backend.vercel.app/api/invitations/accept/${token}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );

        const data = await response.json();
        console.log('Response:', data);

        if (response.ok) {
          setStatus('success');
          setMessage('Invitation accepted successfully! Redirecting to login...');
          
          // Store account info for login page
          localStorage.setItem('accountName', accountName);
          localStorage.setItem('invitedEmail', data.invitation?.invitedEmail || '');
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/login', { 
              state: { 
                accountName,
                invitedEmail: data.invitation?.invitedEmail 
              } 
            });
          }, 2000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to accept invitation');
        }
      } catch (error) {
        console.error('Error accepting invitation:', error);
        setStatus('error');
        setMessage('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    acceptInvitation();
  }, [accountName, searchParams, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '36px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px'
        }}>
          Futures
        </div>

        {/* Account Name */}
        <div style={{
          fontSize: '18px',
          color: '#4a5568',
          marginBottom: '32px',
          fontWeight: '500'
        }}>
          {accountName}.futures.com
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <div style={{
              fontSize: '16px',
              color: '#4a5568'
            }}>
              Processing your invitation...
            </div>
          </div>
        )}

        {/* Success Message */}
        {!loading && status === 'success' && (
          <div>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '40px'
            }}>
              ✓
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '12px'
            }}>
              Success!
            </div>
            <div style={{
              fontSize: '16px',
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              {message}
            </div>
          </div>
        )}

        {/* Error Message */}
        {!loading && status === 'error' && (
          <div>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '40px',
              color: 'white'
            }}>
              ✕
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '12px'
            }}>
              Oops!
            </div>
            <div style={{
              fontSize: '16px',
              color: '#4a5568',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              {message}
            </div>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Go to Login
            </button>
          </div>
        )}

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AcceptInvitation;