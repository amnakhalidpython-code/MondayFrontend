// src/pages/TemplateBoardPage.jsx - Updated with Tailwind UI (Header & ActionBar unchanged)
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
import { getTemplateById } from '../config/boardTemplates';

const TemplateBoardPage = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [groups, setGroups] = useState([]);
  const [boardColumns, setBoardColumns] = useState([]);
  const [statusConfig, setStatusConfig] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentGroupBy, setCurrentGroupBy] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState({ groupId: null, value: '' });

  useEffect(() => {
    if (templateId) {
      const templateData = getTemplateById(templateId);
      if (templateData) {
        setTemplate(templateData);
        setGroups(templateData.groups);
        setBoardColumns(templateData.columns);
        setStatusConfig(templateData.statusConfig);
      }
    }
  }, [templateId]);

  const handleSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredGroups(groups);
      return;
    }
    const filtered = groups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task => 
        task.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.tasks.length > 0);
    setFilteredGroups(filtered);
  }, [searchQuery, groups]);

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

  const handleHideColumns = (columnId) => {
    setHiddenColumns(prev => {
      if (prev.includes(columnId)) {
        return prev.filter(id => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };

  const handleGroupBy = (columnId) => {
    setCurrentGroupBy(columnId);
    if (!columnId) return;
    
    const allTasks = groups.flatMap(g => g.tasks);
    const grouped = {};
    
    allTasks.forEach(task => {
      let groupKey = task[columnId];
      if (columnId === 'owner') {
        groupKey = task.owner?.name || 'Unassigned';
      } else if (columnId === 'status') {
        groupKey = statusConfig[task.status]?.label || task.status;
      }
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(task);
    });
    
    const newGroups = Object.entries(grouped).map(([key, tasks], index) => ({
      id: `group-${index}`,
      name: key,
      color: template?.groups[0]?.color || '#579BFC',
      expanded: true,
      tasks
    }));
    setGroups(newGroups);
  };

  const handleAddTask = () => {
    const firstGroup = groups[0];
    if (firstGroup) {
      setNewTaskInput({ groupId: firstGroup.id, value: '' });
    }
  };

  const toggleGroup = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, expanded: !g.expanded } : g));
  };

  const startAddTask = (groupId) => setNewTaskInput({ groupId, value: '' });

  const saveTask = (groupId) => {
    if (!newTaskInput.value.trim()) {
      setNewTaskInput({ groupId: null, value: '' });
      return;
    }
    setGroups(groups.map(g => 
      g.id === groupId ? { 
        ...g, 
        tasks: [...g.tasks, {
          id: Date.now().toString(),
          name: newTaskInput.value,
          owner: null,
          status: null,
          dueDate: '',
          overdue: false,
          grantAmount: 0,
          grantProvider: ''
        }]
      } : g
    ));
    setNewTaskInput({ groupId: null, value: '' });
  };

  const updateTaskStatus = (groupId, taskId, newStatus) => {
    setGroups(groups.map(g => 
      g.id === groupId ? {
        ...g,
        tasks: g.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
      } : g
    ));
  };

  const getStatusSummary = (tasks) => {
    const total = tasks.length || 1;
    const counts = {};
    Object.keys(statusConfig).forEach(key => counts[key] = 0);
    tasks.forEach(t => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });
    const result = {};
    Object.keys(statusConfig).forEach(key => {
      result[key] = (counts[key] / total) * 100;
    });
    return result;
  };

  const getTotalGrantAmount = (tasks) => {
    return tasks.reduce((sum, task) => sum + (task.grantAmount || 0), 0);
  };

  const addNewGroup = () => {
    const newGroup = {
      id: `group-${Date.now()}`,
      name: 'New Group',
      color: template?.groups[0]?.color || '#579BFC',
      expanded: true,
      tasks: []
    };
    setGroups([...groups, newGroup]);
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BoardHeader boardTitle={template.title} />
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
        newItemText={template.newItemText}
      />

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
                {group.tasks.length === 0 ? 'No Items' : `${group.tasks.length} ${group.tasks.length === 1 ? 'Item' : 'Items'}`}
              </span>
            </div>

            {group.expanded && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {/* TABLE HEADER - Dynamic columns */}
                <div 
                  className="bg-gray-50 border-b border-gray-200 text-xs min-h-[32px] "
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                      if (col.id === 'name') return '200px';
                      if (col.type === 'person') return '100px';
                      if (col.type === 'status') return '120px';
                      if (col.type === 'date') return '120px';
                      if (col.id === 'grantAmount') return '120px';
                      return '100px';
                    }).join(' ')} 32px`
                  }}
                >
                  <div className="p-2 flex items-center justify-center border-r border-gray-200">
                    <div className="w-3 h-3 border border-gray-300  rounded"></div>
                  </div>
                  {boardColumns.map(col => (
                    !hiddenColumns.includes(col.id) && (
                      <div key={col.id} className="p-2 flex items-center gap-1 border-r border-gray-200 font-medium text-gray-600">
                        {col.type === 'person' && <User size={12} />}
                        <span>{col.title}</span>
                        {col.type !== 'text' && <Info size={10} className="text-gray-400" />}
                      </div>
                    )
                  ))}
                  <div className="p-2 flex items-center justify-center ">
                    <Plus size={12} className="text-gray-400" />
                  </div>
                </div>

                {/* TABLE ROWS */}
                {group.tasks.map(task => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    groupId={group.id}
                    groupColor={group.color}
                    columns={boardColumns}
                    statusConfig={statusConfig}
                    updateTaskStatus={updateTaskStatus}
                    hiddenColumns={hiddenColumns}
                  />
                ))}

                {/* ADD TASK ROW */}
                {newTaskInput.groupId === group.id ? (
                  <div 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors "
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                        if (col.id === 'name') return '200px';
                        if (col.type === 'person') return '100px';
                        if (col.type === 'status') return '120px';
                        if (col.type === 'date') return '120px';
                        if (col.id === 'grantAmount') return '120px';
                        return '100px';
                      }).join(' ')} 32px`
                    }}
                  >
                    <div className="p-2 border-r border-gray-100 "></div>
                    <div className="p-2 border-r border-gray-100">
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
                        placeholder={template.addItemText || "Item name"}
                        autoFocus
                      />
                    </div>
                    {boardColumns.filter(col => !hiddenColumns.includes(col.id) && col.id !== 'name').map(col => (
                      <div key={col.id} className="p-2 border-r border-gray-100"></div>
                    ))}
                    <div className="p-2"></div>
                  </div>
                ) : (
                  <div 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors "
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                        if (col.id === 'name') return '200px';
                        if (col.type === 'person') return '100px';
                        if (col.type === 'status') return '120px';
                        if (col.type === 'date') return '120px';
                        if (col.id === 'grantAmount') return '120px';
                        return '100px';
                      }).join(' ')} 32px`
                    }}
                  >
                    <div className="p-2 border-r border-gray-100"></div>
                    <div className="p-2 border-r border-gray-100">
                      <button 
                        onClick={() => startAddTask(group.id)}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
                      >
                        <Plus size={12} />
                        <span>{template.addItemText || 'Add item'}</span>
                      </button>
                    </div>
                    {boardColumns.filter(col => !hiddenColumns.includes(col.id) && col.id !== 'name').map(col => (
                      <div key={col.id} className="p-2 border-r border-gray-100"></div>
                    ))}
                    <div className="p-2"></div>
                  </div>
                )}

                {/* SUMMARY ROW */}
                {group.tasks.length > 0 && (
                  <div 
                    className="bg-gray-50"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                        if (col.id === 'name') return '200px';
                        if (col.type === 'person') return '100px';
                        if (col.type === 'status') return '120px';
                        if (col.type === 'date') return '120px';
                        if (col.id === 'grantAmount') return '120px';
                        return '100px';
                      }).join(' ')} 32px`
                    }}
                  >
                    <div className="p-2 border-r border-gray-200"></div>
                    {boardColumns.map(col => {
                      if (hiddenColumns.includes(col.id)) return null;
                      
                      if (col.type === 'status') {
                        const summary = getStatusSummary(group.tasks);
                        return (
                          <div key={col.id} className="p-2 border-r border-gray-200">
                            <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                              {Object.entries(statusConfig).map(([key, config]) => (
                                summary[key] > 0 && (
                                  <div 
                                    key={key}
                                    style={{ 
                                      width: `${summary[key]}%`, 
                                      backgroundColor: config.bg 
                                    }}
                                  ></div>
                                )
                              ))}
                            </div>
                          </div>
                        );
                      }
                      
                      if (col.id === 'grantAmount') {
                        return (
                          <div key={col.id} className="p-2 border-r border-gray-200 text-right">
                            <div className="text-xs font-semibold text-gray-800">
                              ${getTotalGrantAmount(group.tasks).toLocaleString('en-US')}
                            </div>
                            <div className="text-[10px] text-gray-500">sum</div>
                          </div>
                        );
                      }
                      
                      return <div key={col.id} className="p-2 border-r border-gray-200"></div>;
                    })}
                    <div className="p-2"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="mt-4">
          <button 
            onClick={addNewGroup}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Add new group
          </button>
        </div>
      </div>
    </div>
  );
};

