import React, { useEffect, useRef } from 'react';
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
  onClose,
  buttonRef,
  showEditSubmenu,
  setShowEditSubmenu,
}) => {
  const menuRef = useRef(null);
  const editButtonRef = useRef(null);

  // ✅ Position main menu below button
  useEffect(() => {
    if (show && buttonRef?.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      menuRef.current.style.top = `${buttonRect.bottom + 4}px`;
      menuRef.current.style.left = `${buttonRect.left}px`;
    }
  }, [show, buttonRef]);

  // ✅ Position submenu to the right of parent item
  useEffect(() => {
    if (showEditSubmenu && editButtonRef.current) {
      const submenu = document.querySelector('.edit-submenu');
      if (submenu) {
        const buttonRect = editButtonRef.current.getBoundingClientRect();
        submenu.style.top = `${buttonRect.top}px`;
        submenu.style.left = `${buttonRect.right + 4}px`;
      }
    }
  }, [showEditSubmenu]);

  // ✅ Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose, buttonRef]);

  if (!show) return null;

  const handleItemClick = () => {
    onClose();
  };

  return (
    <>
      <div className="workspace-dropdown" ref={menuRef}>
        <button 
          className="dropdown-item"
          onClick={handleItemClick}
        >
          <Settings size={16} />
          <span>Manage workspace</span>
        </button>

        <button
          ref={editButtonRef}
          className="dropdown-item submenu-trigger"
          onMouseEnter={() => setShowEditSubmenu(true)}
          onMouseLeave={() => setShowEditSubmenu(false)}
        >
          <Edit size={16} />
          <span>Edit workspace</span>
          <ChevronRight size={16} className="submenu-arrow" />
        </button>

        <button 
          className="dropdown-item"
          onClick={handleItemClick}
        >
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

        <button 
          className="dropdown-item"
          onClick={handleItemClick}
        >
          <Plus size={16} />
          <span>Add new workspace</span>
        </button>

        <button 
          className="dropdown-item"
          onClick={handleItemClick}
        >
          <Grid size={16} />
          <span>Browse all workspaces</span>
        </button>

        <button 
          className="dropdown-item"
          onClick={handleItemClick}
        >
          <Archive size={16} />
          <span>View archive</span>
        </button>

        <div className="dropdown-divider" />

        <button 
          className="dropdown-item"
          onClick={handleItemClick}
        >
          <Eye size={16} style={{ color: '#00d2d2' }} />
          <span>monday CRM overview</span>
        </button>
      </div>

      {/* Edit Submenu */}
      {showEditSubmenu && (
        <div
          className="submenu edit-submenu"
          onMouseEnter={() => setShowEditSubmenu(true)}
          onMouseLeave={() => setShowEditSubmenu(false)}
        >
          <button 
            className="dropdown-item"
            onClick={handleItemClick}
          >
            <Edit size={16} />
            <span>Rename workspace</span>
          </button>
        </div>
      )}
    </>
  );
};

export default WorkspaceMenu;