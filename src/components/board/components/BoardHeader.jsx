import React from 'react';
import {
  ChevronDown,
  Sparkles,
  Shuffle,
  Clock,
  MessageSquare,
  Bell,
  Link2,
  MoreHorizontal
} from 'lucide-react';

const BoardHeader = ({ boardTitle = 'work' }) => {
  return (
    <header className="board-header">
      <div className="header-left">
        <button className="board-title-btn">
          <h2 className="board-title">{boardTitle}</h2>
          <ChevronDown size={24} />
        </button>
      </div>

      <div className="header-right">
        <button className="header-btn sidekick-btn">
          <Sparkles size={20} className="ai-icon" />
          <span>Sidekick</span>
          <span className="counter">0</span>
        </button>
        
        <button className="header-btn integrate-btn">
          <Shuffle size={18} />
          <span>Integrate</span>
          <div className="integration-badges">
            <div className="integration-badge"></div>
            <div className="integration-badge"></div>
            <div className="integration-badge"></div>
          </div>
        </button>

        <button className="header-btn">
          <Clock size={20} />
          <span>Automate</span>
        </button>

        <button className="header-icon-btn">
          <MessageSquare size={20} />
        </button>

        <button className="header-icon-btn">
          <Bell size={20} />
        </button>

        <div className="user-avatar">A</div>

        <button className="invite-btn">Invite / 1</button>

        <button className="header-icon-btn">
          <Link2 size={20} />
        </button>

        <button className="header-icon-btn">
          <MoreHorizontal size={24} />
        </button>
      </div>
    </header>
  );
};

export default BoardHeader;
