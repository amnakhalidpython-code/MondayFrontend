import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Search, Plus, ChevronDown, Home } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext'; // 🆕 IMPORT
import { getWorkspaceItems } from '../data/workspaceItems'; // 🆕 IMPORT
import WorkspaceMenu from './WorkspaceMenu';
import AddNewMenu from './AddNewMenu';

const WorkspaceSection = ({ activeItem, setActiveItem, boards = [], onBoardClick }) => {
  const navigate = useNavigate();
  const { userCategory } = useAuth(); // 🆕 GET CATEGORY
  
  // ✅ Button refs for positioning
  const workspaceMenuButtonRef = useRef(null);
  const addMenuButtonRef = useRef(null);
  
  // Menu states
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showEditSubmenu, setShowEditSubmenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showBoardSubmenu, setShowBoardSubmenu] = useState(false);
  const [showDocSubmenu, setShowDocSubmenu] = useState(false);
  const [showFormSubmenu, setShowFormSubmenu] = useState(false);

  // 🆕 GET WORKSPACE ITEMS BASED ON CATEGORY
  const category = userCategory || sessionStorage.getItem('userCategory');
  const staticWorkspaceItems = getWorkspaceItems(category);
  
  console.log('🔍 WorkspaceSection - Category:', category);
  console.log('📋 WorkspaceSection - Items:', staticWorkspaceItems);

  const handleBoardClick = (boardId, boardName) => {
    setActiveItem(boardName);
    if (onBoardClick) {
      onBoardClick(boardId);
    } else {
      navigate(`/boards/${boardId}`);
    }
  };

  // 🆕 STATIC ITEM CLICK HANDLER
  const handleStaticItemClick = (itemLabel) => {
    setActiveItem(itemLabel);
    console.log('Clicked:', itemLabel);
  };

  return (
    <div className="workspace-section">

      {/* HEADER */}
      <div className="workspace-header">
        <span className="section-title">Workspaces</span>

        <div className="header-actions">
          <button
            ref={workspaceMenuButtonRef}
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
        onClose={() => {
          setShowWorkspaceMenu(false);
          setShowEditSubmenu(false);
        }}
        buttonRef={workspaceMenuButtonRef}
        showEditSubmenu={showEditSubmenu}
        setShowEditSubmenu={setShowEditSubmenu}
      />

      {/* CURRENT WORKSPACE DROPDOWN */}
      <div className="workspace-selector-row">
        <button className="workspace-card">
          <div className="workspace-avatar">
            {category === 'ngo' || category === 'nonprofit' ? '❤️' : 'M'}
            <div className="workspace-badge">
              <Home size={8} />
            </div>
          </div>
          <span className="workspace-name">
            {category === 'ngo' || category === 'nonprofit' ? 'Non-Profit Workspace' : 'MainWorkSpace'}
          </span>
          <ChevronDown size={18} className="workspace-chevron" />
        </button>

        <button
          ref={addMenuButtonRef}
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
        onClose={() => {
          setShowAddMenu(false);
          setShowBoardSubmenu(false);
          setShowDocSubmenu(false);
          setShowFormSubmenu(false);
        }}
        buttonRef={addMenuButtonRef}
        showBoardSubmenu={showBoardSubmenu}
        setShowBoardSubmenu={setShowBoardSubmenu}
        showDocSubmenu={showDocSubmenu}
        setShowDocSubmenu={setShowDocSubmenu}
        showFormSubmenu={showFormSubmenu}
        setShowFormSubmenu={setShowFormSubmenu}
      />

      {/* 🆕 WORKSPACE ITEMS */}
      <div className="workspace-items">
        {/* 🆕 STATIC ITEMS (CATEGORY-BASED) */}
        {staticWorkspaceItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleStaticItemClick(item.label)}
              className={`workspace-item ${activeItem === item.label ? 'active' : ''}`}
            >
              <IconComponent size={16} className="item-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* 🆕 DIVIDER - Only if there are dynamic boards */}
        {boards.length > 0 && (
          <div style={{ 
            height: '1px', 
            backgroundColor: '#e6e9ef', 
            margin: '8px 12px' 
          }} />
        )}

        {/* DYNAMIC BOARDS FROM BACKEND */}
        {boards.length === 0 ? (
          <div 
            className="workspace-item" 
            style={{ 
              opacity: 0.5, 
              cursor: 'default', 
              fontSize: '13px', 
              color: '#9699a6',
              fontStyle: 'italic',
              justifyContent: 'center'
            }}
          >
            <span>No custom boards yet</span>
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
                className="item-icon"
              >
                <path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"/>
              </svg>
              <span>{board.name}</span>
            </button>
          ))
        )}
      </div>

    </div>
  );
};

export default WorkspaceSection;