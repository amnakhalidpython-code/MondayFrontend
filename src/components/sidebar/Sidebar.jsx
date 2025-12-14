import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Mail, Layers, FileText, Mic, MoreHorizontal, Plus, Search, MoreVertical, Star } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);
  const [isWorkspacesExpanded, setIsWorkspacesExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('home');
  const [sidebarWidth, setSidebarWidth] = useState(306);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const appFeatures = [
    { icon: Mail, label: 'Mass email tracking' },
    { icon: Layers, label: 'Sequences' },
    { icon: FileText, label: 'Quotes and Invoices' },
    { icon: Mic, label: 'AI Notetaker' }
  ];

  const workspaceItems = [
    { label: 'Grants Pipeline', type: 'board' },
    { label: 'Getting Started', type: 'doc' },
    { label: 'Grant Providers', type: 'board' },
    { label: 'Grants Dashboard', type: 'overview' }
  ];

  return (
    <nav 
      ref={sidebarRef}
      className="relative h-screen flex flex-col transition-all duration-300"
      style={{
        width: isCollapsed ? '60px' : `${sidebarWidth}px`,
        background: 'linear-gradient(135deg, rgb(255, 255, 255) 5%, rgb(225, 239, 242) 100%)',
        boxShadow: 'rgb(225, 239, 242) -5px -20px 20px 0px inset',
        fontFamily: 'Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif'
      }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#e1eff2] hover:bg-[#d1e5e8] transition-all z-50"
        style={{ 
          left: isCollapsed ? '24px' : `${sidebarWidth - 21}px`,
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        aria-label={isCollapsed ? "Open navigation" : "Close navigation"}
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-[#323338]" />
        ) : (
          <ChevronLeft size={16} className="text-[#323338]" />
        )}
      </button>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0085ff] transition-colors z-50 group"
          style={{
            background: isResizing ? '#0085ff' : 'transparent'
          }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-[#0085ff] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      <div className="flex flex-col justify-between h-full py-1 overflow-hidden">
        <div className="flex flex-col overflow-x-hidden overflow-y-auto">
          {/* Top App Features */}
          {!isCollapsed && (
            <div className="flex flex-col gap-0.5 mt-1.5 px-4 pb-2">
              {appFeatures.map((feature, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-3 h-8 px-2 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={16} className="text-[#676879]" />
                  </div>
                  <span className="text-sm text-[#323338] truncate">{feature.label}</span>
                </button>
              ))}

              {/* Home */}
              <button
                onClick={() => setActiveItem('home')}
                className={`flex items-center gap-3 h-8 px-2 rounded-lg transition-colors ${
                  activeItem === 'home' ? 'bg-white/70' : 'hover:bg-white/50'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <Home size={16} className="text-[#323338]" />
                </div>
                <span className={`text-sm text-[#323338] ${activeItem === 'home' ? 'font-medium' : ''}`}>Home</span>
              </button>

              {/* More Button */}
              <button className="flex items-center justify-between h-8 px-2 rounded-lg hover:bg-white/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <MoreHorizontal size={16} className="text-[#323338]" />
                  </div>
                  <span className="text-sm text-[#323338]">More</span>
                </div>
                <ChevronRight size={16} className="text-[#323338]" />
              </button>
            </div>
          )}

          {/* Collapsed Icons */}
          {isCollapsed && (
            <div className="flex flex-col gap-0.5 mt-1.5 px-2 pb-2 items-center">
              {appFeatures.map((feature, idx) => (
                <button
                  key={idx}
                  className="flex items-center justify-center w-10 h-8 rounded-lg hover:bg-white/50 transition-colors"
                  title={feature.label}
                >
                  <feature.icon size={16} className="text-[#676879]" />
                </button>
              ))}
              <button
                onClick={() => setActiveItem('home')}
                className={`flex items-center justify-center w-10 h-8 rounded-lg transition-colors ${
                  activeItem === 'home' ? 'bg-white/70' : 'hover:bg-white/50'
                }`}
                title="Home"
              >
                <Home size={16} className="text-[#323338]" />
              </button>
              <button 
                className="flex items-center justify-center w-10 h-8 rounded-lg hover:bg-white/50 transition-colors"
                title="More"
              >
                <MoreHorizontal size={16} className="text-[#323338]" />
              </button>
            </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto px-4">
            {/* Favorites Section */}
            {!isCollapsed && (
              <div className="mb-2">
                <button
                  onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
                  className="w-full flex items-center justify-between h-11 px-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#323338]">Favorites</span>
                    <ChevronRight 
                      size={12} 
                      className={`text-[#323338] transition-transform ${isFavoritesExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </button>
              </div>
            )}

            {/* Workspaces Section */}
            {!isCollapsed && (
              <div>
                <div className="sticky top-0 bg-gradient-to-b from-[#e1eff2]/95 to-[#e1eff2]/80 backdrop-blur-sm z-10 pb-2">
                  {/* Workspace Header */}
                  <div className="flex items-center justify-between py-2 px-2">
                    <span className="text-xs font-medium text-[#323338]">Workspaces</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-white/50 rounded transition-colors">
                        <MoreVertical size={16} className="text-[#323338]" />
                      </button>
                      <button className="p-1 hover:bg-white/50 rounded transition-colors">
                        <Search size={16} className="text-[#323338]" />
                      </button>
                    </div>
                  </div>

                  {/* Workspace Selector */}
                  <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-[#037f4c] text-white text-xs font-semibold relative flex-shrink-0">
                      G
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-sm flex items-center justify-center">
                        <Home size={8} className="text-[#323338]" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#323338] truncate flex-1 text-left">Grants Management</span>
                    <ChevronRight size={18} className="text-[#323338] flex-shrink-0" />
                  </button>

                  {/* Add Button */}
                  <button className="w-8 h-8 flex items-center justify-center bg-[#0085ff] hover:bg-[#0073e6] rounded ml-2 mt-2 transition-colors">
                    <Plus size={20} className="text-white" />
                  </button>
                </div>

                {/* Workspace Items */}
                {isWorkspacesExpanded && (
                  <div className="space-y-0 mt-2">
                    {workspaceItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveItem(item.label)}
                        className={`w-full flex items-center gap-3 h-9 px-2 rounded hover:bg-white/50 transition-colors ${
                          activeItem === item.label ? 'bg-white/70' : ''
                        }`}
                      >
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-[#323338]">
                          {item.type === 'board' && (
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                          )}
                          {item.type === 'doc' && (
                            <FileText size={16} />
                          )}
                          {item.type === 'overview' && (
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M4 3.5H16C16.2761 3.5 16.5 3.72386 16.5 4V16C16.5 16.2761 16.2761 16.5 16 16.5H4C3.72386 16.5 3.5 16.2761 3.5 16V4C3.5 3.72386 3.72386 3.5 4 3.5ZM2 4C2 2.89543 2.89543 2 4 2H16C17.1046 2 18 2.89543 18 4V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V4ZM5.5 14.25C5.5 14.6642 5.83579 15 6.25 15C6.66421 15 7 14.6642 7 14.25V10.75C7 10.3358 6.66421 10 6.25 10C5.83579 10 5.5 10.3358 5.5 10.75L5.5 14.25ZM10.25 15C9.83579 15 9.5 14.6642 9.5 14.25L9.5 7.75C9.5 7.33579 9.83579 7 10.25 7C10.6642 7 11 7.33579 11 7.75V14.25C11 14.6642 10.6642 15 10.25 15ZM13.5 14.25C13.5 14.6642 13.8358 15 14.25 15C14.6642 15 15 14.6642 15 14.25V5.75C15 5.33579 14.6642 5 14.25 5C13.8358 5 13.5 5.33579 13.5 5.75V14.25Z" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-[#323338] truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;