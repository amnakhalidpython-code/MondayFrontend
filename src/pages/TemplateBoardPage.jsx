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
import TanStackBoardTable from '../components/board/TanStackBoardTable';
import { getTemplateById } from '../config/boardTemplates';
import * as donorService from '../services/api/donorService';
import * as columnService from '../services/api/columnService';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (templateId) {
      const templateData = getTemplateById(templateId);
      if (templateData) {
        setTemplate(templateData);
        setStatusConfig(templateData.statusConfig);

        // If it's the donors template, fetch from API
        if (templateId === 'donors') {
          loadDonorsFromAPI(templateData);
        } else {
        // Use hardcoded data for other templates
          setGroups(templateData.groups);
          setBoardColumns(templateData.columns);
        }
      }
    }
  }, [templateId]);

  const loadDonorsFromAPI = async (templateData) => {
    setLoading(true);
    try {
      // Fetch donors and columns from API
      const [donorsResponse, columnsResponse] = await Promise.all([
        donorService.fetchDonors({ page: 1, limit: 100 }),
        columnService.fetchColumns()
      ]);

      console.log('--- DEBUG: Raw API Response ---', donorsResponse);

      if (donorsResponse.success && columnsResponse.success) {
        // Map API columns to board columns format
        const apiColumns = columnsResponse.data.map(col => ({
          id: col.column_key,
          title: col.title,
          type: col.type,
          width: col.width || 150
        }));

        // Use API columns if available, otherwise use template columns
        console.log('--- DEBUG: Columns from API ---', apiColumns);
        if (apiColumns.length > 0) {
          console.log('--- DEBUG: Using columns from API ---');
          setBoardColumns(apiColumns);
        } else {
          console.log('--- DEBUG: API returned no columns, falling back to template columns ---');
          setBoardColumns(templateData.columns);
        }

        // Map API donors to tasks format, ensuring keys match column_keys from the API
        const donorTasks = donorsResponse.data.donors.map(donor => ({
          ...donor, // Use all original fields like 'donor_name', 'email', etc.
          id: donor._id, // Ensure 'id' is present for the table's internal keying
        }));

        console.log('--- DEBUG: Mapped Rows for UI ---', donorTasks);

        // Group donors by status
        const groupedDonors = {
          potential: donorTasks.filter(d => d.status === 'potential'),
          active: donorTasks.filter(d => d.status === 'active'),
          inactive: donorTasks.filter(d => d.status === 'inactive')
        };

        // Create groups
        const apiGroups = [
          {
            id: 'potential',
            name: 'Potential Donors',
            color: '#FF6B6B',
            expanded: true,
            tasks: groupedDonors.potential
          },
          {
            id: 'active',
            name: 'Active Donors',
            color: '#00C875',
            expanded: true,
            tasks: groupedDonors.active
          }
        ];

        setGroups(apiGroups);
      } else {
        // Fallback to template data if API fails
        console.warn('API returned unsuccessful response, using template data');
        setGroups(templateData.groups);
        setBoardColumns(templateData.columns);
      }
    } catch (error) {
      console.error('Error loading donors from API:', error);
      console.warn('⚠️ Backend API is not available. Using demo data.');
      console.warn('To use real data, please:');
      console.warn('1. Start the backend server: cd MondayClone && npm run dev');
      console.warn('2. Fix MongoDB connection (see MONGODB_TROUBLESHOOTING.md)');

      // Fallback to template data
      setGroups(templateData.groups);
      setBoardColumns(templateData.columns);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredGroups(groups);
      return;
    }
    const filtered = groups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task => 
        task.donor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.tasks.length > 0);
    setFilteredGroups(filtered);
  }, [searchQuery, groups]);

  useEffect(() => {
    console.log('--- DEBUG: Board group state updated ---', groups);
  }, [groups]);

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

  const handleFilter = (columnId, filterValue) => {
    // Implement filter logic here if needed
    console.log('Filter:', columnId, filterValue);
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

  // Handler for updating task field (used by TanStackBoardTable)
  const handleUpdateTask = async (groupId, taskId, field, value) => {
    // Optimistic Update for all templates
    setGroups(prevGroups =>
      prevGroups.map(g => {
        const taskIndex = g.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return g;

        const newTasks = [...g.tasks];
        newTasks[taskIndex] = { ...newTasks[taskIndex], [field]: value };
        return { ...g, tasks: newTasks };
      })
    );

    // If donors template, send update to API in the background
    if (templateId === 'donors') {
      try {
        // The 'field' variable now directly corresponds to the API/database field name
        const updatePayload = { [field]: value };
        await donorService.updateDonor(taskId, updatePayload);
        // No reload needed, UI is already updated.
      } catch (error) {
        console.error('Error updating donor:', error);
        // Optional: Here you could implement a rollback mechanism on API failure
      }
    }
  };

  const handleAddTaskToGroup = async (groupId, taskName) => {
    if (!taskName.trim()) return;

    const newTask = {
      id: `temp-${Date.now()}`,
      donor_name: taskName,
      owner: null,
      status: null,
      dueDate: '',
      overdue: false,
      grantAmount: 0,
      grantProvider: '',
      email: '',
      phone: '',
      donated: 0,
      donations: ''
    };

    // Optimistic update for all templates
    setGroups(prevGroups =>
      prevGroups.map(g =>
        g.id === groupId ? { ...g, tasks: [...g.tasks, newTask] } : g
      )
    );

    // If donors template, use API and then sync the new item
    if (templateId === 'donors') {
      try {
        const response = await donorService.createDonor({
          donor_name: taskName,
          email: `${taskName.toLowerCase().replace(/\s+/g, '')}@example.com`,
          status: groupId
        });

        if (response.success && response.data) {
          // Replace temporary task with the real one from the server
          setGroups(prevGroups =>
            prevGroups.map(g => {
              if (g.id === groupId) {
                return {
                  ...g,
                  tasks: g.tasks.map(t => (t.id === newTask.id ? { ...response.data, id: response.data._id } : t))
                };
              }
              return g;
            })
          );
        } else {
          throw new Error(response.message || 'Failed to create donor on server');
        }
      } catch (error) {
        console.error('Error creating donor:', error);
        // Rollback: remove the optimistically added task
        setGroups(prevGroups =>
          prevGroups.map(g => ({
            ...g,
            tasks: g.tasks.filter(t => t.id !== newTask.id)
          }))
        );
      }
    }
  };

  // Handler for adding a new column
  const handleAddColumn = async (columnType) => {
    const newColumn = {
      id: `temp-col-${Date.now()}`,
      title: `New ${columnType.charAt(0).toUpperCase() + columnType.slice(1)}`,
      type: columnType,
      width: 150
    };

    // Optimistic update for all templates
    setBoardColumns(prevColumns => [...prevColumns, newColumn]);

    if (templateId === 'donors') {
      try {
        const columnKey = `custom_${columnType}_${Date.now()}`;
        const response = await columnService.createColumn({
          column_key: columnKey,
          title: newColumn.title,
          type: columnType,
          width: 150
        });

        if (response.success && response.data) {
          // Replace temporary column with the real one from the server
          setBoardColumns(prevColumns =>
            prevColumns.map(c => (c.id === newColumn.id ? { ...response.data, id: response.data.column_key } : c))
          );
        } else {
          throw new Error(response.message || 'Failed to create column on server');
        }
      } catch (error) {
        console.error('Error creating column:', error);
        // Rollback: remove the optimistically added column
        setBoardColumns(prevColumns => prevColumns.filter(c => c.id !== newColumn.id));
      }
    }
  };


  // Handler for renaming a column
  const handleRenameColumn = async (columnId, newTitle) => {
    const originalColumns = [...boardColumns];
    setBoardColumns(boardColumns.map(col =>
      col.id === columnId ? { ...col, title: newTitle } : col
    ));

    if (templateId === 'donors') {
      try {
        await columnService.renameColumn(columnId, newTitle);
      } catch (error) {
        console.error('Error renaming column:', error);
        setBoardColumns(originalColumns); // Rollback
      }
    }
  };

  // Handler for deleting a column
  const handleDeleteColumn = async (columnId) => {
    const originalColumns = [...boardColumns];
    setBoardColumns(boardColumns.filter(col => col.id !== columnId));

    if (templateId === 'donors') {
      try {
        await columnService.deleteColumn(columnId);
      } catch (error) {
        console.error('Error deleting column:', error);
        setBoardColumns(originalColumns); // Rollback
      }
    }
  };

  // Handler for duplicating a column
  const handleDuplicateColumn = async (columnId) => {
    const columnToDuplicate = boardColumns.find(col => col.id === columnId);
    if (!columnToDuplicate) return;

    const newColumn = {
      ...columnToDuplicate,
      id: `temp-col-${Date.now()}`,
      title: `${columnToDuplicate.title} (Copy)`
    };

    const originalColumns = [...boardColumns];
    const columnIndex = originalColumns.findIndex(c => c.id === columnId);
    
    const newColumns = [...originalColumns];
    newColumns.splice(columnIndex + 1, 0, newColumn);
    setBoardColumns(newColumns);

    if (templateId === 'donors') {
      try {
        const response = await columnService.duplicateColumn(columnId);
        if (!response.success) throw new Error('Failed to duplicate column on server');
        
        const columnsResponse = await columnService.fetchColumns();
        if (columnsResponse.success) {
          const apiColumns = columnsResponse.data.map(col => ({
            id: col.column_key,
            title: col.title,
            type: col.type,
            width: col.width || 150
          }));
          setBoardColumns(apiColumns);
        }
      } catch (error) {
        console.error('Error duplicating column:', error);
        setBoardColumns(originalColumns); // Rollback
      }
    }
  };

  // Handler for adding column to the right
  const handleAddColumnToRight = async (columnId) => {
    const newColumn = {
      id: `temp-col-${Date.now()}`,
      title: 'New Column',
      type: 'text',
      width: 150
    };

    const originalColumns = [...boardColumns];
    const columnIndex = originalColumns.findIndex(c => c.id === columnId);
    if (columnIndex === -1) return;

    const newColumns = [...originalColumns];
    newColumns.splice(columnIndex + 1, 0, newColumn);
    setBoardColumns(newColumns);

    if (templateId === 'donors') {
      try {
        const response = await columnService.addColumnToRight(columnId, {
          column_key: `new_col_${Date.now()}`,
          title: 'New Column',
          type: 'text'
        });

        if (!response.success) throw new Error('Failed to add column to right on server');

        const columnsResponse = await columnService.fetchColumns();
        if (columnsResponse.success) {
          const apiColumns = columnsResponse.data.map(col => ({
            id: col.column_key,
            title: col.title,
            type: col.type,
            width: col.width || 150
          }));
          setBoardColumns(apiColumns);
        }
      } catch (error) {
        console.error('Error adding column to right:', error);
        setBoardColumns(originalColumns); // Rollback
      }
    }
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

  if (!template || loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', color: '#676879' }}>
            {loading ? 'Loading donors...' : 'Loading...'}
          </h2>
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
              <TanStackBoardTable
                data={group.tasks}
                columns={boardColumns.filter(col => !hiddenColumns.includes(col.id))}
                onUpdateTask={(taskId, field, value) => handleUpdateTask(group.id, taskId, field, value)}
                onAddTask={(taskName) => handleAddTaskToGroup(group.id, taskName)}
                onAddColumn={handleAddColumn}
                groupColor={group.color}
                statusConfig={statusConfig}
                onSort={handleSort}
                onFilter={handleFilter}
                onGroupBy={handleGroupBy}
                onRename={handleRenameColumn}
                onDelete={handleDeleteColumn}
                onDuplicate={handleDuplicateColumn}
                onAddToRight={handleAddColumnToRight}
              />
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