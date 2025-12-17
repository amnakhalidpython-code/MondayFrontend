import React, { useState } from 'react';

const StatusCell = ({ currentStatus, statusConfig, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!currentStatus) {
    return (
      <div className="status-dropdown">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="status-btn empty"
        >
          -
        </button>
        {isOpen && (
          <>
            <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
            <StatusMenu 
              statusConfig={statusConfig}
              onChange={(status) => {
                onChange(status);
                setIsOpen(false);
              }}
            />
          </>
        )}
      </div>
    );
  }

  const config = statusConfig[currentStatus];

  return (
    <div className="status-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="status-btn"
        style={{ backgroundColor: config.bg }}
      >
        {config.label}
      </button>

      {isOpen && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
          <StatusMenu 
            statusConfig={statusConfig}
            onChange={(status) => {
              onChange(status);
              setIsOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
};

// STATUS MENU
const StatusMenu = ({ statusConfig, onChange }) => (
  <div className="status-menu">
    {Object.entries(statusConfig).map(([key, config]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className="status-menu-item"
      >
        <div 
          className="status-color"
          style={{ backgroundColor: config.bg }}
        />
        <span>{config.label}</span>
      </button>
    ))}
  </div>
);

export default StatusCell;
