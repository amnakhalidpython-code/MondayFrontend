import React, { useState, useEffect } from 'react';
import { Bell, Inbox, UserPlus, Puzzle, Bot, Settings, Search, HelpCircle, Grid, X, Trash2, Check, RefreshCw, Heart, Gem } from 'lucide-react';
import notificationService from '../../services/notificationService';
import './MondayCRMNavbar.css';

const MondayCRMNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await notificationService.getNotifications(50, 0);
      
      if (response.success) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError('Failed to load notifications');
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    setNotifications([
      {
        _id: '1',
        type: 'new_lead',
        title: 'New Lead Assigned',
        message: 'Ali has been assigned to you',
        link: '/leads/123',
        isRead: false,
        priority: 'high',
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        type: 'deal_won',
        title: 'Deal Won! 🎉',
        message: 'ABC Company deal closed - PKR 500,000',
        link: '/deals/456',
        isRead: false,
        priority: 'high',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      },
    ]);
    setUnreadCount(2);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read:', err);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
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
      const notification = notifications.find(n => n._id === notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      if (!notification?.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id);
    }
    if (notification.link) {
      window.location.href = notification.link;
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
      task_due_soon: '#ff6900',
      task_overdue: '#e44258',
      mention: '#0086c0',
      comment: '#0086c0'
    };
    
    return colors[type] || '#676879';
  };

  return (
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
        <div className="nav-icon-wrapper">
          <div className="notification-bell-wrapper">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`nav-btn ${isOpen ? 'active' : ''}`}
            >
              <Bell size={20} />
            </button>
            
            {unreadCount > 0 && (
              <span className="badge-unread">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>

          {isOpen && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <div>
                  <h3 className="dropdown-title">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="unread-count">{unreadCount} unread</span>
                  )}
                </div>
                
                <div className="dropdown-actions">
                  <button
                    onClick={fetchNotifications}
                    disabled={loading}
                    title="Refresh"
                    className="action-btn"
                  >
                    <RefreshCw size={16} className={loading ? 'spin' : ''} />
                  </button>
                  
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      title="Mark all as read"
                      className="action-btn mark-read-btn"
                    >
                      <Check size={14} />
                      Mark all read
                    </button>
                  )}
                  
                  <button onClick={() => setIsOpen(false)} className="action-btn">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="notifications-list">
                {error && (
                  <div className="error-message">{error}</div>
                )}
                
                {loading && notifications.length === 0 ? (
                  <div className="empty-state">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="empty-state">
                    <Bell size={48} className="empty-icon" />
                    <div className="empty-title">No notifications yet</div>
                    <div className="empty-subtitle">
                      We'll notify you when something new comes up
                    </div>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification._id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    >
                      <div 
                        className="notification-indicator"
                        style={{ backgroundColor: getNotificationColor(notification.type, notification.priority) }}
                      />

                      <div
                        className="notification-content"
                        onClick={() => handleNotificationClick(notification)}
                      >
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
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="nav-icon-wrapper">
          <button className="nav-btn">
            <Inbox size={20} />
          </button>
          <span className="badge-static">1</span>
        </div>

        <button className="nav-btn">
          <UserPlus size={20} />
        </button>

        <button className="nav-btn">
          <Puzzle size={20} />
        </button>

        <button className="nav-btn">
          <Bot size={20} />
        </button>

        <button className="nav-btn">
          <Settings size={20} />
        </button>

        <button className="nav-btn">
          <Search size={20} />
        </button>

        <div className="nav-icon-wrapper">
          <button className="nav-btn">
            <HelpCircle size={20} />
          </button>
          <div className="badge-orange"></div>
        </div>

        <div className="navbar-divider"></div>

        <button className="nav-btn">
          <Heart size={20} />
        </button>

        <button className="nav-btn">
          <Grid size={20} />
        </button>

        <button className="nav-btn avatar-btn">
          <div className="avatar-container">
            <img 
              src="https://cdn1.monday.com/dapulse_default_photo.png"
              alt="User"
              className="avatar-img"
            />
            <div className="avatar-badge">
              <img
                src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
                alt="Company"
                className="avatar-badge-img"
              />
            </div>
          </div>
        </button>
      </nav>
    </header>
  );
};

export default MondayCRMNavbar;