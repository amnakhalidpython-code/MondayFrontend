import React, { useState } from 'react';
import './Sidebar.css';
import SidebarHeader from './components/SidebarHeader';
import SidebarAppFeatures from './components/SidebarAppFeatures';
import SidebarCollapsed from './components/SidebarCollapsed';
import WorkspaceSection from './components/WorkspaceSection';

const Sidebar = ({ boards = [], onBoardClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const SIDEBAR_WIDTH = 300;

  return (
    <nav
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        width: isCollapsed ? 60 : SIDEBAR_WIDTH,
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        height: '100vh',
        borderRight: '1px solid #e6e9ef',
        backgroundColor: '#fff',
        flexShrink: 0
      }}
    >
      {/* The Toggle Button (Monday Style) */}
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {!isCollapsed ? (
        <div style={{ width: SIDEBAR_WIDTH, overflow: 'hidden', height: '100%' }}>
          <SidebarAppFeatures
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />

          <WorkspaceSection
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            boards={boards}
            onBoardClick={onBoardClick}
          />
        </div>
      ) : (
        <SidebarCollapsed
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
    </nav>
  );
};

export default Sidebar;