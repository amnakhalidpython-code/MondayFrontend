import React from 'react';

const StatusBar = ({ summary, statusConfig }) => (
  <div className="status-bar">
    {summary.done > 0 && (
      <div 
        className="status-segment"
        style={{ 
          width: `${summary.done}%`,
          backgroundColor: statusConfig.done.bg
        }}
      />
    )}
    {summary.working > 0 && (
      <div 
        className="status-segment"
        style={{ 
          width: `${summary.working}%`,
          backgroundColor: statusConfig.working.bg
        }}
      />
    )}
    {summary.stuck > 0 && (
      <div 
        className="status-segment"
        style={{ 
          width: `${summary.stuck}%`,
          backgroundColor: statusConfig.stuck.bg
        }}
      />
    )}
  </div>
);

export default StatusBar;
