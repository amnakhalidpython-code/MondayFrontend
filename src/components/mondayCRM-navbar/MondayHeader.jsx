import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../animation/Winter Train.json';
import { LuMessageCircleHeart } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";



export default function MondayHeader() {
  const [userName, setUserName] = useState('Staff');
  const [greeting, setGreeting] = useState('Good evening');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail');
    let storedName = sessionStorage.getItem('userName') || localStorage.getItem('userName');
    
    if (storedName && storedName.startsWith('{')) {
      try {
        const nameObj = JSON.parse(storedName);
        storedName = nameObj.fullName || nameObj.firstName || nameObj.lastName || null;
      } catch (e) {
        console.error('Error parsing userName:', e);
      }
    }
    
    const name = storedName || storedEmail?.split('@')[0] || 'Staff';
    setUserName(name);

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div 
        style={{
          display: 'flex',
          height: '75px',
          width: '100%',
            backgroundColor:"#ffffff",
          boxShadow: '0px 3px 12px rgba(230, 233, 239, 1)',
          paddingLeft: '20px',
          paddingRight: '20px',
          boxSizing: 'border-box',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          // borderRadius: '10px'
        }}
      >
        {/* Left side - Text Container */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '75px',
            justifyContent: 'center',
            marginRight: '12px',
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '22.5px',
            color: 'rgb(50, 51, 56)',
            boxSizing: 'border-box',
            zIndex: 10,
            position: 'relative',
          }}
        >
          <div 
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '400',
              height: '21px',
              lineHeight: '21px',
              margin: '0',
              padding: '0',
              color: 'rgb(50, 51, 56)',
              boxSizing: 'border-box'
            }}
          >
            {greeting}, {userName}!
          </div>
          
          <div 
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              // height: '44px',
              letterSpacing: 'normal',
              lineHeight: '22px',
              margin: '0',
              padding: '0',
              color: 'rgb(50, 51, 56)',
              boxSizing: 'border-box'
            }}
          >
            Quickly access your recent boards, Inbox and workspaces
          </div>
        </div>

        {/* Center - Lottie Animation Container */}
        <div 
          style={{
            position: 'absolute',
            left: '63%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            width: '600px',
            height: '150px'
          }}
        >
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{
              width: '140%',
              height: '100%'
            }}
          />
        </div>

        {/* Right side - Buttons Container */}
        <div 
          style={{
            display: 'block',
            height: '75px',
            width: '283.663px',
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '22.5px',
            color: 'rgb(50, 51, 56)',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
            zIndex: 10,
            position: 'relative'
          }}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              float: 'right',
              height: '75px',
              width: '283.663px',
              fontSize: '15px',
              fontWeight: '400',
              lineHeight: '22.5px',
              color: 'rgb(50, 51, 56)',
              margin: '0',
              padding: '0',
              boxSizing: 'border-box'
            }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '45px',
                cursor: 'pointer',
                marginLeft: '20px',
                marginRight: '10px',
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '22.5px',
                color: 'rgb(50, 51, 56)',
                padding: '0',
                boxSizing: 'border-box'
              }}
            >
              <span 
                style={{
                  display: 'block',
                  height: '22.5px',
                  width: '15px',
                  marginRight: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '22.5px',
                  color: 'rgb(50, 51, 56)',
                  cursor: 'pointer',
                  padding: '0',
                  boxSizing: 'border-box'
                }}
              >
              <LuMessageCircleHeart size={20} />

              </span>
              Give feedback
            </div>

            <button 
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                appearance: 'button',
                backgroundColor: 'rgb(0, 127, 155)',
                borderRadius: '4px',
                border: 'none',
                color: 'rgb(255, 255, 255)',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '400',
                height: '40px',
                width: '143.887px',
                letterSpacing: 'normal',
                lineHeight: '22px',
                marginLeft: '10px',
                minWidth: 'auto',
                outline: 'none',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                textAlign: 'center',
                textTransform: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                WebkitFontSmoothing: 'antialiased',
                boxSizing: 'border-box',
                transition: 'transform 0.07s ease, min-width 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <i 
                style={{
                  display: 'block',
                  width: '11.6875px',
                  marginRight: '5px',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: 'rgb(255, 255, 255)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
               <AiOutlineThunderbolt size={20} />

              </i>
              Quick Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}