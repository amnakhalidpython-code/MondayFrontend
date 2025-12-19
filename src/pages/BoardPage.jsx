// BoardPage.jsx - Updated with imported BoardHeader
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
 
} from 'lucide-react';
import './BoardPage.css';
import ActionBar from '../components/board/components/ActionBar';
import BoardHeader from '../components/board/components/BoardHeader'; // Import the separate component

const BoardPage = () => {
  const { boardId } = useParams();
  const [boardName, setBoardName] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentGroupBy, setCurrentGroupBy] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState([]);
  
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

  // Define board columns
  const boardColumns = [
    { id: 'name', title: 'Task', type: 'text' },
    { id: 'owner', title: 'Owner', type: 'person' },
    { id: 'status', title: 'Status', type: 'status' },
    { id: 'dueDate', title: 'Due Date', type: 'date' },
    { id: 'priority', title: 'Priority', type: 'priority' },
    { id: 'numbers', title: 'Numbers', type: 'number' }
  ];

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter groups based on search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredGroups(groups);
      return;
    }

    const filtered = groups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task => 
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.owner?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.tasks.length > 0);

    setFilteredGroups(filtered);
  }, [searchQuery, groups]);

  // Sort functionality
  const handleSort = (columnId, order) => {
    setCurrentSort({ column: columnId, order });
    
    const sortedGroups = groups.map(group => {
      const sortedTasks = [...group.tasks].sort((a, b) => {
        let aVal = a[columnId];
        let bVal = b[columnId];
        
        if (columnId === 'owner') {
          aVal = a.owner?.name || '';
          bVal = b.owner?.name || '';
        }
        
        if (order === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      
      return { ...group, tasks: sortedTasks };
    });
    
    setGroups(sortedGroups);
  };

  // Hide columns functionality
  const handleHideColumns = (columnId) => {
    setHiddenColumns(prev => {
      if (prev.includes(columnId)) {
        return prev.filter(id => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };

  // Group by functionality
  const handleGroupBy = (columnId) => {
    setCurrentGroupBy(columnId);
    
    if (!columnId) {
      return;
    }
    
    const allTasks = groups.flatMap(g => g.tasks);
    const grouped = {};
    
    allTasks.forEach(task => {
      let groupKey = task[columnId];
      if (columnId === 'owner') {
        groupKey = task.owner?.name || 'Unassigned';
      } else if (columnId === 'status') {
        groupKey = statusConfig[task.status]?.label || task.status;
      }
      
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(task);
    });
    
    const newGroups = Object.entries(grouped).map(([key, tasks], index) => ({
      id: `group-${index}`,
      name: key,
      color: '#579BFC',
      expanded: true,
      tasks
    }));
    
    setGroups(newGroups);
  };

  // Add new task
  const handleAddTask = () => {
    const firstGroup = groups[0];
    if (firstGroup) {
      setNewTaskInput({ groupId: firstGroup.id, value: '' });
    }
  };

  // Fetch board data from API
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://monday-clone-backend.vercel.app/api/boards/${boardId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch board');
        }
        
        const data = await response.json();
        
        if (data.success && data.board) {
          setBoardName(data.board.name || 'Untitled Board');
        } else {
          setBoardName('Untitled Board');
        }
        
      } catch (error) {
        console.error('Error fetching board:', error);
        setBoardName('Board');
      } finally {
        setLoading(false);
      }
    };

    if (boardId) {
      fetchBoardData();
    }
  }, [boardId]);

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
      {/* USE IMPORTED BOARD HEADER */}
      <BoardHeader boardTitle={boardName} />

      {/* ACTION BAR */}
      <ActionBar 
        columns={boardColumns}
        onSearch={handleSearch}
        onSort={handleSort}
        onHideColumns={handleHideColumns}
        onGroupBy={handleGroupBy}
        onAddTask={handleAddTask}
        hiddenColumns={hiddenColumns}
        currentSort={currentSort}
        currentGroupBy={currentGroupBy}
      />

      {/* BOARD CONTENT */}
      <div className="board-content">
        {(searchQuery ? filteredGroups : groups).map(group => (
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
                    {!hiddenColumns.includes('owner') && (
                      <div className="table-cell cell-owner">Owner</div>
                    )}
                    {!hiddenColumns.includes('status') && (
                      <div className="table-cell cell-status">
                        Status
                        <Info size={14} className="info-icon" />
                      </div>
                    )}
                    {!hiddenColumns.includes('dueDate') && (
                      <div className="table-cell cell-date">
                        Due date
                        <Info size={14} className="info-icon" />
                      </div>
                    )}
                    {!hiddenColumns.includes('numbers') && (
                      <div className="table-cell cell-numbers">Numbers</div>
                    )}
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
                      hiddenColumns={hiddenColumns}
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
                      {!hiddenColumns.includes('owner') && <div className="table-cell cell-owner"></div>}
                      {!hiddenColumns.includes('status') && <div className="table-cell cell-status"></div>}
                      {!hiddenColumns.includes('dueDate') && <div className="table-cell cell-date"></div>}
                      {!hiddenColumns.includes('numbers') && <div className="table-cell cell-numbers"></div>}
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
const TaskRow = ({ task, groupId, groupColor, statusConfig, updateTaskStatus, hiddenColumns = [] }) => {
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

      {!hiddenColumns.includes('owner') && (
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
      )}

      {!hiddenColumns.includes('status') && (
        <div className="table-cell cell-status">
          <StatusCell 
            currentStatus={task.status}
            statusConfig={statusConfig}
            onChange={(newStatus) => updateTaskStatus(groupId, task.id, newStatus)}
          />
        </div>
      )}

      {!hiddenColumns.includes('dueDate') && (
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
      )}

      {!hiddenColumns.includes('numbers') && (
        <div className="table-cell cell-numbers">
          {task.numbers || ''}
        </div>
      )}

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