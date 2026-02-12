import React, { useState, useEffect, useRef } from 'react';
import {
  Bell, Inbox, UserPlus, Puzzle, Bot, Settings, Search, HelpCircle,
  Grid, X, Trash2, Check, RefreshCw, Heart, Gem, Mail, Users,
  LogOut, User, MoreHorizontal, Sliders
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../services/notificationService';
import './MondayCRMNavbar.css';

// Import Modals
import IntegrationsModal from '../modals/IntegrationsModal';
import InviteModal from '../modals/InviteModal';
import UpdateFeedModal from '../modals/UpdateFeedModal';

const MondayCRMNavbar = () => {
  // Notification states
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Notification Sidebar specific states
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Mentioned', 'Assigned'
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notificationSearch, setNotificationSearch] = useState('');

  // Dropdown states
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAppsLauncherOpen, setIsAppsLauncherOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modal States
  const [isUpdateFeedOpen, setIsUpdateFeedOpen] = useState(false); // For Inbox
  const [isIntegrationsModalOpen, setIsIntegrationsModalOpen] = useState(false); // For Apps
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false); // For Invite

  // Data states
  const [inboxUnreadCount, setInboxUnreadCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const userId = sessionStorage.getItem('mondaySignupEmail') ||
        localStorage.getItem('userEmail') ||
        'demo@user.com';

      const response = await notificationService.getNotifications(50, 0, userId);

      if (response.success) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      // Fallback demo logic here if needed
    } finally {
      setLoading(false);
    }
  };

  // Load user info
  useEffect(() => {
    const email = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail') || 'user@example.com';
    let storedName = sessionStorage.getItem('userName') || localStorage.getItem('userName');

    let name = email.split('@')[0];
    if (storedName) {
      if (storedName.startsWith('{')) {
        try {
          const nameObj = JSON.parse(storedName);
          name = nameObj.fullName || nameObj.firstName || nameObj.lastName || name;
        } catch (e) {
          name = storedName;
        }
      } else {
        name = storedName;
      }
    }

    const company = sessionStorage.getItem('companyName') || 'My Company';

    setUserInfo({
      email,
      name,
      company,
      initials: name.charAt(0).toUpperCase()
    });

    // Load favorites (demo)
    setFavorites([
      { id: 1, name: 'Main Board', type: 'board', icon: '📊' },
      { id: 2, name: 'CRM Dashboard', type: 'dashboard', icon: '📈' },
      { id: 3, name: 'Marketing Campaign', type: 'board', icon: '🎯' }
    ]);

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close all dropdowns/modals except the specified one
  const closeAllDropdowns = (exceptThis = null) => {
    if (exceptThis !== 'notification') setIsNotificationOpen(false);
    if (exceptThis !== 'ai') setIsAIOpen(false);
    if (exceptThis !== 'settings') setIsSettingsOpen(false);
    if (exceptThis !== 'search') setIsSearchOpen(false);
    if (exceptThis !== 'help') setIsHelpOpen(false);
    if (exceptThis !== 'favorites') setIsFavoritesOpen(false);
    if (exceptThis !== 'appsLauncher') setIsAppsLauncherOpen(false);
    if (exceptThis !== 'profile') setIsProfileOpen(false);

    // Modals
    if (exceptThis !== 'updateFeed') setIsUpdateFeedOpen(false);
    if (exceptThis !== 'invite') setIsInviteModalOpen(false);
    if (exceptThis !== 'apps') setIsIntegrationsModalOpen(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearchResults([
      { id: 1, type: 'board', title: 'Sales Pipeline', subtitle: 'Board' },
      { id: 2, type: 'task', title: 'Follow up with client', subtitle: 'Task in Sales Board' },
      { id: 3, type: 'contact', title: 'John Smith', subtitle: 'Contact' }
    ]);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      const notification = notifications.find(n => n._id === notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      if (!notification?.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'urgent') return '#e44258';
    if (priority === 'high') return '#fdab3d';
    const colors = {
      new_lead: '#00c875',
      lead_assigned: '#00c875',
      deal_won: '#00d647',
      deal_lost: '#e44258',
      mention: '#0086c0',
      comment: '#0086c0'
    };
    return colors[type] || '#676879';
  };

  // Filter Logic for the new Sidebar
  const filteredNotifications = notifications.filter(n => {
    // Tab Filter
    if (activeTab === 'Mentioned' && n.type !== 'mention') return false;
    if (activeTab === 'Assigned' && !n.message.toLowerCase().includes('assigned')) return false;

    // Unread Filter
    if (showUnreadOnly && n.isRead) return false;

    // Search Filter
    if (notificationSearch) {
      const searchLower = notificationSearch.toLowerCase();
      return (
        n.title.toLowerCase().includes(searchLower) ||
        n.message.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-left">
          <a href="/" className="navbar-logo">
            <div className="logo-icon">
              <Gem size={25} color="#00A0A0" />
            </div>
            <div className="logo-text">
              <span className="logo-bold">monday</span>
              <span className="logo-light">CRM</span>
            </div>
          </a>

          <div className="pricing-container">
            <button className="btn-see-plans">
              <Gem size={18} />
              See plans
            </button>
          </div>
        </div>

        <div className="navbar-spacer"></div>

        <nav className="navbar-nav">

          {/* ================================================== */}
          {/* NOTIFICATIONS BELL (Sidebar)                       */}
          {/* ================================================== */}
          <div className="nav-icon-wrapper">
            <div className="notification-bell-wrapper">
              <button
                onClick={() => {
                  closeAllDropdowns('notification');
                  setIsNotificationOpen(!isNotificationOpen);
                }}
                className={`nav-btn ${isNotificationOpen ? 'active' : ''}`}
              >
                <Bell size={17} />
              </button>

              {unreadCount > 0 && (
                <span className="badge-unread">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>

            {/* Sidebar Implementation */}
            {isNotificationOpen && (
              <div className="notification-sidebar">
                {/* Header */}
                <div className="sidebar-header">
                  <h2 className="sidebar-title">Notifications</h2>
                  <div className="sidebar-actions">
                    <button className="action-btn" title="Settings">
                      <Settings size={18} />
                    </button>
                    <button className="action-btn" title="More options">
                      <MoreHorizontal size={18} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => setIsNotificationOpen(false)}
                      title="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="sidebar-tabs">
                  <button
                    className={`sidebar-tab ${activeTab === 'All' ? 'active' : ''}`}
                    onClick={() => setActiveTab('All')}
                  >
                    All
                  </button>
                  <button
                    className={`sidebar-tab ${activeTab === 'Mentioned' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Mentioned')}
                  >
                    Mentioned
                  </button>
                  <button
                    className={`sidebar-tab ${activeTab === 'Assigned' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Assigned')}
                  >
                    Assigned to me
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="sidebar-search-area">
                  <div className="search-input-wrapper">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search notifications by people, boards..."
                      className="sidebar-search-input"
                      value={notificationSearch}
                      onChange={(e) => setNotificationSearch(e.target.value)}
                    />
                  </div>
                  <div
                    className="unread-toggle"
                    onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  >
                    <div className={`toggle-switch ${showUnreadOnly ? 'active' : ''}`}>
                      <div className="toggle-knob"></div>
                    </div>
                    <span>Unread only</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="sidebar-content">
                  {loading && notifications.length === 0 ? (
                    <div className="empty-state">
                      <RefreshCw size={24} className="spin empty-icon" />
                      <p>Loading notifications...</p>
                    </div>
                  ) : filteredNotifications.length === 0 ? (
                    // Empty State
                    <div className="empty-state-illustration">
                      <div className="illustration-graphic">
                        <div className="illustration-circle"></div>
                        <div className="illustration-badge">4</div>
                        <div className="illustration-card">
                          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>@</div>
                          <div style={{ width: '20px', height: '2px', background: '#0073ea', marginLeft: '5px' }}></div>
                        </div>
                      </div>
                      <div className="empty-state-text">
                        <h3>No notifications to show</h3>
                        <p>You'll get notified here whenever someone @mentions or replies to you.</p>
                        <button className="btn-invite-members" onClick={() => {
                          setIsNotificationOpen(false);
                          setIsInviteModalOpen(true);
                        }}>
                          Invite new members
                        </button>
                      </div>
                    </div>
                  ) : (
                    // List of Notifications
                    <>
                      {unreadCount > 0 && (
                        <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'flex-end' }}>
                          <button className="action-btn mark-read-btn" onClick={handleMarkAllAsRead}>
                            <Check size={14} /> Mark all read
                          </button>
                        </div>
                      )}
                      {filteredNotifications.map(notification => (
                        <div
                          key={notification._id}
                          className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                          onClick={() => {
                            if (notification.link) {
                              navigate(notification.link);
                              handleMarkAsRead(notification._id);
                            }
                          }}
                        >
                          <div
                            className="notification-indicator"
                            style={{ backgroundColor: getNotificationColor(notification.type, notification.priority) }}
                          />
                          <div className="notification-content">
                            <div className={`notification-title ${!notification.isRead ? 'bold' : ''}`}>
                              {notification.title}
                            </div>
                            <div className="notification-message">
                              {notification.message}
                            </div>
                            <div className="notification-time">
                              {timeAgo(notification.createdAt)}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification._id);
                            }}
                            title="Delete"
                            className="delete-btn"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================================================== */}
          {/* INBOX (Opens UpdateFeedModal)                      */}
          {/* ================================================== */}
          <div className="nav-icon-wrapper">
            <button
              className="nav-btn"
              onClick={() => {
                closeAllDropdowns('updateFeed');
                setIsUpdateFeedOpen(true);
              }}
            >
              <Inbox size={17} />
            </button>
            {inboxUnreadCount > 0 && (
              <span className="badge-static">{inboxUnreadCount}</span>
            )}
          </div>

          {/* ================================================== */}
          {/* INVITE MEMBERS (Opens InviteModal)                 */}
          {/* ================================================== */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('invite');
              setIsInviteModalOpen(true);
            }}
          >
            <UserPlus size={17} />
          </button>

          {/* ================================================== */}
          {/* APPS/INTEGRATIONS (Opens IntegrationsModal)        */}
          {/* ================================================== */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('apps');
              setIsIntegrationsModalOpen(true);
            }}
          >
            <Puzzle size={17} />
          </button>

          {/* AI Assistant */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('ai');
              setIsAIOpen(!isAIOpen);
            }}
          >
            <Bot size={17} />
          </button>
          {isAIOpen && (
            <div className="notification-dropdown" style={{ right: '0', width: '400px' }}>
              <div className="dropdown-header">
                <h3 className="dropdown-title">🤖 AI Assistant</h3>
                <button onClick={() => setIsAIOpen(false)} className="action-btn">
                  <X size={17} />
                </button>
              </div>
              <div style={{ padding: '17px' }}>
                <div style={{ marginBottom: '15px', fontSize: '14px', color: '#323338' }}>
                  How can I help you today?
                </div>
                <textarea
                  placeholder="Ask me anything about your work..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '10px',
                    border: '1px solid #d0d4e4',
                    borderRadius: '4px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#0073ea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginTop: '10px'
                  }}
                >
                  Ask AI
                </button>
              </div>
            </div>
          )}

          {/* Settings */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('settings');
              setIsSettingsOpen(!isSettingsOpen);
            }}
          >
            <Settings size={17} />
          </button>
          {isSettingsOpen && (
            <div className="notification-dropdown" style={{ right: '0', width: '300px' }}>
              <div className="dropdown-header">
                <h3 className="dropdown-title">Settings</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="action-btn">
                  <X size={17} />
                </button>
              </div>
              <div className="notifications-list">
                <div className="notification-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings/profile')}>
                  <div className="notification-content">
                    <div className="notification-title">👤 Profile Settings</div>
                  </div>
                </div>
                <div className="notification-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings/account')}>
                  <div className="notification-content">
                    <div className="notification-title">🔐 Account & Security</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('search');
              setIsSearchOpen(!isSearchOpen);
              if (!isSearchOpen) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }
            }}
          >
            <Search size={17} />
          </button>
          {isSearchOpen && (
            <div className="notification-dropdown" style={{ right: '0', width: '500px' }}>
              <div className="dropdown-header">
                <div style={{ flex: 1 }}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search boards, tasks, people..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d0d4e4',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <button onClick={() => setIsSearchOpen(false)} className="action-btn">
                  <X size={17} />
                </button>
              </div>
              <div className="notifications-list">
                {searchResults.length === 0 ? (
                  <div className="empty-state">
                    <Search size={48} className="empty-icon" />
                    <div className="empty-subtitle">
                      {searchQuery ? 'No results found' : 'Start typing to search'}
                    </div>
                  </div>
                ) : (
                  searchResults.map(result => (
                    <div key={result.id} className="notification-item" style={{ cursor: 'pointer' }}>
                      <div className="notification-content">
                        <div className="notification-title">{result.title}</div>
                        <div className="notification-message">{result.subtitle}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Help */}
          <div className="nav-icon-wrapper">
            <button
              className="nav-btn"
              onClick={() => {
                closeAllDropdowns('help');
                setIsHelpOpen(!isHelpOpen);
              }}
            >
              <HelpCircle size={17} />
            </button>
            <div className="badge-orange"></div>
            {isHelpOpen && (
              <div className="notification-dropdown" style={{ right: '0', width: '317px' }}>
                <div className="dropdown-header">
                  <h3 className="dropdown-title">Help & Support</h3>
                  <button onClick={() => setIsHelpOpen(false)} className="action-btn">
                    <X size={17} />
                  </button>
                </div>
                <div className="notifications-list">
                  <div className="notification-item" style={{ cursor: 'pointer' }}>
                    <div className="notification-content">
                      <div className="notification-title">📚 Help Center</div>
                      <div className="notification-message">Browse articles and tutorials</div>
                    </div>
                  </div>
                  <div className="notification-item" style={{ cursor: 'pointer' }}>
                    <div className="notification-content">
                      <div className="notification-title">🎥 Video Tutorials</div>
                      <div className="notification-message">Watch how-to videos</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="navbar-divider"></div>

          {/* Favorites */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('favorites');
              setIsFavoritesOpen(!isFavoritesOpen);
            }}
          >
            <Heart size={17} />
          </button>
          {isFavoritesOpen && (
            <div className="notification-dropdown" style={{ right: '0', width: '300px' }}>
              <div className="dropdown-header">
                <h3 className="dropdown-title">Favorites</h3>
                <button onClick={() => setIsFavoritesOpen(false)} className="action-btn">
                  <X size={17} />
                </button>
              </div>
              <div className="notifications-list">
                {favorites.length === 0 ? (
                  <div className="empty-state">
                    <Heart size={48} className="empty-icon" />
                    <div className="empty-subtitle">No favorites yet</div>
                  </div>
                ) : (
                  favorites.map(fav => (
                    <div key={fav.id} className="notification-item" style={{ cursor: 'pointer' }}>
                      <div className="notification-content">
                        <div className="notification-title">{fav.icon} {fav.name}</div>
                        <div className="notification-message">{fav.type}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Apps Launcher */}
          <button
            className="nav-btn"
            onClick={() => {
              closeAllDropdowns('appsLauncher');
              setIsAppsLauncherOpen(!isAppsLauncherOpen);
            }}
          >
            <Grid size={17} />
          </button>
          {isAppsLauncherOpen && (
            <div className="notification-dropdown" style={{ right: '0', width: '300px' }}>
              <div className="dropdown-header">
                <h3 className="dropdown-title">Apps</h3>
                <button onClick={() => setIsAppsLauncherOpen(false)} className="action-btn">
                  <X size={17} />
                </button>
              </div>
              <div style={{ padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/work-management')}>
                  <div style={{ fontSize: '32px', marginBottom: '5px' }}>📊</div>
                  <div style={{ fontSize: '12px', color: '#323338' }}>Work Management</div>
                </div>
                <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/crm')}>
                  <div style={{ fontSize: '32px', marginBottom: '5px' }}>👥</div>
                  <div style={{ fontSize: '12px', color: '#323338' }}>CRM</div>
                </div>
                <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/projects')}>
                  <div style={{ fontSize: '32px', marginBottom: '5px' }}>🎯</div>
                  <div style={{ fontSize: '12px', color: '#323338' }}>Projects</div>
                </div>
              </div>
            </div>
          )}

          {/* User Profile */}
          <button
            className="nav-btn avatar-btn"
            onClick={() => {
              closeAllDropdowns('profile');
              setIsProfileOpen(!isProfileOpen);
            }}
          >
            <div className="avatar-container">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#007F9B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {userInfo.initials || 'U'}
              </div>
              <div className="avatar-badge">
                <img
                  src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
                  alt="Company"
                  className="avatar-badge-img"
                />
              </div>
            </div>
          </button>
          {isProfileOpen && (
            <div className="notification-dropdown" style={{ right: '0', width: '280px' }}>
              <div style={{ padding: '15px', borderBottom: '1px solid #e6e9ef' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0073ea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '18px'
                  }}>
                    {userInfo.initials || 'U'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#323338' }}>
                      {userInfo.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#676879' }}>
                      {userInfo.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="notifications-list">
                <div className="notification-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                  <User size={16} style={{ marginRight: '10px' }} />
                  <div className="notification-content">
                    <div className="notification-title">My Profile</div>
                  </div>
                </div>
                <div className="notification-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')}>
                  <Settings size={16} style={{ marginRight: '10px' }} />
                  <div className="notification-content">
                    <div className="notification-title">Settings</div>
                  </div>
                </div>
                <div className="notification-item" style={{ cursor: 'pointer', color: '#e44258' }} onClick={handleLogout}>
                  <LogOut size={16} style={{ marginRight: '10px' }} />
                  <div className="notification-content">
                    <div className="notification-title" style={{ color: '#e44258' }}>Logout</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* ======================================================= */}
      {/* RENDER MODALS                                            */}
      {/* ======================================================= */}

      {/* 1. Apps / Integrations Modal */}
      <IntegrationsModal
        isOpen={isIntegrationsModalOpen}
        onClose={() => setIsIntegrationsModalOpen(false)}
      />

      {/* 2. Invite Members Modal */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        userInfo={userInfo}
        onInviteSent={() => {
          // Optional: Logic to show a toast message or refresh data
        }}
      />

      {/* 3. Inbox / Update Feed Modal */}
      <UpdateFeedModal
        isOpen={isUpdateFeedOpen}
        onClose={() => setIsUpdateFeedOpen(false)}
      />
    </>
  );
};

export default MondayCRMNavbar;