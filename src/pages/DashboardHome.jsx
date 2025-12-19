// src/pages/DashboardHome.jsx - Main dashboard content (boards list)
import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import './DashboardHome.css';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { boards, loading } = useOutletContext();

  const handleBoardClick = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <div className="dashboard-home">
      {loading ? (
        <div className="dashboard-loading">
          <div className="loading-text">Loading...</div>
        </div>
      ) : boards.length === 0 ? (
        <div className="dashboard-empty">
          <div className="empty-icon">
            <svg 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" 
              />
            </svg>
          </div>
          <h3 className="empty-title">
            Welcome to monday.com!
          </h3>
          <p className="empty-description">
            You don't have any boards yet. Create your first board to get started.
          </p>
          <button 
            onClick={() => navigate('/one')}
            className="create-board-btn"
          >
            Create your first board
          </button>
        </div>
      ) : (
        <div>
          <div className="boards-header">
            <h2 className="boards-title">
              Your boards
            </h2>
            <p className="boards-count">
              {boards.length} {boards.length === 1 ? 'board' : 'boards'} available
            </p>
          </div>

          <div className="boards-grid">
            {boards.map((board) => (
              <div 
                key={board._id}
                onClick={() => handleBoardClick(board._id)}
                className="board-card"
              >
                <div className="board-card-header">
                  <div className="board-card-info">
                    <h3 className="board-card-title">
                      {board.name}
                    </h3>
                    <p className="board-card-items">
                      {board.items?.length || 0} items
                    </p>
                  </div>
                  <div>
                    <svg 
                      className="board-card-icon"
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v10h10V5H5z"/>
                      <path d="M7 7h2v6H7V7zm4 0h2v6h-2V7z"/>
                    </svg>
                  </div>
                </div>

                <div className="board-card-meta">
                  <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Views */}
                {board.views && board.views.length > 0 && (
                  <div className="board-card-views">
                    {board.views.map((view) => (
                      <span 
                        key={view.id}
                        className="view-tag"
                      >
                        {view.icon === 'board' && '📋'}
                        {view.icon === 'chart' && '📊'}
                        {view.icon === 'document' && '📄'}
                        {' '}{view.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Columns Preview */}
                {board.columns && (
                  <div className="board-card-columns">
                    {board.columns.owner && (
                      <span className="column-tag owner">
                        Owner
                      </span>
                    )}
                    {board.columns.status && (
                      <span className="column-tag status">
                        Status
                      </span>
                    )}
                    {board.columns.dueDate && (
                      <span className="column-tag date">
                        Due Date
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
