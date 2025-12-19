// BoardHeader.jsx - Reusable Board Header Component
import React from 'react';
import {
  
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
         
        </button>
      </div>

      <div className="header-actions">
        {/* Sidekick Button */}
        <div className="action-group">
          <button className="header-btn sidekick-btn">
            <Sparkles size={20} className="ai-icon" />
            <span>Sidekick</span>
            <span className="counter">0</span>
          </button>
        </div>

        {/* Integrate + Automate Group */}
        <div className="action-group">
          <button className="header-btn integrate-btn">
            <Shuffle size={18} />
            <span>Integrate</span>
            <div className="integration-badges">
              <div className="integration-badge"></div>
              <div className="integration-badge"></div>
              <div className="integration-badge"></div>
            </div>
          </button>

          <button className="header-btn automate-btn">
            <Clock size={20} />
            <span>Automate</span>
          </button>
        </div>

        {/* Icon Buttons Group */}
        <div className="action-group">
          <button className="header-icon-btn" aria-label="Start a board discussion">
            <MessageSquare size={20} />
          </button>
        </div>

        {/* Avatar Group */}
        <div className="action-group">
          <button className="header-icon-btn avatar-btn" aria-label="Board activity">
            <div className="user-avatar">A</div>
          </button>
        </div>

        {/* Invite + Link Group */}
        <div className="action-group">
          <button className="invite-btn">Invite / 1</button>

          <button className="header-icon-btn" aria-label="Copy Link">
            <Link2 size={20} />
          </button>
        </div>

        {/* Menu Button */}
        <div className="action-group">
          <button className="header-icon-btn" aria-label="Options">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default BoardHeader;