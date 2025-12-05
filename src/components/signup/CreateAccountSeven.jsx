import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccountSeven = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { id: 'news', label: 'News publications' },
    { id: 'tv', label: 'TV / Streaming' },
    { id: 'search_engine', label: 'Online search engines (e.g. Google, Bing, etc.)' },
    { id: 'social_media', label: 'Facebook / Instagram' },

    { id: 'ai_chatbots', label: 'AI Chatbots (e.g. ChatGPT, Claude, etc.)' },
    { id: 'email', label: 'Email' },
    { id: 'linkedin', label: 'Linkedin' },
    { id: 'billboard', label: 'Outdoors ad (billboards / transport / airport)' },
    { id: 'consultant', label: 'Consultant' },
    { id: 'software_review_sites', label: 'Software Review Site' },
    { id: 'podcast', label: 'Podcast' },
    { id: 'audio_ad', label: 'Audio streaming services' },
    { id: 'friend', label: 'Friend' },
    { id: 'events', label: 'Events/conferences' },
    { id: 'youtube_ad', label: 'YouTube' },
    { id: 'other', label: 'Other' }
  ];

  const handleCheckboxChange = (id) => {
    setSelectedOptions(prev => {
      if (prev.includes(id)) {
        return prev.filter(optionId => optionId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleBack = () => {
    console.log('Back clicked');
    // Navigate to previous step
    navigate('/six');
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      console.log('Selected options:', selectedOptions);
    }
  };

  const isFormValid = selectedOptions.length > 0;

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
            {/* Title */}
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
              height: '60px',
              overflow: 'hidden',
              textAlign: 'start',
              WebkitFontSmoothing: 'antialiased'
            }}>
              One last question, how did you hear about us?
            </h2>

            {/* Checkboxes Grid */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '16px',
              alignItems: 'flex-start'
            }}>
              {options.map((option) => {
                const isChecked = selectedOptions.includes(option.id);
                
                return (
                  <div key={option.id} style={{ 
                    minWidth: 'fit-content',
                    display: 'block'
                  }}>
                    <label style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #d0d4e4',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      minHeight: '40px',
                      columnGap: '8px',
                      position: 'relative',
                      userSelect: 'none',
                      transition: 'background-color 0.15s ease',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 400,
                      color: '#323338'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f6f8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(option.id)}
                        style={{
                          position: 'absolute',
                          opacity: 0,
                          width: 0,
                          height: 0,
                          margin: 0,
                          padding: 0
                        }}
                      />
                      
                      {/* Custom Checkbox */}
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: isChecked ? '#0073ea' : '#ffffff',
                        border: isChecked ? '1px solid #0073ea' : '1px solid #c3c6d4',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.1s ease'
                      }}>
                        {isChecked && (
                          <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" style={{ 
                            color: '#ffffff',
                            display: 'block'
                          }}>
                            <path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" 
                            fill="currentColor" 
                            fillRule="evenodd" 
                            clipRule="evenodd"/>
                          </svg>
                        )}
                      </div>

                      {/* Label Text */}
                      <span style={{
                        WebkitFontSmoothing: 'antialiased',
                        whiteSpace: 'nowrap'
                      }}>
                        {option.label}
                      </span>
                    </label>
                  </div>
                );
              })}
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
                transition: 'transform 0.07s ease',
                outline: 'none',
                minWidth: 'auto',
                WebkitFontSmoothing: 'antialiased'
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
                transition: 'transform 0.07s ease',
                outline: 'none',
                minWidth: 0,
                pointerEvents: isFormValid ? 'auto' : 'none',
                WebkitFontSmoothing: 'antialiased',
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
          backgroundColor: 'rgb(255, 204, 25)',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img
            src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/how-did-you-hear-about-us-with-invite.png"
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

export default CreateAccountSeven;