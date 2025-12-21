import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Search, Plus, ChevronDown, ChevronRight, Home } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getWorkspaceItems } from '../data/workspaceItems';
import WorkspaceMenu from './WorkspaceMenu';
import AddNewMenu from './AddNewMenu';
import WorkspaceDropdown from './WorkspaceDropdown';

const WorkspaceSection = ({ activeItem, setActiveItem, boards = [], onBoardClick }) => {
  const navigate = useNavigate();
  const { userCategory } = useAuth();
  
  // ✅ Button refs for positioning
  const workspaceMenuButtonRef = useRef(null);
  const addMenuButtonRef = useRef(null);
  const workspaceCardRef = useRef(null);
  
  // Menu states
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showEditSubmenu, setShowEditSubmenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showBoardSubmenu, setShowBoardSubmenu] = useState(false);
  const [showDocSubmenu, setShowDocSubmenu] = useState(false);
  const [showFormSubmenu, setShowFormSubmenu] = useState(false);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  // 🆕 CURRENT WORKSPACE - Track which main workspace is selected
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  // 🆕 GET WORKSPACE ITEMS BASED ON CATEGORY
  const category = userCategory || sessionStorage.getItem('userCategory');
  const staticWorkspaceItems = getWorkspaceItems(category);
  
  console.log('🔍 WorkspaceSection - Category:', category);
  console.log('📋 WorkspaceSection - Items:', staticWorkspaceItems);

  // 🆕 SET DEFAULT WORKSPACE ON LOAD (First item with sub-items for non-profit)
  useEffect(() => {
    if ((category === 'ngo' || category === 'nonprofit') && staticWorkspaceItems.length > 0) {
      const firstItemWithSubItems = staticWorkspaceItems.find(item => item.subItems && item.subItems.length > 0);
      if (firstItemWithSubItems) {
        setCurrentWorkspace(firstItemWithSubItems);
      }
    }
  }, [category, staticWorkspaceItems]);

  const handleBoardClick = (boardId, boardName) => {
    setActiveItem(boardName);
    if (onBoardClick) {
      onBoardClick(boardId);
    } else {
      navigate(`/boards/${boardId}`);
    }
  };

  // 🆕 WORKSPACE DROPDOWN CLICK - Change current workspace
  const handleWorkspaceChange = (item) => {
    setCurrentWorkspace(item);
    console.log('🔄 Workspace changed to:', item.label);
  };

  // 🆕 SUB-ITEM CLICK HANDLER
  const handleSubItemClick = (subItemLabel) => {
    setActiveItem(subItemLabel);
    console.log('✅ Selected sub-item:', subItemLabel);
  };

  // 🆕 GET WORKSPACE DISPLAY NAME
  const getWorkspaceName = () => {
    if (currentWorkspace) {
      return currentWorkspace.label;
    }
    return category === 'ngo' || category === 'nonprofit' ? 'Non-Profit Workspace' : 'MainWorkSpace';
  };

  // 🆕 GET WORKSPACE AVATAR COLOR
  const getWorkspaceColor = (workspaceLabel) => {
    const colorMap = {
      'Grants Management': '#067B4B',
      'Donor Management': '#FB275D',
      'monday Fundraising': '#FDAB3D',
      'Volunteer Registration Management': '#9cd326'
    };
    return colorMap[workspaceLabel] || '#666';
  };

  // 🆕 GET WORKSPACE FIRST LETTER
  const getWorkspaceInitial = (workspaceLabel) => {
    const initialMap = {
      'Grants Management': 'G',
      'Donor Management': 'D',
      'monday Fundraising': 'F',
      'Volunteer Registration Management': 'V'
    };
    return initialMap[workspaceLabel] || workspaceLabel.charAt(0).toUpperCase();
  };

  // 🆕 GET WORKSPACE ICON/LETTER FOR DROPDOWN
  const getWorkspaceIcon = () => {
    if (currentWorkspace) {
      return getWorkspaceInitial(currentWorkspace.label);
    }
    return category === 'ngo' || category === 'nonprofit' ? '❤️' : 'M';
  };

  // 🆕 GET WORKSPACE AVATAR BACKGROUND COLOR
  const getWorkspaceAvatarColor = () => {
    if (currentWorkspace) {
      return getWorkspaceColor(currentWorkspace.label);
    }
    return category === 'ngo' || category === 'nonprofit' ? '#FB275D' : '#666';
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
        <button 
          ref={workspaceCardRef}
          className="workspace-card"
          onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
        >
          <div 
            className="workspace-avatar"
            style={{ background: getWorkspaceAvatarColor() }}
          >
            <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '12px' }}>
              {getWorkspaceIcon()}
            </span>
            <div className="workspace-badge">
              <Home size={8} />
            </div>
          </div>
          <span className="workspace-name">
            {getWorkspaceName()}
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

      {/* 🆕 WORKSPACE DROPDOWN MENU */}
      <WorkspaceDropdown
        show={showWorkspaceDropdown}
        onClose={() => setShowWorkspaceDropdown(false)}
        buttonRef={workspaceCardRef}
        workspaceItems={staticWorkspaceItems.filter(item => item.subItems && item.subItems.length > 0)}
        currentWorkspace={currentWorkspace}
        onWorkspaceSelect={handleWorkspaceChange}
      />

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

      {/* 🆕 WORKSPACE ITEMS - Show sub-items of current workspace */}
      <div className="workspace-items">
        
        {/* 🆕 SHOW SUB-ITEMS IF CURRENT WORKSPACE HAS THEM */}
        {currentWorkspace && currentWorkspace.subItems && currentWorkspace.subItems.length > 0 ? (
          <>
            {currentWorkspace.subItems.map((subItem, index) => {
              // Check if subItem is an object with icon or just a string
              const subItemLabel = typeof subItem === 'object' ? subItem.label : subItem;
              const SubItemIcon = typeof subItem === 'object' && subItem.icon ? subItem.icon : null;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSubItemClick(subItemLabel)}
                  className={`workspace-item ${activeItem === subItemLabel ? 'active' : ''}`}
                >
                  {SubItemIcon ? (
                    <SubItemIcon size={16} className="item-icon" style={{ color: '#676879' }} />
                  ) : (
                    // Fallback - show simple icon placeholder
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className="item-icon"
                      style={{ color: '#676879' }}
                    >
                      <circle cx="8" cy="8" r="2" fill="currentColor" />
                    </svg>
                  )}
                  <span>{subItemLabel}</span>
                </button>
              );
            })}
          </>
        ) : (
          // 🆕 SHOW ALL MAIN ITEMS IF NO CURRENT WORKSPACE (DEFAULT VIEW)
          staticWorkspaceItems.map((item, index) => {
            const IconComponent = item.icon;
            const hasValidIcon = IconComponent && typeof IconComponent === 'function';
            
            return (
              <button
                key={index}
                onClick={() => item.subItems ? handleWorkspaceChange(item) : setActiveItem(item.label)}
                className={`workspace-item ${activeItem === item.label ? 'active' : ''}`}
              >
                {hasValidIcon ? (
                  <IconComponent size={16} className="item-icon" />
                ) : (
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="item-icon"
                    style={{ color: '#676879' }}
                  >
                    <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
                <span>{item.label}</span>
                {item.subItems && item.subItems.length > 0 && (
                  <ChevronRight size={16} className="chevron-icon" style={{ marginLeft: 'auto' }} />
                )}
              </button>
            );
          })
        )}

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