// TASK ROW COMPONENT
const TaskRow = ({ task, groupId, groupColor, columns, statusConfig, updateTaskStatus, hiddenColumns = [] }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors relative min-h-[40px]"
      style={{
        display: 'grid',
        gridTemplateColumns: `32px ${columns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
          if (col.id === 'name') return '200px';
          if (col.type === 'person') return '100px';
          if (col.type === 'status') return '120px';
          if (col.type === 'date') return '120px';
          if (col.id === 'grantAmount') return '120px';
          return '100px';
        }).join(' ')} 32px`
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-2 flex items-center justify-center border-r border-gray-100 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ backgroundColor: groupColor }}></div>
        <input type="checkbox" className="w-3 h-3 border-2 border-gray-300 rounded cursor-pointer" />
      </div>

      {columns.map(col => {
        if (hiddenColumns.includes(col.id)) return null;

        if (col.id === 'name') {
          return (
            <div key={col.id} className="p-2 flex items-center gap-2 border-r border-gray-100">
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-sm text-gray-800">{task.name}</span>
              {showActions && (
                <div className="ml-auto flex items-center gap-1">
                  <button className="p-1 hover:bg-white rounded border border-gray-200">
                    <Star size={12} className="text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-white rounded border border-gray-200">
                    <MessageSquare size={12} className="text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          );
        }

        if (col.type === 'person') {
          return (
            <div key={col.id} className="p-2 flex items-center border-r border-gray-100">
              {task.owner ? (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-semibold"
                  style={{ backgroundColor: task.owner.color }}
                >
                  {task.owner.initial}
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors">
                  <User size={12} />
                </div>
              )}
            </div>
          );
        }

        if (col.type === 'status') {
          return (
            <div key={col.id} className="p-2 flex items-center border-r border-gray-100">
              <StatusCell 
                currentStatus={task.status}
                statusConfig={statusConfig}
                onChange={(newStatus) => updateTaskStatus(groupId, task.id, newStatus)}
              />
            </div>
          );
        }

        if (col.type === 'date') {
          return (
            <div key={col.id} className="p-2 flex items-center gap-2 border-r border-gray-100">
              {task.dueDate ? (
                <>
                  {task.overdue && task.status !== 'done' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  )}
                  <span className={`text-xs ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {task.dueDate}
                  </span>
                  {task.status === 'done' && <CheckCircle2 size={12} className="text-green-500" />}
                </>
              ) : (
                <span className="text-xs text-gray-400">-</span>
              )}
            </div>
          );
        }

        if (col.id === 'grantAmount') {
          return (
            <div key={col.id} className="p-2 flex items-center border-r border-gray-100">
              <span className="text-xs text-gray-600">
                {task.grantAmount ? `$${task.grantAmount.toLocaleString('en-US')}` : '-'}
              </span>
            </div>
          );
        }

        return (
          <div key={col.id} className="p-2 flex items-center border-r border-gray-100">
            <span className="text-xs text-gray-600">{task[col.id] || '-'}</span>
          </div>
        );
      })}

      <div className="p-2 flex items-center justify-center">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={14} />
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

export default TemplateBoardPage;