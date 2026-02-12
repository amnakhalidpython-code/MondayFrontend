import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import SidebarHeader from './components/SidebarHeader';
import SidebarAppFeatures from './components/SidebarAppFeatures';
import SidebarCollapsed from './components/SidebarCollapsed';
import WorkspaceSection from './components/WorkspaceSection';

const Sidebar = ({ boards = [], onBoardClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 600;
  const COLLAPSED_WIDTH = 60;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      e.preventDefault();
      const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing]);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <nav
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isHoveringSidebar ? 'hovering' : ''}`}
      style={{
        width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth,
        transition: isResizing ? 'none' : 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        height: '100vh',
        flexShrink: 0,
        userSelect: isResizing ? 'none' : 'auto',
      }}
      onMouseEnter={() => setIsHoveringSidebar(true)}
      onMouseLeave={() => setIsHoveringSidebar(false)}
    >
      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className="sidebar-resize-handle"
          onMouseDown={startResizing}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '6px',
            height: 'calc(100% - 70px)',
            cursor: 'ew-resize',
            zIndex: 999,
            background: 'transparent',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 115, 234, 0.1)';
          }}
          onMouseLeave={(e) => {
            if (!isResizing) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '40px',
            // background: isResizing ? '#0073ea' : 'rgba(0, 115, 234, 0.3)',
            borderRadius: '1px',
            opacity: isResizing ? 1 : 0.3,
            transition: 'opacity 0.2s ease, background 0.2s ease',
          }} />
        </div>
      )}

      {/* Toggle Buttons (Left Edge + Bottom Right) */}
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={handleToggleCollapse}
        isHoveringSidebar={isHoveringSidebar}
      />

      {/* Main Content */}
      <div
        className="sidebar-content"
        style={{
          paddingTop: '0px', // No padding - content flows from top
        }}
      >
        {!isCollapsed ? (
          <>
            <SidebarAppFeatures
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />

            <WorkspaceSection
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              boards={boards}
              onBoardClick={onBoardClick}
              sidebarWidth={sidebarWidth}
            />
          </>
        ) : (
            // Inside Sidebar component
            <SidebarCollapsed
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              onToggleCollapse={handleToggleCollapse}   // ← added
            />
        )}
      </div>

      {/* Resizing overlay indicator */}
      {isResizing && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '8px',
          transform: 'translateY(-50%)',
          background: '#0073ea',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 600,
          zIndex: 1002,
          pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0, 115, 234, 0.3)',
        }}>
          {Math.round(sidebarWidth)}px
        </div>
      )}
    </nav>
  );
};

export default Sidebar;