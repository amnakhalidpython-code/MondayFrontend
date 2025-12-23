// BoardPage.jsx - Updated with Tailwind UI
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  Plus, 
  User, 
  Info,
  MessageSquare,
  Star,
  MoreHorizontal,
  CheckCircle2,
} from 'lucide-react';
import ActionBar from '../components/board/components/ActionBar';
import BoardHeader from '../components/board/components/BoardHeader'; 

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
    <div className="min-h-screen bg-white flex flex-col">
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
      <div className="p-6 flex-1 overflow-y-auto bg-white">
        {(searchQuery ? filteredGroups : groups).map(group => (
          <div key={group.id} className="mb-6">
            {/* GROUP HEADER */}
            <div 
              className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => toggleGroup(group.id)}
            >
              <button className="text-gray-500 hover:text-gray-700">
                {group.expanded ? (
                  <ChevronDown size={18} style={{ color: group.color }} />
                ) : (
                  <ChevronRight size={18} style={{ color: group.color }} />
                )}
              </button>
              <div className="w-1 h-5 rounded" style={{ backgroundColor: group.color }}></div>
              <h3 className="text-base font-medium text-gray-800" style={{ color: group.color }}>
                {group.name}
              </h3>
              <span className="text-sm text-gray-500">
                {group.tasks.length === 0 ? 'No Tasks' : `${group.tasks.length} ${group.tasks.length === 1 ? 'Task' : 'Tasks'}`}
              </span>
            </div>

            {group.expanded && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {/* TABLE HEADER */}
                <div className="grid grid-cols-[40px_240px_140px_140px_140px_120px_40px] bg-gray-50 border-b border-gray-200 text-xs min-h-[36px]">
                  <div className="p-3 flex items-center justify-center border-r border-gray-200">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>
                  <div className="p-3 flex items-center gap-2 border-r border-gray-200 font-medium text-gray-600">
                    <span>Task</span>
                  </div>
                  {!hiddenColumns.includes('owner') && (
                    <div className="p-3 flex items-center gap-2 border-r border-gray-200 font-medium text-gray-600">
                      <User size={14} />
                      <span>Owner</span>
                    </div>
                  )}
                  {!hiddenColumns.includes('status') && (
                    <div className="p-9 flex items-center gap-2 border-r border-gray-200 font-medium text-gray-600">
                      <span>Status</span>
                      <Info size={12} className="text-gray-400" />
                    </div>
                  )}
                  {!hiddenColumns.includes('dueDate') && (
                    <div className="p-3 flex items-center gap-2 border-r border-gray-200 font-medium text-gray-600">
                      <span>Due date</span>
                      <Info size={12} className="text-gray-400" />
                    </div>
                  )}
                  {!hiddenColumns.includes('numbers') && (
                    <div className="p-3 flex items-center gap-2 border-r border-gray-200 font-medium text-gray-600">
                      <span>Numbers</span>
                    </div>
                  )}
                  <div className="p-3 flex items-center justify-center">
                    <Plus size={14} className="text-gray-400" />
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
                  <div className="grid grid-cols-[40px_240px_140px_140px_140px_120px_40px] border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="p-3 border-r border-gray-100"></div>
                    <div className="p-3 border-r border-gray-100">
                      <input
                        type="text"
                        value={newTaskInput.value}
                        onChange={(e) => setNewTaskInput({ ...newTaskInput, value: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveTask(group.id);
                          if (e.key === 'Escape') setNewTaskInput({ groupId: null, value: '' });
                        }}
                        onBlur={() => saveTask(group.id)}
                        className="w-full text-sm text-gray-800 outline-none border-none"
                        placeholder="Task name"
                        autoFocus
                      />
                    </div>
                    {!hiddenColumns.includes('owner') && <div className="p-3 border-r border-gray-100"></div>}
                    {!hiddenColumns.includes('status') && <div className="p-3 border-r border-gray-100"></div>}
                    {!hiddenColumns.includes('dueDate') && <div className="p-3 border-r border-gray-100"></div>}
                    {!hiddenColumns.includes('numbers') && <div className="p-3 border-r border-gray-100"></div>}
                    <div className="p-3"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-[40px_240px_140px_140px_140px_120px_40px] border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="p-3 border-r border-gray-100"></div>
                    <div className="p-3 border-r border-gray-100">
                      <button 
                        onClick={() => startAddTask(group.id)}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
                      >
                        <Plus size={14} />
                        <span>Add task</span>
                      </button>
                    </div>
                    <div className="p-3 border-r border-gray-100"></div>
                    <div className="p-3 border-r border-gray-100"></div>
                    <div className="p-3 border-r border-gray-100"></div>
                    <div className="p-3 border-r border-gray-100"></div>
                    <div className="p-3"></div>
                  </div>
                )}

                {/* SUMMARY ROW */}
                {group.tasks.length > 0 && (
                  <div className="grid grid-cols-[40px_240px_140px_140px_140px_120px_40px] bg-gray-50">
                    <div className="p-3 border-r border-gray-200"></div>
                    <div className="p-3 border-r border-gray-200"></div>
                    {!hiddenColumns.includes('owner') && <div className="p-3 border-r border-gray-200"></div>}
                    {!hiddenColumns.includes('status') && (
                      <div className="p-2 border-r border-gray-200">
                        <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                          {getStatusSummary(group.tasks).done > 0 && (
                            <div style={{ width: `${getStatusSummary(group.tasks).done}%`, backgroundColor: '#00C875' }}></div>
                          )}
                          {getStatusSummary(group.tasks).working > 0 && (
                            <div style={{ width: `${getStatusSummary(group.tasks).working}%`, backgroundColor: '#FDAB3D' }}></div>
                          )}
                          {getStatusSummary(group.tasks).stuck > 0 && (
                            <div style={{ width: `${getStatusSummary(group.tasks).stuck}%`, backgroundColor: '#E44258' }}></div>
                          )}
                        </div>
                      </div>
                    )}
                    {!hiddenColumns.includes('dueDate') && (
                      <div className="p-3 border-r border-gray-200">
                        {getDateRange(group.tasks) !== '-' && (
                          <div className="inline-flex px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                            {getDateRange(group.tasks)}
                          </div>
                        )}
                      </div>
                    )}
                    {!hiddenColumns.includes('numbers') && (
                      <div className="p-3 border-r border-gray-200 text-right">
                        <div className="text-sm font-semibold text-gray-800">0</div>
                        <div className="text-xs text-gray-500">sum</div>
                      </div>
                    )}
                    <div className="p-3"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="mt-4">
          <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Plus size={16} />
            Add new group
          </button>
        </div>
      </div>
    </div>
  );
};

// TASK ROW COMPONENT
const TaskRow = ({ task, groupId, groupColor, statusConfig, updateTaskStatus, hiddenColumns = [] }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="grid grid-cols-[40px_240px_140px_140px_140px_120px_40px] border-b border-gray-100 hover:bg-gray-50 transition-colors relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-3 flex items-center justify-center border-r border-gray-100 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ backgroundColor: groupColor }}></div>
        <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer" />
      </div>

      <div className="p-3 flex items-center gap-2 border-r border-gray-100">
        <ChevronRight size={16} className="text-gray-500" />
        <span className="text-sm text-gray-800">{task.name}</span>
        {showActions && (
          <div className="ml-auto flex items-center gap-1">
            <button className="p-1 hover:bg-white rounded border border-gray-200">
              <Star size={14} className="text-gray-400" />
            </button>
            <button className="p-1 hover:bg-white rounded border border-gray-200">
              <MessageSquare size={14} className="text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {!hiddenColumns.includes('owner') && (
        <div className="p-3 flex items-center border-r border-gray-100">
          {task.owner ? (
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ backgroundColor: task.owner.color }}
            >
              {task.owner.initial}
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors">
              <User size={14} />
            </div>
          )}
        </div>
      )}

      {!hiddenColumns.includes('status') && (
        <div className="p-2 flex items-center border-r border-gray-100">
          <StatusCell 
            currentStatus={task.status}
            statusConfig={statusConfig}
            onChange={(newStatus) => updateTaskStatus(groupId, task.id, newStatus)}
          />
        </div>
      )}

      {!hiddenColumns.includes('dueDate') && (
        <div className="p-3 flex items-center gap-2 border-r border-gray-100">
          {task.dueDate ? (
            <>
              {task.overdue && task.status !== 'done' && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              )}
              <span className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {task.dueDate}
              </span>
              {task.status === 'done' && <CheckCircle2 size={14} className="text-green-500" />}
            </>
          ) : (
            <span className="text-sm text-gray-400">-</span>
          )}
        </div>
      )}

      {!hiddenColumns.includes('numbers') && (
        <div className="p-3 flex items-center border-r border-gray-100">
          <span className="text-sm text-gray-600">{task.numbers || '-'}</span>
        </div>
      )}

      <div className="p-3 flex items-center justify-center">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

// STATUS CELL COMPONENT
const StatusCell = ({ currentStatus, statusConfig, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!currentStatus) {
    return (
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 px-3 rounded text-xs font-medium bg-gray-300 text-gray-600 hover:opacity-90 transition-all"
        >
          -
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
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
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-3 rounded text-xs font-medium text-white hover:opacity-90 transition-all"
        style={{ backgroundColor: config.bg }}
      >
        {config.label}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
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
  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[180px]">
    {Object.entries(statusConfig).map(([key, config]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
      >
        <div className="w-6 h-6 rounded" style={{ backgroundColor: config.bg }}></div>
        <span className="text-gray-700">{config.label}</span>
      </button>
    ))}
  </div>
);

export default BoardPage;