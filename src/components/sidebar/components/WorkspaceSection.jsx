import React, { useState } from 'react';
import { MoreVertical, Search, Plus, ChevronRight, Home } from 'lucide-react';
import { workspaceItems } from '../data/workspaceItems';
import WorkspaceMenu from './WorkspaceMenu';
import AddNewMenu from './AddNewMenu';

const WorkspaceSection = ({ activeItem, setActiveItem }) => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showEditSubmenu, setShowEditSubmenu] = useState(false);

  // ➕ ADD MENU STATES
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showBoardSubmenu, setShowBoardSubmenu] = useState(false);
  const [showDocSubmenu, setShowDocSubmenu] = useState(false);

  return (
    <div className="workspace-section">

      {/* HEADER */}
      <div className="workspace-header">
        <span className="section-title">WORKSPACES</span>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
          >
            <MoreVertical size={16} />
          </button>

          <button className="icon-btn">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* WORKSPACE 3-DOTS MENU */}
      <WorkspaceMenu
        show={showWorkspaceMenu}
        setShow={setShowWorkspaceMenu}
        showEditSubmenu={showEditSubmenu}
        setShowEditSubmenu={setShowEditSubmenu}
      />

      {/* CURRENT WORKSPACE */}
      <div className="workspace-selector-row">
        <button className="workspace-card">
          <div className="workspace-avatar">
            G
            <div className="workspace-badge">
              <Home size={8} />
            </div>
          </div>
          <span className="workspace-name">Grants Management</span>
          <ChevronRight size={18} className="workspace-chevron" />
        </button>

        {/* ➕ BUTTON */}
        <button
          className="add-btn"
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* ➕ ADD NEW MENU */}
      <AddNewMenu
        show={showAddMenu}
        showBoardSubmenu={showBoardSubmenu}
        setShowBoardSubmenu={setShowBoardSubmenu}
        showDocSubmenu={showDocSubmenu}
        setShowDocSubmenu={setShowDocSubmenu}
      />

      {/* WORKSPACE ITEMS */}
      <div className="workspace-items">
        {workspaceItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveItem(item.label)}
            className={`workspace-item ${
              activeItem === item.label ? 'active' : ''
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default WorkspaceSection;
