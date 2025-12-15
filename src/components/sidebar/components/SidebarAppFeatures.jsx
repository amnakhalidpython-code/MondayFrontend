import React from 'react';
import { Home, MoreHorizontal, ChevronRight } from 'lucide-react';
import { appFeatures } from '../data/appFeatures';

const SidebarAppFeatures = ({ activeItem, setActiveItem }) => {
  return (
    <div className="sidebar-section">
      {appFeatures.map((feature, idx) => (
        <button key={idx} className="sidebar-item">
          <feature.icon size={16} className="item-icon" />
          <span className="item-label">{feature.label}</span>
        </button>
      ))}

      <button
        onClick={() => setActiveItem('home')}
        className={`sidebar-item ${activeItem === 'home' ? 'active' : ''}`}
      >
        <Home size={16} className="item-icon" />
        <span className="item-label">Home</span>
      </button>

      <button className="sidebar-item">
        <MoreHorizontal size={16} className="item-icon" />
        <span className="item-label">More</span>
        <ChevronRight size={16} className="chevron-icon" />
      </button>
    </div>
  );
};

export default SidebarAppFeatures;
