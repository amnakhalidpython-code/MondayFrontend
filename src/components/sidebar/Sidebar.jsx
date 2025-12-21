// src/components/sidebar/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';

import SidebarHeader from './components/SidebarHeader';
import SidebarResizeHandle from './components/SidebarResizeHandle';
import SidebarAppFeatures from './components/SidebarAppFeatures';
import SidebarCollapsed from './components/SidebarCollapsed';
import WorkspaceSection from './components/WorkspaceSection';

const Sidebar = ({ boards = [], onBoardClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [sidebarWidth, setSidebarWidth] = useState(306);

  return (
    <nav className="sidebar" style={{ width: isCollapsed ? 60 : sidebarWidth }}>
      
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sidebarWidth={sidebarWidth}
      />

      {!isCollapsed && (
        <SidebarResizeHandle setSidebarWidth={setSidebarWidth} />
      )}

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
          />
        </>
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
