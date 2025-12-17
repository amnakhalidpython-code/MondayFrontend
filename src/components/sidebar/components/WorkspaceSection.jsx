import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Search, Plus, ChevronDown, Home } from 'lucide-react';
import WorkspaceMenu from './WorkspaceMenu';
import AddNewMenu from './AddNewMenu';

const WorkspaceSection = ({ activeItem, setActiveItem, boards = [], onBoardClick }) => {
  const navigate = useNavigate();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showEditSubmenu, setShowEditSubmenu] = useState(false);

  // Add Menu States
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showBoardSubmenu, setShowBoardSubmenu] = useState(false);
  const [showDocSubmenu, setShowDocSubmenu] = useState(false);

  const handleBoardClick = (boardId, boardName) => {
    setActiveItem(boardName);
    if (onBoardClick) {
      onBoardClick(boardId);
    } else {
      navigate(`/boards/${boardId}`);
    }
  };

  return (
    <div className="workspace-section">

      {/* HEADER */}
      <div className="workspace-header">
        <span className="section-title">Workspaces</span>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            aria-label="Workspace menu"
          >
            <MoreVertical size={16} />
          </button>

          <button 
            className="icon-btn"
            aria-label="Search"
          >
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

      {/* CURRENT WORKSPACE DROPDOWN */}
      <div className="workspace-selector-row">
        <button className="workspace-card">
          <div className="workspace-avatar">
            M
            <div className="workspace-badge">
              <Home size={8} />
            </div>
          </div>
          <span className="workspace-name">Main workspace</span>
          <ChevronDown size={18} className="workspace-chevron" />
        </button>

        {/* ADD BUTTON */}
        <button
          className="add-btn"
          onClick={() => setShowAddMenu(!showAddMenu)}
          aria-label="Add new item"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* ADD NEW MENU */}
      <AddNewMenu
        show={showAddMenu}
        showBoardSubmenu={showBoardSubmenu}
        setShowBoardSubmenu={setShowBoardSubmenu}
        showDocSubmenu={showDocSubmenu}
        setShowDocSubmenu={setShowDocSubmenu}
      />

      {/* WORKSPACE ITEMS */}
      <div className="workspace-items">
        {/* Dynamic Boards from Database */}
        {boards.length === 0 ? (
          <div 
            className="workspace-item" 
            style={{ 
              opacity: 0.6, 
              cursor: 'default', 
              fontSize: '13px', 
              color: '#9699a6',
              fontStyle: 'italic' 
            }}
          >
            <span>No boards yet</span>
          </div>
        ) : (
          boards.map((board) => (
            <button
              key={board._id}
              onClick={() => handleBoardClick(board._id, board.name)}
              className={`workspace-item ${
                activeItem === board.name ? 'active' : ''
              }`}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"/>
              </svg>
              <span>{board.name}</span>
             
            </button>
          ))
        )}

        {/* Dashboard and reporting - Show only if boards exist */}
        {boards.length > 0 && (
          <button
            onClick={() => setActiveItem('Dashboard and reporting')}
            className={`workspace-item ${
              activeItem === 'Dashboard and reporting' ? 'active' : ''
            }`}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M4 3.5H16C16.2761 3.5 16.5 3.72386 16.5 4V16C16.5 16.2761 16.2761 16.5 16 16.5H4C3.72386 16.5 3.5 16.2761 3.5 16V4C3.5 3.72386 3.72386 3.5 4 3.5ZM2 4C2 2.89543 2.89543 2 4 2H16C17.1046 2 18 2.89543 18 4V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V4ZM5.5 14.25C5.5 14.6642 5.83579 15 6.25 15C6.66421 15 7 14.6642 7 14.25V10.75C7 10.3358 6.66421 10 6.25 10C5.83579 10 5.5 10.3358 5.5 10.75L5.5 14.25ZM10.25 15C9.83579 15 9.5 14.6642 9.5 14.25L9.5 7.75C9.5 7.33579 9.83579 7 10.25 7C10.6642 7 11 7.33579 11 7.75V14.25C11 14.6642 10.6642 15 10.25 15ZM13.5 14.25C13.5 14.6642 13.8358 15 14.25 15C14.6642 15 15 14.6642 15 14.25V5.75C15 5.33579 14.6642 5 14.25 5C13.8358 5 13.5 5.33579 13.5 5.75V14.25Z"/>
            </svg>
            <span>Dashboard and reporting</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default WorkspaceSection;