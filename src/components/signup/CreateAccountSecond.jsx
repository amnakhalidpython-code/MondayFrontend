import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateAccountSecond = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [fullNameError, setFullNameError] = useState(false);

const handleContinue = async () => {
  if (!fullName.trim()) {
    setFullNameError(true);
    return;
  }

  try {
    const res = await fetch("https://monday-clone-backend.vercel.app/api/account/save-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, accountName })
    });

    const data = await res.json();
    console.log("Saved:", data);

    // NEXT PAGE REDIRECT
    navigate("/three");

  } catch (error) {
    console.log("Error:", error);
  }
};


  const handleBack = () => {
    console.log('Back clicked');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
      fontWeight: 400
    }}>
      {/* Left Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '768px',
        minWidth: '535px',
        overflowY: 'hidden'
      }}>
        {/* Content Wrapper */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '88px 100px',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          {/* Logo */}
          <div style={{
            display: 'block',
            marginBottom: '48px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <img 
                src="https://dapulse-res.cloudinary.com/image/upload/assets/work-management.png" 
                alt="monday.com logo"
                style={{
                  height: '24px'
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'Poppins, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '30px',
            letterSpacing: '-0.1px',
            color: '#323338',
            textAlign: 'start',
            margin: '0 0 16px 0',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Create your account
          </h2>

          {/* Content */}
          <div style={{
            flexBasis: '0%',
            flexGrow: 1,
            flexShrink: 1,
            maxWidth: '660px',
            minWidth: '300px'
          }}>
            {/* Full Name Field */}
            <div style={{ marginBottom: '24px' }}>
              <label 
                htmlFor="fullname"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#323338',
                  marginBottom: '8px'
                }}
              >
                Full name
              </label>
              <div style={{
                position: 'relative'
              }}>
                <input
                  type="text"
                  id="fullname"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (e.target.value.trim()) {
                      setFullNameError(false);
                    }
                  }}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '8px 16px',
                    border: fullNameError ? '1px solid #d83a52' : '0.8px solid #c3c6d4',
                    borderRadius: '4px',
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#323338',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.1s ease-in',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => !fullNameError && (e.target.style.borderColor = '#0073ea')}
                  onBlur={(e) => !fullNameError && (e.target.style.borderColor = '#c3c6d4')}
                />
              </div>
              {fullNameError && (
                <div style={{
                  fontSize: '14px',
                  color: '#d83a52',
                  marginTop: '4px'
                }}>
                  Enter your full name
                </div>
              )}
            </div>

            {/* Account Name Field */}
            <div>
              <label 
                htmlFor="accountname"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#323338',
                  marginBottom: '8px'
                }}
              >
                Account name
              </label>
              <div style={{
                position: 'relative'
              }}>
                <input
                  type="text"
                  id="accountname"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="For example, company's or department's name"
                  autoComplete="off"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '8px 16px',
                    border: '0.8px solid #c3c6d4',
                    borderRadius: '4px',
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#323338',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.1s ease-in',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0073ea'}
                  onBlur={(e) => e.target.style.borderColor = '#c3c6d4'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px 100px 88px',
          display: 'block'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Back Button */}
            <Link to='/one'>
            <button
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                border: '0.8px solid #c3c6d4',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#323338',
                cursor: 'pointer',
                transition: 'transform 0.07s ease',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                outline: 'none',
                visibility: 'visible'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f6f7fb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)'}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ marginRight: '4px' }}>
                <path d="M7.24 9.444a.77.77 0 0 0 0 1.116l4.363 4.21a.84.84 0 0 0 1.157 0 .77.77 0 0 0 0-1.116l-3.785-3.652 3.785-3.653a.77.77 0 0 0 0-1.116.84.84 0 0 0-1.157 0L7.24 9.443Z"></path>
              </svg>
              Back
            </button>
            </Link>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!fullName.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                padding: '8px 16px',
                backgroundColor: fullName.trim() ? '#0073ea' : 'rgba(0, 115, 234, 0.38)',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#ffffff',
                cursor: fullName.trim() ? 'pointer' : 'not-allowed',
                transition: 'transform 0.07s ease',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                outline: 'none',
                opacity: fullName.trim() ? 1 : 0.6
              }}
              onMouseEnter={(e) => fullName.trim() && (e.currentTarget.style.backgroundColor = '#0060b9')}
              onMouseLeave={(e) => fullName.trim() && (e.currentTarget.style.backgroundColor = '#0073ea')}
            >
              Continue
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ marginLeft: '4px' }}>
                <path fillRule="evenodd" d="M12.76 10.56a.77.77 0 0 0 0-1.116L8.397 5.233a.84.84 0 0 0-1.157 0 .77.77 0 0 0 0 1.116l3.785 3.653-3.785 3.652a.77.77 0 0 0 0 1.117.84.84 0 0 0 1.157 0l4.363-4.211Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        flexBasis: '0%',
        flexGrow: 1,
        flexShrink: 1,
        overflowX: 'hidden',
        overflowY: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          height: '100vh'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgb(97, 97, 255)',
            overflowX: 'hidden',
            overflowY: 'hidden',
            width: '100%'
          }}>
            <img 
              src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/set-up-your-account.png" 
              alt=""
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

export default CreateAccountSecond;