import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <>
      {/* Top Left Chevron Toggle - Exactly like Monday.com */}
      <div
        className="sidebar-chevron-toggle"
        style={{
          position: 'absolute',
          left: isCollapsed ? '10px' : '8px',
          top: '8px', // Fixed at the very top
          zIndex: 1001,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={setIsCollapsed}
          className="sidebar-chevron-btn"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            width: isCollapsed ? '36px' : '32px',
            height: isCollapsed ? '36px' : '32px',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            color: '#676879',
            padding: 0,
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = '#0073ea';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 115, 234, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#676879';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {isCollapsed ? (
            <ChevronRight size={18} strokeWidth={2.5} />
          ) : (
            <ChevronLeft size={18} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Bottom Right Toggle Button - Optional, appears on hover */}
      <div
        className="sidebar-toggle-container"
        style={{
          position: 'absolute',
          right: '-12px',
          bottom: '20px',
          zIndex: 1001,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={setIsCollapsed}
          className="sidebar-toggle-btn"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
            position: 'relative',
            zIndex: 1001,
            color: '#676879',
            padding: 0,
            outline: 'none'
          }}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </>
  );
};

export default SidebarHeader;