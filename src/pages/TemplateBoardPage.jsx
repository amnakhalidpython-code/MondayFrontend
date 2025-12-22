import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MoreHorizontal, 
  Plus, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shuffle,
  Clock,
  MessageSquare,
  Link2,
  User
} from 'lucide-react';
import { getTemplateById } from '../config/boardTemplates';
import './TemplateBoardPage.css';

// ==========================================
// MAIN COMPONENT
// ==========================================
const TemplateBoardPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  
  const [template, setTemplate] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load template data
  useEffect(() => {
    const loadTemplate = () => {
      const templateData = getTemplateById(templateId);
      
      if (!templateData) {
        console.error('Template not found:', templateId);
        navigate('/dashboard');
        return;
      }

      setTemplate(templateData);
      setGroups(templateData.groups || []);
      setLoading(false);
    };

    loadTemplate();
  }, [templateId, navigate]);

  // Toggle group expansion
  const toggleGroup = (groupId) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, expanded: !group.expanded }
        : group
    ));
  };

  // Add new item to group
  const addItem = (groupId) => {
    const newItem = {
      id: `item-${Date.now()}`,
      name: template.newItemText || 'New Item',
      data: {}
    };

    setGroups(prev => prev.map(group =>
      group.id === groupId
        ? { ...group, tasks: [...(group.tasks || []), newItem] }
        : group
    ));
  };

  // Update item data
  const updateItemData = (groupId, itemId, field, value) => {
    setGroups(prev => prev.map(group =>
      group.id === groupId
        ? {
            ...group,
            tasks: group.tasks.map(task =>
              task.id === itemId
                ? { ...task, data: { ...task.data, [field]: value } }
                : task
            )
          }
        : group
    ));
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading template...
      </div>
    );
  }

  if (!template) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#e74c3c'
      }}>
        Template not found
      </div>
    );
  }

  return (
    <div className="board-page">
      {/* BOARD HEADER */}
      <BoardHeader boardTitle={template.title} />

      {/* BOARD TABS */}
      <div className="board-tabs">
        <button className="tab active">Main Table</button>
        <button className="tab-icon-btn">
          <MoreHorizontal size={16} />
        </button>
        <button className="tab-icon-btn">
          <Plus size={16} />
        </button>
      </div>

      {/* BOARD TABLE */}
      <div className="board-container">
        <div className="board-table">
          {/* TABLE HEADER */}
          <div className="table-header">
            <div className="header-cell group-header" style={{ width: '300px' }}>
              Group
            </div>
            {template.columns.map((col) => (
              <div 
                key={col.id} 
                className="header-cell"
                style={{ width: `${col.width}px` }}
              >
                {col.title}
              </div>
            ))}
          </div>

          {/* GROUPS */}
          {groups.map((group) => (
            <div key={group.id} className="group-section">
              {/* GROUP HEADER */}
              <div 
                className="group-header-row"
                style={{ borderLeft: `4px solid ${group.color}` }}
              >
                <button 
                  className="group-toggle"
                  onClick={() => toggleGroup(group.id)}
                >
                  {group.expanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                </button>
                <span className="group-name">{group.name}</span>
                <span className="group-count">
                  {group.tasks?.length || 0} Items
                </span>
              </div>

              {/* GROUP ITEMS */}
              {group.expanded && (
                <>
                  {group.tasks?.map((item) => (
                    <div key={item.id} className="table-row">
                      {/* ITEM NAME */}
                      <div className="table-cell" style={{ width: '300px' }}>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            setGroups(prev => prev.map(g =>
                              g.id === group.id
                                ? {
                                    ...g,
                                    tasks: g.tasks.map(t =>
                                      t.id === item.id
                                        ? { ...t, name: e.target.value }
                                        : t
                                    )
                                  }
                                : g
                            ));
                          }}
                          className="item-name-input"
                        />
                      </div>

                      {/* DYNAMIC COLUMNS */}
                      {template.columns.map((col) => (
                        <div 
                          key={col.id}
                          className="table-cell"
                          style={{ width: `${col.width}px` }}
                        >
                          <CellRenderer
                            type={col.type}
                            value={item.data?.[col.id]}
                            onChange={(value) => 
                              updateItemData(group.id, item.id, col.id, value)
                            }
                            statusConfig={template.statusConfig}
                          />
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* ADD NEW ITEM */}
                  <div className="table-row add-row">
                    <button 
                      className="add-item-btn"
                      onClick={() => addItem(group.id)}
                    >
                      <Plus size={16} />
                      <span>{template.addItemText || '+ Add item'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// BOARD HEADER COMPONENT
// ==========================================
const BoardHeader = ({ boardTitle }) => {
  return (
    <header className="board-header">
      <div className="header-left">
        <h2 className="board-title">{boardTitle}</h2>
      </div>

      <div className="header-actions">
        <button className="header-btn sidekick-btn">
          <Sparkles size={20} />
          <span>Sidekick</span>
        </button>

        <button className="header-btn">
          <Shuffle size={18} />
          <span>Integrate</span>
        </button>

        <button className="header-btn">
          <Clock size={20} />
          <span>Automate</span>
        </button>

        <button className="header-icon-btn">
          <MessageSquare size={20} />
        </button>

        <button className="header-icon-btn">
          <div className="user-avatar">A</div>
        </button>

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

// ==========================================
// CELL RENDERER - Different cell types
// ==========================================
const CellRenderer = ({ type, value, onChange, statusConfig }) => {
  switch (type) {
    case 'status':
      return (
        <StatusCell 
          currentStatus={value}
          statusConfig={statusConfig}
          onChange={onChange}
        />
      );
    
    case 'person':
      return (
        <PersonCell 
          value={value}
          onChange={onChange}
        />
      );
    
    case 'date':
      return (
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="date-input"
        />
      );
    
    case 'number':
      return (
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="number-input"
        />
      );
    
    case 'email':
      return (
        <input
          type="email"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="text-input"
          placeholder="email@example.com"
        />
      );
    
    case 'phone':
      return (
        <input
          type="tel"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="text-input"
          placeholder="+1234567890"
        />
      );
    
    case 'link':
      return (
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="text-input"
          placeholder="https://"
        />
      );
    
    case 'text':
    default:
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="text-input"
        />
      );
  }
};

// ==========================================
// STATUS CELL
// ==========================================
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
            <div 
              className="dropdown-overlay" 
              onClick={() => setIsOpen(false)}
            />
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
          <div 
            className="dropdown-overlay" 
            onClick={() => setIsOpen(false)}
          />
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

// ==========================================
// PERSON CELL
// ==========================================
const PersonCell = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="person-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="person-btn"
      >
        {value ? (
          <div className="person-avatar">{value.charAt(0).toUpperCase()}</div>
        ) : (
          <User size={16} style={{ color: '#999' }} />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="dropdown-overlay" 
            onClick={() => setIsOpen(false)}
          />
          <div className="person-menu">
            <input
              type="text"
              placeholder="Enter name..."
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="person-input"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateBoardPage;