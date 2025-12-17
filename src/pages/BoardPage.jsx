// BoardPage.jsx - EXACT Monday.com Board UI from HTML
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  ChevronUp,
  Plus, 
  Search, 
  User, 
  Filter, 
  MoreHorizontal,
  Info,
  MessageSquare,
  Star,
  Bell,
  Link2,
  ArrowUpDown,
  Eye,
  Grid3x3,
  Sparkles,
  Shuffle,
  Clock
} from 'lucide-react';
import './BoardPage.css';

const BoardPage = () => {
  const [groups, setGroups] = useState([
    {
      id: 'todo',
      name: 'To-Do',
      color: '#579BFC',
      expanded: true,
      tasks: [
        {
          id: '1',
          name: 'work1',
          owner: { initial: 'A', color: '#e91e63', name: 'aman' },
          status: 'working',
          dueDate: 'Dec 15',
          overdue: true,
          numbers: ''
        },
        {
          id: '2',
          name: 'work2',
          owner: null,
          status: 'done',
          dueDate: 'Dec 16',
          overdue: false,
          numbers: ''
        },
        {
          id: '3',
          name: 'work3',
          owner: null,
          status: 'stuck',
          dueDate: 'Dec 17',
          overdue: false,
          numbers: ''
        }
      ]
    },
    {
      id: 'completed',
      name: 'Completed',
      color: '#00C875',
      expanded: true,
      tasks: []
    }
  ]);

  const [newTaskInput, setNewTaskInput] = useState({ groupId: null, value: '' });

  const statusConfig = {
    working: { label: 'Working on it', bg: '#FDAB3D' },
    done: { label: 'Done', bg: '#00C875' },
    stuck: { label: 'Stuck', bg: '#DF2F4A' }
  };

  const toggleGroup = (groupId) => {
    setGroups(groups.map(g => 
      g.id === groupId ? { ...g, expanded: !g.expanded } : g
    ));
  };

  const startAddTask = (groupId) => {
    setNewTaskInput({ groupId, value: '' });
  };

  const saveTask = (groupId) => {
    if (!newTaskInput.value.trim()) {
      setNewTaskInput({ groupId: null, value: '' });
      return;
    }

    setGroups(groups.map(g => 
      g.id === groupId 
        ? { 
            ...g, 
            tasks: [...g.tasks, {
              id: Date.now().toString(),
              name: newTaskInput.value,
              owner: null,
              status: null,
              dueDate: '',
              overdue: false,
              numbers: ''
            }]
          }
        : g
    ));

    setNewTaskInput({ groupId: null, value: '' });
  };

  const updateTaskStatus = (groupId, taskId, newStatus) => {
    setGroups(groups.map(g => 
      g.id === groupId
        ? {
            ...g,
            tasks: g.tasks.map(t => 
              t.id === taskId ? { ...t, status: newStatus } : t
            )
          }
        : g
    ));
  };

  const getStatusSummary = (tasks) => {
    const total = tasks.length;
    if (total === 0) return { done: 0, working: 0, stuck: 0 };

    const counts = { done: 0, working: 0, stuck: 0 };
    tasks.forEach(t => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });

    return {
      done: (counts.done / total) * 100,
      working: (counts.working / total) * 100,
      stuck: (counts.stuck / total) * 100
    };
  };

  const getDateRange = (tasks) => {
    const dates = tasks.filter(t => t.dueDate).map(t => t.dueDate);
    if (dates.length === 0) return '-';
    if (dates.length === 1) return dates[0];
    return `${dates[0]} - ${dates[dates.length - 1]}`;
  };

  return (
    <div className="board-page">
      {/* TOP HEADER */}
      <header className="board-header">
        <div className="header-left">
          <button className="board-title-btn">
            <h2 className="board-title">work</h2>
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

      {/* TABS SECTION */}
      <div className="board-tabs">
        <button className="tab active">Main table</button>
        <button className="tab-icon-btn">
          <MoreHorizontal size={16} />
        </button>
        <button className="tab-icon-btn">
          <Plus size={16} />
        </button>
      </div>

      {/* ACTION BAR */}
      <div className="action-bar">
        <div className="action-bar-left">
          <button className="new-task-btn">
            New task
            <ChevronDown size={16} />
          </button>

          <div className="action-divider"></div>

          <button className="action-btn">
            <Search size={18} />
            <span>Search</span>
          </button>
          <button className="action-btn">
            <User size={18} />
            <span>Person</span>
          </button>
          <button className="action-btn">
            <Filter size={18} />
            <span>Filter</span>
            <ChevronDown size={14} />
          </button>
          <button className="action-btn">
            <ArrowUpDown size={18} />
            <span>Sort</span>
          </button>
          <button className="action-btn">
            <Eye size={18} />
            <span>Hide</span>
          </button>
          <button className="action-btn">
            <Grid3x3 size={18} />
            <span>Group by</span>
          </button>
          <button className="action-icon-btn">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <button className="collapse-btn">
          <ChevronUp size={18} />
        </button>
      </div>

      {/* BOARD CONTENT */}
      <div className="board-content">
        {groups.map(group => (
          <div key={group.id} className="board-group">
            {/* GROUP HEADER */}
            <div className="group-header-row">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="group-toggle"
              >
                {group.expanded ? (
                  <ChevronDown size={16} style={{ color: group.color }} />
                ) : (
                  <ChevronRight size={16} style={{ color: group.color }} />
                )}
              </button>
              <h3 className="group-title" style={{ color: group.color }}>
                {group.name}
              </h3>
              <span className="group-count">
                {group.tasks.length === 0 ? 'No Tasks' : `${group.tasks.length} Tasks`}
              </span>
            </div>

            {group.expanded && (
              <div className="group-content" style={{ borderLeftColor: group.color }}>
                <div className="board-table">
                  {/* TABLE HEADER */}
                  <div className="table-header">
                    <div className="table-cell cell-checkbox"></div>
                    <div className="table-cell cell-task">Task</div>
                    <div className="table-cell cell-owner">Owner</div>
                    <div className="table-cell cell-status">
                      Status
                      <Info size={14} className="info-icon" />
                    </div>
                    <div className="table-cell cell-date">
                      Due date
                      <Info size={14} className="info-icon" />
                    </div>
                    <div className="table-cell cell-numbers">Numbers</div>
                    <div className="table-cell cell-add">
                      <Plus size={16} />
                    </div>
                  </div>

                  {/* TABLE ROWS */}
                  {group.tasks.map(task => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      groupId={group.id}
                      groupColor={group.color}
                      statusConfig={statusConfig}
                      updateTaskStatus={updateTaskStatus}
                    />
                  ))}

                  {/* ADD TASK ROW */}
                  {newTaskInput.groupId === group.id ? (
                    <div className="table-row add-row">
                      <div className="table-cell cell-checkbox"></div>
                      <div className="table-cell cell-task">
                        <input
                          type="text"
                          value={newTaskInput.value}
                          onChange={(e) => setNewTaskInput({ ...newTaskInput, value: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTask(group.id);
                            if (e.key === 'Escape') setNewTaskInput({ groupId: null, value: '' });
                          }}
                          onBlur={() => saveTask(group.id)}
                          className="add-task-input"
                          placeholder="Task name"
                          autoFocus
                        />
                      </div>
                      <div className="table-cell cell-owner"></div>
                      <div className="table-cell cell-status"></div>
                      <div className="table-cell cell-date"></div>
                      <div className="table-cell cell-numbers"></div>
                      <div className="table-cell cell-add"></div>
                    </div>
                  ) : (
                    <div className="table-row add-row-btn">
                      <div className="table-cell cell-checkbox"></div>
                      <div className="table-cell cell-task">
                        <button 
                          onClick={() => startAddTask(group.id)}
                          className="add-task-btn"
                        >
                          <Plus size={14} />
                          Add task
                        </button>
                      </div>
                      <div className="table-cell cell-owner"></div>
                      <div className="table-cell cell-status"></div>
                      <div className="table-cell cell-date"></div>
                      <div className="table-cell cell-numbers"></div>
                      <div className="table-cell cell-add"></div>
                    </div>
                  )}

                  {/* SUMMARY ROW */}
                  {group.tasks.length > 0 && (
                    <div className="table-row summary-row">
                      <div className="table-cell cell-checkbox"></div>
                      <div className="table-cell cell-task"></div>
                      <div className="table-cell cell-owner"></div>
                      <div className="table-cell cell-status">
                        <StatusBar summary={getStatusSummary(group.tasks)} statusConfig={statusConfig} />
                      </div>
                      <div className="table-cell cell-date">
                        <div className="date-range-pill">
                          {getDateRange(group.tasks)}
                        </div>
                      </div>
                      <div className="table-cell cell-numbers">
                        <div className="numbers-sum">
                          <span className="sum-value">0</span>
                          <span className="sum-label">sum</span>
                        </div>
                      </div>
                      <div className="table-cell cell-add"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="add-group-section">
          <button className="add-group-btn">
            <Plus size={20} />
            Add new group
          </button>
        </div>
      </div>

      {/* HELP BUTTON */}
      <button className="help-btn">Help</button>
    </div>
  );
};

// TASK ROW COMPONENT
const TaskRow = ({ task, groupId, groupColor, statusConfig, updateTaskStatus }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="table-row task-row"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="table-cell cell-checkbox">
        <div className="left-indicator" style={{ backgroundColor: groupColor }}></div>
        <input type="checkbox" className="task-checkbox" />
      </div>

      <div className="table-cell cell-task">
        <button className="expand-btn">
          <ChevronRight size={16} />
        </button>
        <span className="task-name">{task.name}</span>
        {showActions && (
          <div className="task-actions">
            <button className="task-action-btn">
              <Star size={16} />
            </button>
            <button className="task-action-btn">
              <MessageSquare size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="table-cell cell-owner">
        {task.owner ? (
          <div 
            className="owner-avatar"
            style={{ backgroundColor: task.owner.color }}
          >
            {task.owner.initial}
          </div>
        ) : (
          <button className="add-owner-btn">
            <User size={16} />
          </button>
        )}
      </div>

      <div className="table-cell cell-status">
        <StatusCell 
          currentStatus={task.status}
          statusConfig={statusConfig}
          onChange={(newStatus) => updateTaskStatus(groupId, task.id, newStatus)}
        />
      </div>

      <div className="table-cell cell-date">
        {task.dueDate ? (
          <div className="date-cell">
            {task.overdue && <div className="overdue-dot"></div>}
            <span>{task.dueDate}</span>
          </div>
        ) : (
          <span className="empty-date">-</span>
        )}
      </div>

      <div className="table-cell cell-numbers">
        {task.numbers || ''}
      </div>

      <div className="table-cell cell-add"></div>
    </div>
  );
};

// STATUS CELL COMPONENT
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

// STATUS BAR
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

export default BoardPage;
