import React from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Filter,
  ArrowUpDown,
  Eye,
  Grid3x3,
  MoreHorizontal
} from 'lucide-react';

const ActionBar = () => {
  return (
    <div className="action-bar">
      <div className="action-bar-left">
        <button className="new-task-btn">
          New task
          <ChevronDown size={16} />
        </button>

        <div className="action-divider"></div>

        <button className="action-btn">
          <Search size={18} />
          <span>Search</span>
        </button>
        <button className="action-btn">
          <User size={18} />
          <span>Person</span>
        </button>
        <button className="action-btn">
          <Filter size={18} />
          <span>Filter</span>
          <ChevronDown size={14} />
        </button>
        <button className="action-btn">
          <ArrowUpDown size={18} />
          <span>Sort</span>
        </button>
        <button className="action-btn">
          <Eye size={18} />
          <span>Hide</span>
        </button>
        <button className="action-btn">
          <Grid3x3 size={18} />
          <span>Group by</span>
        </button>
        <button className="action-icon-btn">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <button className="collapse-btn">
        <ChevronUp size={18} />
      </button>
    </div>
  );
};

export default ActionBar;
