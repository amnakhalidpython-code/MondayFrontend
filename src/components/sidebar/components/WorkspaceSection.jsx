import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Search, Plus, ChevronRight, Home } from 'lucide-react';
import WorkspaceMenu from './WorkspaceMenu';
import AddNewMenu from './AddNewMenu';

const WorkspaceSection = ({ activeItem, setActiveItem, boards = [], onBoardClick }) => {
  const navigate = useNavigate();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showEditSubmenu, setShowEditSubmenu] = useState(false);

  // ➕ ADD MENU STATES
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
          <span className="workspace-name">Main workspace</span>
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
        {/* ✅ Dynamic Boards from Database */}
        {boards.length === 0 ? (
          <div className="workspace-item" style={{ opacity: 0.6, cursor: 'default', fontSize: '13px', color: '#676879' }}>
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
                style={{ flexShrink: 0 }}
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v10h10V5H5z"/>
                <path d="M7 7h2v6H7V7zm4 0h2v6h-2V7z"/>
              </svg>
              <span>{board.name}</span>
              {board.items?.length > 0 && (
                <span className="item-count" style={{ 
                  marginLeft: 'auto', 
                  fontSize: '11px', 
                  color: '#676879',
                  backgroundColor: 'rgba(0,0,0,0.06)',
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}>
                  {board.items.length}
                </span>
              )}
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
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <span>Dashboard and reporting</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default WorkspaceSection;