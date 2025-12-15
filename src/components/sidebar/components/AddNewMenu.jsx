import React from 'react';
import {
  Eye,
  Layers,
  FileText,
  Grid,
  Edit,
  Settings,
  Puzzle,
  Archive,
  Copy,
  ChevronRight,
} from 'lucide-react';

const AddNewMenu = ({
  show,
  showBoardSubmenu,
  setShowBoardSubmenu,
  showDocSubmenu,
  setShowDocSubmenu,
}) => {
  if (!show) return null;

  return (
    <div className="add-menu-dropdown">
      <div className="add-menu-title">Add new</div>

      <button className="dropdown-item">
        <Eye size={16} style={{ color: '#00d2d2' }} />
        <span>CRM boards</span>
        <ChevronRight size={16} className="submenu-arrow" />
      </button>

      {/* BOARD */}
      <button
        className="dropdown-item submenu-trigger"
        onMouseEnter={() => setShowBoardSubmenu(true)}
        onMouseLeave={() => setShowBoardSubmenu(false)}
      >
        <Layers size={16} />
        <span>Board</span>
        <ChevronRight size={16} className="submenu-arrow" />
      </button>

      {showBoardSubmenu && (
        <div
          className="submenu board-submenu"
          onMouseEnter={() => setShowBoardSubmenu(true)}
          onMouseLeave={() => setShowBoardSubmenu(false)}
        >
          <button className="dropdown-item">
            <Layers size={16} />
            <span>New Board</span>
          </button>
          <button className="dropdown-item">
            <Copy size={16} />
            <span>Start with template</span>
          </button>
        </div>
      )}

      {/* DOC */}
      <button
        className="dropdown-item submenu-trigger"
        onMouseEnter={() => setShowDocSubmenu(true)}
        onMouseLeave={() => setShowDocSubmenu(false)}
      >
        <FileText size={16} />
        <span>Doc</span>
        <ChevronRight size={16} className="submenu-arrow" />
      </button>

      {showDocSubmenu && (
        <div
          className="submenu doc-submenu"
          onMouseEnter={() => setShowDocSubmenu(true)}
          onMouseLeave={() => setShowDocSubmenu(false)}
        >
          <button className="dropdown-item">
            <FileText size={16} />
            <span>New Doc</span>
          </button>
          <button className="dropdown-item">
            <Copy size={16} />
            <span>Start with template</span>
          </button>
        </div>
      )}

      <button className="dropdown-item">
        <Grid size={16} />
        <span>Dashboard</span>
      </button>

      <button className="dropdown-item">
        <Edit size={16} />
        <span>Form</span>
      </button>

      <button className="dropdown-item">
        <Settings size={16} />
        <span>Workflow</span>
      </button>

      <button className="dropdown-item">
        <Puzzle size={16} />
        <span>Installed apps</span>
      </button>

      <button className="dropdown-item">
        <Archive size={16} />
        <span>Import data</span>
      </button>
    </div>
  );
};

export default AddNewMenu;
