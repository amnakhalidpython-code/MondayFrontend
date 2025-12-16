import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function MondayHeader() {
  const [userName, setUserName] = useState('User');
  const [greeting, setGreeting] = useState('Good day');

  useEffect(() => {
    // Get user name
    const storedEmail = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail');
    let storedName = sessionStorage.getItem('userName') || localStorage.getItem('userName');
    
    // Check if userName is JSON object
    if (storedName && storedName.startsWith('{')) {
      try {
        const nameObj = JSON.parse(storedName);
        storedName = nameObj.fullName || nameObj.firstName || nameObj.lastName || null;
      } catch (e) {
        console.error('Error parsing userName:', e);
      }
    }
    
    const name = storedName || storedEmail?.split('@')[0] || 'User';
    setUserName(name);

    // Set greeting based on time
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
    <div className="w-full">
      {/* Header Container */}
      <div 
        className="flex items-center bg-white shadow-sm px-6 h-[75px] w-full"
        style={{ 
          boxShadow: 'rgb(230, 233, 239) 0px 3px 12px 0px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Icon */}
        <div className="overflow-hidden h-[75px] flex items-center justify-center mr-4" style={{ width: '60px', minWidth: '60px' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center flex-grow mr-3">
          {/* Welcome Message */}
          <div 
            className="text-base font-semibold mb-0.5"
            style={{ 
              color: 'rgb(50, 51, 56)',
              lineHeight: '22.5px'
            }}
          >
            {greeting}, {userName}!
          </div>
          
          {/* Subtitle */}
          <div 
            className="text-sm"
            style={{ 
              color: 'rgb(50, 51, 56)',
              lineHeight: '22.5px',
              opacity: 0.7
            }}
          >
            Quickly access your recent boards, Inbox and workspaces
          </div>
        </div>

        {/* Give Feedback Link */}
        <button 
          className="px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors mr-2 flex items-center gap-2"
          style={{ 
            color: 'rgb(50, 51, 56)',
            opacity: 0.8
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 10.5a.75.75 0 110-1.5.75.75 0 010 1.5zm.75-3.5a.75.75 0 01-1.5 0V5a.75.75 0 011.5 0v3z"/>
          </svg>
          Give feedback
        </button>

        {/* Quick Search Button */}
        <button 
          className="px-4 py-2 rounded-md text-sm font-medium text-white hover:opacity-90 transition-all flex items-center gap-2"
          style={{ 
            backgroundColor: 'rgb(0, 115, 234)',
            border: 'none'
          }}
        >
          <span className="text-lg">⚡</span>
          Quick search
        </button>
      </div>
    </div>
  );
}