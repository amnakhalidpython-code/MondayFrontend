import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

const BoardTabs = ({ activeTab = 'Main table' }) => {
  return (
    <div className="board-tabs">
      <button className="tab active">{activeTab}</button>
      <button className="tab-icon-btn">
        <MoreHorizontal size={16} />
      </button>
      <button className="tab-icon-btn">
        <Plus size={16} />
      </button>
    </div>
  );
};

export default BoardTabs;
