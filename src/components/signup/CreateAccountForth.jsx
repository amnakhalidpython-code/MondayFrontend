import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccountForth = () => {
  const navigate = useNavigate();
  const [selectedTeamSize, setSelectedTeamSize] = useState(null);
  const [selectedCompanySize, setSelectedCompanySize] = useState(null);

  const teamSizeOptions = [
    { id: '1-1', label: 'Only me' },
    { id: '2-5', label: '2-5' },
    { id: '6-10', label: '6-10' },
    { id: '11-15', label: '11-15' },
    { id: '16-25', label: '16-25' },
    { id: '26-50', label: '26-50' },
    { id: '51-100', label: '51-100' },
    { id: '101-500', label: '101-500' }
  ];

  const companySizeOptions = [
    { id: '1-19', label: '1-19' },
    { id: '20-49', label: '20-49' },
    { id: '50-99', label: '50-99' },
    { id: '100-250', label: '100-250' },
    { id: '251-500', label: '251-500' },
    { id: '501-1500', label: '501-1500' },
    { id: '1500+', label: '1500+' }
  ];

  const handleTeamSizeSelect = (id) => {
    setSelectedTeamSize(id);
  };

  const handleCompanySizeSelect = (id) => {
    setSelectedCompanySize(id);
  };

  const handleBack = () => {
    console.log('Going back');
    // Navigate to previous step
    navigate('/three');
  };

  const handleContinue = () => {
    console.log('Selected:', { teamSize: selectedTeamSize, companySize: selectedCompanySize });
    // Navigate to next step
    navigate('/five');
  };

  const isFormValid = selectedTeamSize && selectedCompanySize;

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif',
      backgroundColor: '#ffffff'
    }}>
      {/* Left Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        overflowY: 'hidden',
        minWidth: '535px'
      }}>
        {/* Content Wrapper */}
        <div style={{
          height: '100%',
          boxSizing: 'border-box',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          justifyContent: 'center',
          padding: '88px 100px'
        }}>
          {/* Logo */}
          <div style={{ marginBottom: '40px' }}>
            <img 
              src="https://dapulse-res.cloudinary.com/image/upload/assets/work-management.png" 
              alt="monday.com logo"
              style={{ 
                height: '24px',
                display: 'block',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            maxWidth: '660px',
            minWidth: '300px',
            minHeight: 0
          }}>
            {/* Question 1: Team Size */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{
                fontSize: '24px',
                lineHeight: '30px',
                fontWeight: 500,
                color: '#323338',
                marginBottom: '16px',
                marginTop: 0,
                fontFamily: 'Poppins, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif',
                letterSpacing: '-0.1px',
                display: 'block',
                height: '30px',
                overflow: 'hidden',
                textAlign: 'start',
                WebkitFontSmoothing: 'antialiased'
              }}>
                How many people are on your team?
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px 8px',
                paddingTop: '16px',
                alignItems: 'center'
              }}>
                {teamSizeOptions.map((option) => (
                  <div key={option.id} style={{ 
                    minWidth: 'fit-content',
                    display: 'block'
                  }}>
                    <button
                      type="button"
                      onClick={() => handleTeamSizeSelect(option.id)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        color: '#323338',
                        backgroundColor: selectedTeamSize === option.id ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0)',
                        border: selectedTeamSize === option.id ? '0.8px solid rgb(0, 115, 234)' : '0.8px solid rgb(195, 198, 212)',
                        borderRadius: '32px',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '40px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 0,
                        whiteSpace: 'nowrap',
                        WebkitFontSmoothing: 'antialiased',
                        textAlign: 'center',
                        boxShadow: selectedTeamSize === option.id ? 'rgb(0, 115, 234) 0px 0px 0px 1px inset' : 'none',
                        boxSizing: 'border-box',
                        margin: 0,
                        userSelect: 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTeamSize !== option.id) {
                          e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTeamSize !== option.id) {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }
                      }}
                    >
                      <div style={{
                        display: 'block',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        height: '20px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'start',
                        WebkitFontSmoothing: 'antialiased'
                      }}>
                        {option.label}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 2: Company Size */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{
                fontSize: '24px',
                lineHeight: '30px',
                fontWeight: 500,
                color: '#323338',
                marginBottom: '16px',
                marginTop: 0,
                fontFamily: 'Poppins, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif',
                letterSpacing: '-0.1px',
                display: 'block',
                height: '30px',
                overflow: 'hidden',
                textAlign: 'start',
                WebkitFontSmoothing: 'antialiased'
              }}>
                How many people work at your company?
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px 8px',
                paddingTop: '16px',
                alignItems: 'center'
              }}>
                {companySizeOptions.map((option) => (
                  <div key={option.id} style={{ 
                    minWidth: 'fit-content',
                    display: 'block'
                  }}>
                    <button
                      type="button"
                      onClick={() => handleCompanySizeSelect(option.id)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        color: '#323338',
                        backgroundColor: selectedCompanySize === option.id ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0)',
                        border: selectedCompanySize === option.id ? '0.8px solid rgb(0, 115, 234)' : '0.8px solid rgb(195, 198, 212)',
                        borderRadius: '32px',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '40px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 0,
                        whiteSpace: 'nowrap',
                        WebkitFontSmoothing: 'antialiased',
                        textAlign: 'center',
                        boxShadow: selectedCompanySize === option.id ? 'rgb(0, 115, 234) 0px 0px 0px 1px inset' : 'none',
                        boxSizing: 'border-box',
                        margin: 0,
                        userSelect: 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCompanySize !== option.id) {
                          e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCompanySize !== option.id) {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }
                      }}
                    >
                      <div style={{
                        display: 'block',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        height: '20px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'start',
                        WebkitFontSmoothing: 'antialiased'
                      }}>
                        {option.label}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '24px 100px 88px 100px',
          display: 'block'
        }}>
          <div style={{ 
            height: '40px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <button
              type="button"
              onClick={handleBack}
              style={{
                padding: '8px 16px',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#323338',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                border: '0.8px solid rgb(195, 198, 212)',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                minWidth: 'auto',
                WebkitFontSmoothing: 'antialiased',
                boxSizing: 'border-box',
                justifyContent: 'center',
                textAlign: 'center',
                margin: 0,
                userSelect: 'none'
              }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ display: 'block' }}>
                <path d="M7.24 9.444a.77.77 0 0 0 0 1.116l4.363 4.21a.84.84 0 0 0 1.157 0 .77.77 0 0 0 0-1.116l-3.785-3.652 3.785-3.653a.77.77 0 0 0 0-1.116.84.84 0 0 0-1.157 0L7.24 9.443Z"></path>
              </svg>
              Back
            </button>
            
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isFormValid}
              tabIndex={isFormValid ? 0 : -1}
              style={{
                padding: '8px 16px',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                color: isFormValid ? '#ffffff' : 'rgba(50, 51, 56, 0.38)',
                backgroundColor: isFormValid ? '#0073ea' : '#ecedf5',
                border: 'none',
                borderRadius: '4px',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                height: '40px',
                transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                minWidth: 0,
                pointerEvents: isFormValid ? 'auto' : 'none',
                WebkitFontSmoothing: 'antialiased',
                boxSizing: 'border-box',
                justifyContent: 'center',
                textAlign: 'center',
                margin: 0,
                userSelect: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              Continue
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ display: 'block' }}>
                <path d="M12.76 10.56a.77.77 0 0 0 0-1.116L8.397 5.233a.84.84 0 0 0-1.157 0 .77.77 0 0 0 0 1.116l3.785 3.653-3.785 3.652a.77.77 0 0 0 0 1.117.84.84 0 0 0 1.157 0l4.363-4.211Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(97, 97, 255)',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img
            src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/how-many-people-work-at-your-company.png"
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
  );
};

export default CreateAccountForth;
