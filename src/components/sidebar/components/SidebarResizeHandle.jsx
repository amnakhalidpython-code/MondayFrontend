import React, { useEffect, useState } from 'react';

const SidebarResizeHandle = ({ setSidebarWidth }) => {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      if (e.clientX >= 200 && e.clientX <= 600) {
        setSidebarWidth(e.clientX);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <div
      className={`resize-handle ${isResizing ? 'resizing' : ''}`}
      onMouseDown={() => setIsResizing(true)}
    />
  );
};

export default SidebarResizeHandle;
