import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      style={{
        position: 'absolute',
        right: '-12px', // Centers it on the border
        top: '25px',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '1px solid #c5c7d0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: '#676879'
      }}
    >
      {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </button>
  );
};

export default SidebarHeader;