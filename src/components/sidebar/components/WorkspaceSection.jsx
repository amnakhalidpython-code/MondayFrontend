import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoreVertical, Search, Plus, ChevronDown, Home, BarChart2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getWorkspaceItems } from '../data/workspaceItems';
import WorkspaceMenu from './WorkspaceMenu';
import AddNewMenu from './AddNewMenu';
import WorkspaceDropdown from './WorkspaceDropdown';

const WorkspaceSection = ({ activeItem, setActiveItem, boards = [], onBoardClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userCategory } = useAuth();

  const workspaceMenuButtonRef = useRef(null);
  const addMenuButtonRef = useRef(null);
  const workspaceCardRef = useRef(null);

  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showEditSubmenu, setShowEditSubmenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showBoardSubmenu, setShowBoardSubmenu] = useState(false);
  const [showDocSubmenu, setShowDocSubmenu] = useState(false);
  const [showFormSubmenu, setShowFormSubmenu] = useState(false);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [openBoardMenuId, setOpenBoardMenuId] = useState(null);

  const projectBoards = boards.filter(b => b.type === 'board' || !b.type);
  const analyticsDashboards = boards.filter(b => b.type === 'dashboard');

  const category = userCategory || sessionStorage.getItem('userCategory');
  const staticWorkspaceItems = getWorkspaceItems(category);

  // Mappings
  const templateToWorkspace = { 'grants-pipeline': 'grants-management', 'getting-started': 'grants-management', 'grant-providers': 'grants-management', 'grants-dashboard': 'grants-management', 'donors': 'donor-management', 'donors-dashboard': 'donor-management', 'project-management': 'project-management', 'volunteer-registration': 'volunteer' };
  const subItemRouting = { 'Grants Pipeline': { type: 'template', route: 'grants-pipeline' }, 'Getting Started': { type: 'docs', route: null }, 'Grant Providers': { type: 'disabled', route: null }, 'Grants Dashboard': { type: 'dashboard', route: '/dashboards/overview' }, 'Donors': { type: 'template', route: 'donors' }, 'Donor Donations': { type: 'disabled', route: null }, 'Donor Activities': { type: 'disabled', route: null }, 'Donors Dashboard': { type: 'dashboard', route: '/dashboards/donor-dashboard' }, 'Project Management': { type: 'template', route: 'project-management' }, 'Learning Center': { type: 'docs', route: null }, 'Volunteer registration management': { type: 'template', route: 'volunteer-registration' }, 'Volunteer Learning Center': { type: 'docs', route: null } };
  const workspaceToGettingStarted = { 'grants-management': '/docs/grants-getting-started', 'donor-management': '/docs/donor-getting-started', 'fundraising': '/docs/fundraising-getting-started', 'project-management': '/docs/project-management-learning-center', 'volunteer': '/docs/volunteer-getting-started' };

  useEffect(() => {
    if ((category === 'ngo' || category === 'nonprofit') && staticWorkspaceItems.length > 0) {
      const pathParts = location.pathname.split('/');
      if (pathParts[1] === 'workspaces' && pathParts[3]) {
        const workspaceId = pathParts[3];
        const workspace = staticWorkspaceItems.find(item => item.id === workspaceId);
        if (workspace) setCurrentWorkspace(workspace);
      } else if (pathParts[1] === 'boards' && pathParts[2] === 'template' && pathParts[3]) {
        const workspaceId = templateToWorkspace[pathParts[3]];
        const workspace = staticWorkspaceItems.find(item => item.id === workspaceId);
        if (workspace) setCurrentWorkspace(workspace);
      } else if (pathParts[1] === 'dashboards' && pathParts[2]) {
        const dashboardToWorkspace = { 'overview': 'grants-management', 'donor-dashboard': 'donor-management' };
        const workspaceId = dashboardToWorkspace[pathParts[2]];
        const workspace = staticWorkspaceItems.find(item => item.id === workspaceId);
        if (workspace) setCurrentWorkspace(workspace);
      } else if (pathParts[1] === 'docs' && pathParts[2]) {
        const docName = pathParts[2];
        const found = Object.entries(workspaceToGettingStarted).find(([_, path]) => path === `/docs/${docName}`);
        if (found) {
          const workspace = staticWorkspaceItems.find(item => item.id === found[0]);
          if (workspace) setCurrentWorkspace(workspace);
        }
      } else if (!currentWorkspace) {
        const grantsWorkspace = staticWorkspaceItems.find(item => item.id === 'grants-management');
        if (grantsWorkspace) setCurrentWorkspace(grantsWorkspace);
      }
    }
  }, [category, staticWorkspaceItems, location.pathname, currentWorkspace]);

  const handleDeleteBoard = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/boards/${id}`, { method: 'DELETE' });
        if (response.ok) window.location.reload();
        else alert("Failed to delete the board.");
      } catch (err) { console.error("Error deleting:", err); }
    }
  };

  const handleBoardClick = (boardId, boardName) => {
    setActiveItem(boardName);
    if (onBoardClick) onBoardClick(boardId);
    else navigate(`/boards/${boardId}`);
  };

  const handleDashboardClick = (dashboardId, dashboardName) => {
    setActiveItem(dashboardName);
    navigate(`/dashboards/${dashboardId}`);
  };

  const handleWorkspaceChange = (item) => {
    setCurrentWorkspace(item);
    navigate(`/workspaces/${item.workspaceNumber}/${item.id}`);
  };

  // ✅ FIXED: Added return statements after each navigation
  const handleSubItemClick = (subItemLabel) => {
    console.log('🔵 Clicked:', subItemLabel);
    setActiveItem(subItemLabel);
    const routing = subItemRouting[subItemLabel];
    console.log('🔵 Routing config:', routing);

    if (!routing) {
      console.log('⚠️ No routing found');
      return;
    }

    if (routing.type === 'disabled') {
      console.log('🔒 Disabled item');
      alert(`"${subItemLabel}" coming soon!`);
      return;
    }

    if (routing.type === 'docs') {
      const docPath = workspaceToGettingStarted[currentWorkspace?.id];
      if (docPath) {
        console.log('✅ Navigating to docs:', docPath);
        navigate(docPath);
      }
      return; // ✅ ADDED
    }

    if (routing.type === 'dashboard') {
      console.log('✅ Navigating to dashboard:', routing.route);
      navigate(routing.route);
      return; // ✅ ADDED
    }

    if (routing.type === 'template') {
      console.log('✅ Navigating to template:', `/boards/template/${routing.route}`);
      navigate(`/boards/template/${routing.route}`);
      return; // ✅ ADDED
    }
  };

  const getWorkspaceName = () => currentWorkspace?.label || (category === 'ngo' ? 'Non-Profit Workspace' : 'MainWorkSpace');
  const getWorkspaceColor = () => currentWorkspace ? ({ 'Grants Management': '#067B4B', 'Donor Management': '#FB275D', 'monday Fundraising': '#9CD326', 'Volunteer Registration Management': '#FFCB00', 'Project Management': '#0073EA' }[currentWorkspace.label] || '#007f9b') : '#007f9b';

  return (
    <div className="workspace-section">
      <div className="workspace-header">
        <span className="section-title">Workspaces</span>
        <div className="header-actions">
          <button ref={workspaceMenuButtonRef} className="icon-btn" onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}><MoreVertical size={16} /></button>
          <button className="icon-btn"><Search size={16} /></button>
        </div>
      </div>
      <WorkspaceMenu show={showWorkspaceMenu} onClose={() => { setShowWorkspaceMenu(false); setShowEditSubmenu(false); }} buttonRef={workspaceMenuButtonRef} showEditSubmenu={showEditSubmenu} setShowEditSubmenu={setShowEditSubmenu} />

      <div className="workspace-selector-row">
        <button ref={workspaceCardRef} className="workspace-card" onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}>
          <div className="workspace-avatar" style={{ background: getWorkspaceColor() }}>
            <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '12px' }}>{currentWorkspace?.label?.[0] || 'M'}</span>
            <div className="workspace-badge"><Home size={8} /></div>
          </div>
          <span className="workspace-name">{getWorkspaceName()}</span>
          <ChevronDown size={18} className="workspace-chevron" />
        </button>
        <button ref={addMenuButtonRef} className="add-btn" onClick={() => setShowAddMenu(!showAddMenu)}><Plus size={20} /></button>
      </div>

      <WorkspaceDropdown show={showWorkspaceDropdown} onClose={() => setShowWorkspaceDropdown(false)} buttonRef={workspaceCardRef} workspaceItems={staticWorkspaceItems} currentWorkspace={currentWorkspace} onWorkspaceSelect={handleWorkspaceChange} />
      <AddNewMenu show={showAddMenu} onClose={() => { setShowAddMenu(false); setShowBoardSubmenu(false); }} buttonRef={addMenuButtonRef} showBoardSubmenu={showBoardSubmenu} setShowBoardSubmenu={setShowBoardSubmenu} showDocSubmenu={showDocSubmenu} setShowDocSubmenu={setShowDocSubmenu} showFormSubmenu={showFormSubmenu} setShowFormSubmenu={setShowFormSubmenu} />

      <div className="workspace-items">
        {currentWorkspace?.subItems?.map((subItem, index) => {
          const subItemLabel = typeof subItem === 'object' ? subItem.label : subItem;
          return (
            <button key={index} onClick={() => handleSubItemClick(subItemLabel)} className={`workspace-item ${activeItem === subItemLabel ? 'active' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="item-icon" style={{ color: '#676879' }}><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fillRule="evenodd" clipRule="evenodd" /></svg>
              <span>{subItemLabel}</span>
            </button>
          );
        })}

        {(boards.length > 0) && <div style={{ height: '1px', backgroundColor: '#e6e9ef', margin: '8px 12px' }} />}

        {projectBoards.map((board) => (
          <div key={board._id} className="relative group/item">
            <div
              onClick={() => handleBoardClick(board._id, board.name)}
              className={`workspace-item w-full flex justify-between items-center cursor-pointer ${activeItem === board.name ? 'active' : ''}`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="item-icon flex-shrink-0"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" /></svg>
                <span className="truncate">{board.name}</span>
              </div>

              <button
                className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenBoardMenuId(openBoardMenuId === board._id ? null : board._id);
                }}
              >
                <MoreHorizontal size={14} className="text-gray-500" />
              </button>
            </div>

            {openBoardMenuId === board._id && (
              <div className="absolute right-2 top-8 w-40 bg-white border border-gray-200 rounded shadow-xl z-[1000] py-1">
                <button
                  className="w-full text-left px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2"
                  onClick={(e) => handleDeleteBoard(e, board._id)}
                >
                  <Trash2 size={14} /> <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {analyticsDashboards.map((dash) => (
          <div key={dash._id} className="relative group/item">
            <div
              className={`workspace-item w-full flex justify-between items-center cursor-pointer ${activeItem === dash.name ? 'active' : ''}`}
              onClick={() => handleDashboardClick(projectBoards[0]?._id || dash._id, dash.name)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <BarChart2 size={16} className="item-icon flex-shrink-0" style={{ color: '#676879' }} />
                <span className="truncate">{dash.name}</span>
              </div>
              <button
                className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-gray-200 rounded"
                onClick={(e) => { e.stopPropagation(); setOpenBoardMenuId(openBoardMenuId === dash._id ? null : dash._id); }}
              >
                <MoreHorizontal size={14} className="text-gray-500" />
              </button>
            </div>
            {openBoardMenuId === dash._id && (
              <div className="absolute right-2 top-8 w-40 bg-white border border-gray-200 rounded shadow-xl z-[1000] py-1">
                <button className="w-full text-left px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2" onClick={(e) => handleDeleteBoard(e, dash._id)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSection;