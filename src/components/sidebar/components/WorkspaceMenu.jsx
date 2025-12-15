import React from 'react';
import {
  Settings,
  Edit,
  ArrowUpDown,
  Copy,
  Trash2,
  Plus,
  Grid,
  Archive,
  Eye,
  ChevronRight,
} from 'lucide-react';

const WorkspaceMenu = ({
  show,
  setShow,
  showEditSubmenu,
  setShowEditSubmenu,
}) => {
  if (!show) return null;

  return (
    <div className="workspace-dropdown">
      <button className="dropdown-item">
        <Settings size={16} />
        <span>Manage workspace</span>
      </button>

      <button
        className="dropdown-item submenu-trigger"
        onMouseEnter={() => setShowEditSubmenu(true)}
        onMouseLeave={() => setShowEditSubmenu(false)}
      >
        <Edit size={16} />
        <span>Edit workspace</span>
        <ChevronRight size={16} className="submenu-arrow" />
      </button>

      {showEditSubmenu && (
        <div
          className="submenu edit-submenu"
          onMouseEnter={() => setShowEditSubmenu(true)}
          onMouseLeave={() => setShowEditSubmenu(false)}
        >
          <button className="dropdown-item">
            <Edit size={16} />
            <span>Rename workspace</span>
          </button>
        </div>
      )}

      <button className="dropdown-item">
        <ArrowUpDown size={16} />
        <span>Sort workspace</span>
      </button>

      <button className="dropdown-item disabled">
        <Copy size={16} />
        <span>Save as template</span>
      </button>

      <button className="dropdown-item disabled">
        <Trash2 size={16} />
        <span>Delete workspace</span>
      </button>

      <div className="dropdown-divider" />

      <button className="dropdown-item">
        <Plus size={16} />
        <span>Add new workspace</span>
      </button>

      <button className="dropdown-item">
        <Grid size={16} />
        <span>Browse all workspaces</span>
      </button>

      <button className="dropdown-item">
        <Archive size={16} />
        <span>View archive</span>
      </button>

      <div className="dropdown-divider" />

      <button className="dropdown-item">
        <Eye size={16} style={{ color: '#00d2d2' }} />
        <span>monday CRM overview</span>
      </button>
    </div>
  );
};

export default WorkspaceMenu;
