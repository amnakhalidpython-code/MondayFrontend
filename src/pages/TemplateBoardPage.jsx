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
      <div style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', color: '#676879' }}>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
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

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', backgroundColor: '#fff' }}>
        {(searchQuery ? filteredGroups : groups).map(group => (
          <div key={group.id} style={{ marginBottom: '24px' }}>
            {/* GROUP HEADER */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'background-color 0.1s'
              }}
              onClick={() => toggleGroup(group.id)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f6f7fb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {group.expanded ? (
                  <ChevronDown size={16} style={{ color: group.color }} />
                ) : (
                  <ChevronRight size={16} style={{ color: group.color }} />
                )}
              </button>
              <div style={{ width: '4px', height: '20px', borderRadius: '2px', backgroundColor: group.color }}></div>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: group.color, margin: 0 }}>
                {group.name}
              </h3>
              <span style={{ fontSize: '13px', color: '#676879' }}>
                {group.tasks.length === 0 ? 'No Items' : `${group.tasks.length} ${group.tasks.length === 1 ? 'Item' : 'Items'}`}
              </span>
            </div>

            {group.expanded && (
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #d0d4e4', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                {/* TABLE HEADER */}
                <div 
                  style={{
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #d0d4e4',
                    fontSize: '12px',
                    minHeight: '40px',
                    display: 'grid',
                    gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                      if (col.id === 'name') return '400px';
                      if (col.type === 'person') return '98px';
                      if (col.type === 'status') return '140px';
                      if (col.type === 'date') return '140px';
                      if (col.id === 'grantAmount') return '140px';
                      if (col.id === 'grantProvider') return '166px';
                      return '120px';
                    }).join(' ')} 32px`
                  }}
                >
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #d0d4e4' }}>
                    <div style={{ width: '14px', height: '14px', border: '1px solid #c3c6d4', borderRadius: '2px' }}></div>
                  </div>
                  {boardColumns.map(col => (
                    !hiddenColumns.includes(col.id) && (
                      <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '4px', borderRight: '1px solid #d0d4e4', fontWeight: 500, color: '#323338' }}>
                        {col.type === 'person' && <User size={12} />}
                        <span>{col.title}</span>
                        {col.type !== 'text' && <Info size={10} style={{ color: '#c3c6d4' }} />}
                      </div>
                    )
                  ))}
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} style={{ color: '#c3c6d4' }} />
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
                    style={{
                      borderBottom: '1px solid #e6e9ef',
                      minHeight: '36px',
                      display: 'grid',
                      gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                        if (col.id === 'name') return '400px';
                        if (col.type === 'person') return '98px';
                        if (col.type === 'status') return '140px';
                        if (col.type === 'date') return '140px';
                        if (col.id === 'grantAmount') return '140px';
                        if (col.id === 'grantProvider') return '166px';
                        return '120px';
                      }).join(' ')} 32px`
                    }}
                  >
                    <div style={{ padding: '8px', borderRight: '1px solid #e6e9ef' }}></div>
                    <div style={{ padding: '8px 12px', borderRight: '1px solid #e6e9ef' }}>
                      <input
                        type="text"
                        value={newTaskInput.value}
                        onChange={(e) => setNewTaskInput({ ...newTaskInput, value: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveTask(group.id);
                          if (e.key === 'Escape') setNewTaskInput({ groupId: null, value: '' });
                        }}
                        onBlur={() => saveTask(group.id)}
                        style={{
                          width: '100%',
                          fontSize: '14px',
                          color: '#323338',
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontFamily: 'Figtree, sans-serif'
                        }}
                        placeholder={template.addItemText || "Item name"}
                        autoFocus
                      />
                    </div>
                    {boardColumns.filter(col => !hiddenColumns.includes(col.id) && col.id !== 'name').map(col => (
                      <div key={col.id} style={{ padding: '8px 12px', borderRight: '1px solid #e6e9ef' }}></div>
                    ))}
                    <div style={{ padding: '8px' }}></div>
                  </div>
                ) : (
                  <div 
                    style={{
                      borderBottom: '1px solid #e6e9ef',
                      minHeight: '36px',
                      display: 'grid',
                      gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                        if (col.id === 'name') return '400px';
                        if (col.type === 'person') return '98px';
                        if (col.type === 'status') return '140px';
                        if (col.type === 'date') return '140px';
                        if (col.id === 'grantAmount') return '140px';
                        if (col.id === 'grantProvider') return '166px';
                        return '120px';
                      }).join(' ')} 32px`
                    }}
                  >
                    <div style={{ padding: '8px', borderRight: '1px solid #e6e9ef' }}></div>
                    <div style={{ padding: '8px 12px', borderRight: '1px solid #e6e9ef' }}>
                      <button 
                        onClick={() => startAddTask(group.id)}
                        style={{
                          fontSize: '14px',
                          color: '#676879',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          fontFamily: 'Figtree, sans-serif'
                        }}
                      >
                        <Plus size={14} />
                        <span>{template.addItemText || 'Add item'}</span>
                      </button>
                    </div>
                    {boardColumns.filter(col => !hiddenColumns.includes(col.id) && col.id !== 'name').map(col => (
                      <div key={col.id} style={{ padding: '8px 12px', borderRight: '1px solid #e6e9ef' }}></div>
                    ))}
                    <div style={{ padding: '8px' }}></div>
                  </div>
                )}

                {/* SUMMARY ROW */}
                {group.tasks.length > 0 && (
                  <div 
                    style={{
                      backgroundColor: '#f6f7fb',
                      minHeight: '40px',
                      display: 'grid',
                      gridTemplateColumns: `32px ${boardColumns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
                        if (col.id === 'name') return '400px';
                        if (col.type === 'person') return '98px';
                        if (col.type === 'status') return '140px';
                        if (col.type === 'date') return '140px';
                        if (col.id === 'grantAmount') return '140px';
                        if (col.id === 'grantProvider') return '166px';
                        return '120px';
                      }).join(' ')} 32px`
                    }}
                  >
                    <div style={{ padding: '8px', borderRight: '1px solid #d0d4e4' }}></div>
                    {boardColumns.map(col => {
                      if (hiddenColumns.includes(col.id)) return null;
                      
                      if (col.type === 'status') {
                        const summary = getStatusSummary(group.tasks);
                        return (
                          <div key={col.id} style={{ padding: '8px 12px', borderRight: '1px solid #d0d4e4' }}>
                            <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#fff' }}>
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
                          <div key={col.id} style={{ padding: '8px 12px', borderRight: '1px solid #d0d4e4', textAlign: 'center' }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#323338' }}>
                              ${getTotalGrantAmount(group.tasks).toLocaleString('en-US')}
                            </div>
                            <div style={{ fontSize: '11px', color: '#676879' }}>sum</div>
                          </div>
                        );
                      }
                      
                      return <div key={col.id} style={{ padding: '8px 12px', borderRight: '1px solid #d0d4e4' }}></div>;
                    })}
                    <div style={{ padding: '8px' }}></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: '16px' }}>
          <button 
            onClick={addNewGroup}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#676879',
              border: '1px solid #c3c6d4',
              borderRadius: '4px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Figtree, sans-serif',
              transition: 'background-color 0.1s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f6f7fb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
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
      style={{
        borderBottom: '1px solid #e6e9ef',
        minHeight: '36px',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: `32px ${columns.filter(col => !hiddenColumns.includes(col.id)).map(col => {
          if (col.id === 'name') return '400px';
          if (col.type === 'person') return '98px';
          if (col.type === 'status') return '140px';
          if (col.type === 'date') return '140px';
          if (col.id === 'grantAmount') return '140px';
          if (col.id === 'grantProvider') return '166px';
          return '120px';
        }).join(' ')} 32px`,
        transition: 'background-color 0.1s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f6f7fb';
        setShowActions(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        setShowActions(false);
      }}
    >
      <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e6e9ef', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', backgroundColor: groupColor, borderTopRightRadius: '2px', borderBottomRightRadius: '2px' }}></div>
        <input type="checkbox" style={{ width: '14px', height: '14px', border: '2px solid #c3c6d4', borderRadius: '2px', cursor: 'pointer' }} />
      </div>

      {columns.map(col => {
        if (hiddenColumns.includes(col.id)) return null;

        if (col.id === 'name') {
          return (
            <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #e6e9ef' }}>
              <ChevronRight size={14} style={{ color: '#676879' }} />
              <span style={{ fontSize: '14px', color: '#323338', fontFamily: 'Figtree, sans-serif' }}>{task.name}</span>
              {showActions && (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button style={{ padding: '4px', background: '#fff', border: '1px solid #d0d4e4', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Star size={12} style={{ color: '#c3c6d4' }} />
                  </button>
                  <button style={{ padding: '4px', background: '#fff', border: '1px solid #d0d4e4', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <MessageSquare size={12} style={{ color: '#c3c6d4' }} />
                  </button>
                </div>
              )}
            </div>
          );
        }

        if (col.type === 'person') {
          return (
            <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', borderRight: '1px solid #e6e9ef' }}>
              {task.owner ? (
                <div 
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 600,
                    backgroundColor: task.owner.color
                  }}
                >
                  {task.owner.initial}
                </div>
              ) : (
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px dashed #c3c6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c3c6d4', cursor: 'pointer' }}>
                  <User size={12} />
                </div>
              )}
            </div>
          );
        }

        if (col.type === 'status') {
          return (
            <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', borderRight: '1px solid #e6e9ef' }}>
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
            <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', borderRight: '1px solid #e6e9ef' }}>
              {task.dueDate ? (
                <>
                  {task.overdue && task.status !== 'done' && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d83a52' }}></div>
                  )}
                  <span style={{ fontSize: '14px', color: task.status === 'done' ? '#c3c6d4' : '#323338', textDecoration: task.status === 'done' ? 'line-through' : 'none', fontFamily: 'Figtree, sans-serif' }}>
                    {task.dueDate}
                  </span>
                  {task.status === 'done' && <CheckCircle2 size={14} style={{ color: '#00c875' }} />}
                </>
              ) : (
                <span style={{ fontSize: '14px', color: '#c3c6d4' }}>-</span>
              )}
            </div>
          );
        }

        if (col.id === 'grantAmount') {
          return (
            <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', borderRight: '1px solid #e6e9ef' }}>
              <span style={{ fontSize: '14px', color: '#323338', fontFamily: 'Figtree, sans-serif' }}>
                {task.grantAmount ? `$${task.grantAmount.toLocaleString('en-US')}` : '-'}
              </span>
            </div>
          );
        }

        if (col.id === 'grantProvider') {
          return (
            <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', borderRight: '1px solid #e6e9ef' }}>
              {task.grantProvider ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '16px', backgroundColor: '#0073ea', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '14px', color: '#0073ea', fontFamily: 'Figtree, sans-serif' }}>{task.grantProvider}</span>
                </div>
              ) : (
                <span style={{ fontSize: '14px', color: '#c3c6d4' }}>-</span>
              )}
            </div>
          );
        }

        return (
          <div key={col.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', borderRight: '1px solid #e6e9ef' }}>
            <span style={{ fontSize: '14px', color: '#323338', fontFamily: 'Figtree, sans-serif' }}>{task[col.id] || '-'}</span>
          </div>
        );
      })}

      <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button style={{ color: '#c3c6d4', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
          className="w-full py-2 px-3 rounded text-xs font-medium bg-white text-gray-600 hover:opacity-90 transition-all"
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