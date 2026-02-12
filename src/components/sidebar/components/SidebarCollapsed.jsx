import React from 'react';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';
import { appFeatures } from '../data/appFeatures';

const SidebarCollapsed = ({ activeItem, setActiveItem, onToggleCollapse }) => {
  return (
    <div className="sidebar-section collapsed">
      {/* ✅ Chevron button – now part of the icon list, perfectly aligned */}
      <button
        onClick={onToggleCollapse}
        className="sidebar-item-collapsed"
        aria-label="Expand sidebar"
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>

      {appFeatures.map((feature, idx) => (
        <button key={idx} className="sidebar-item-collapsed">
          <feature.icon size={16} />
        </button>
      ))}

      <button
        onClick={() => setActiveItem('home')}
        className={`sidebar-item-collapsed ${activeItem === 'home' ? 'active' : ''}`}
      >
        <Home size={16} />
      </button>

      <button className="sidebar-item-collapsed">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};

export default SidebarCollapsed;