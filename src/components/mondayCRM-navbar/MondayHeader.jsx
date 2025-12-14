import React from 'react';

export default function MondayHeader() {
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
        {/* Animation Container */}
        <div className="overflow-hidden h-[75px] block relative mr-3" style={{ width: '120px', minWidth: '120px' }}>
          {/* Gift Icon */}
          <div className="flex items-center justify-center h-full">
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Gift Box Base */}
              <rect x="15" y="25" width="30" height="25" fill="rgb(97,97,255)" rx="2" />
              
              {/* Ribbon Vertical */}
              <rect x="27" y="15" width="6" height="35" fill="rgb(255,204,0)" />
              
              {/* Ribbon Horizontal */}
              <rect x="10" y="32" width="40" height="6" fill="rgb(255,204,0)" />
              
              {/* Bow Left */}
              <circle cx="22" cy="17" r="5" fill="rgb(255,204,0)" />
              {/* Bow Right */}
              <circle cx="38" cy="17" r="5" fill="rgb(255,204,0)" />
              {/* Bow Center */}
              <circle cx="30" cy="17" r="4" fill="rgb(255,204,0)" />
              
              {/* Confetti */}
              <circle cx="12" cy="15" r="2" fill="rgb(203,221,255)" opacity="0.8">
                <animate attributeName="cy" values="15;12;15" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="48" cy="18" r="2" fill="rgb(97,97,255)" opacity="0.6">
                <animate attributeName="cy" values="18;15;18" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center flex-grow mr-3">
          {/* Welcome Message */}
          <div 
            className="text-base font-normal mb-0.5"
            style={{ 
              color: 'rgb(50, 51, 56)',
              lineHeight: '22.5px'
            }}
          >
            Good night, Staff!
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
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mr-2 flex items-center gap-1"
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
          className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors flex items-center gap-2"
          style={{ 
            backgroundColor: 'rgb(0, 134, 192)',
            border: 'none'
          }}
        >
          <span className="text-lg">⚡</span>
          Quick Search
        </button>
      </div>
    </div>
  );
}