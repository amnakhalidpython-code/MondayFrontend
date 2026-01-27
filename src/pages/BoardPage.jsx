import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import BoardHeader from '../components/board/components/BoardHeader';
import ActionBar from '../components/board/components/ActionBar';
import TanStackBoardTable from '../components/board/TanStackBoardTable';
import { useAuth } from '../context/AuthContext';
import boardTemplates from '../config/boardTemplates';

const BoardPage = () => {
  const { boardId } = useParams();
  const { user } = useAuth();

  const [boardName, setBoardName] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [groups, setGroups] = useState([]);
  const [boardColumns, setBoardColumns] = useState([]);
  const [columnTitles, setColumnTitles] = useState({});

  // Configs
  const [statusConfig, setStatusConfig] = useState({});
  const [priorityConfig, setPriorityConfig] = useState({});

  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentGroupBy, setCurrentGroupBy] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState([]);

  // --- 1. Helper: Generate unique column ID with auto-numbering ---
  const generateUniqueColumnId = (baseType, existingColumns, existingTitles) => {
    // Count how many columns of this base type already exist
    const existingOfType = existingColumns.filter(col => {
      const colId = col.id;
      // Match columns like "notes", "notes_1", "notes_2", etc.
      return colId === baseType || colId.startsWith(`${baseType}_`);
    });

    if (existingOfType.length === 0) {
      // First column of this type - return base type
      return baseType;
    } else {
      // Column already exists - add number suffix
      // Start from 1: email_1, email_2, status_1, status_2, etc.
      return `${baseType}_${existingOfType.length}`;
    }
  };

  // --- 2. Helper: Get default title for column ---
  const getDefaultColumnTitle = (columnId, columnType) => {
    const typeToTitleMap = {
      text: 'Text',
      email: 'Email',
      numbers: 'Numbers',
      formula: 'Formula',
      status: 'Status',
      file: 'Files',
      date: 'Date',
      phone: 'Phone',
      checkbox: 'Checkbox',
      person: 'Person',
      dropdown: 'Dropdown',
      notes: 'Notes',
      timeline: 'Timeline',
      priority: 'Priority',
      budget: 'Budget',
      owner: 'Owner',
      dueDate: 'Due Date',
      lastUpdated: 'Last Updated',
      files: 'Files'
    };

    // Extract base type from columnId (handles both "email" and "email_1")
    const baseType = columnId.includes('_') ? columnId.split('_')[0] : columnId;
    const baseTitle = typeToTitleMap[baseType] || typeToTitleMap[columnType] || 'Column';

    // If it's a numbered column (like email_1, status_2), add the number to title
    if (columnId.includes('_')) {
      const number = columnId.split('_')[1];
      return `${baseTitle} ${number}`;
    }

    return baseTitle;
  };

  // --- 3. Map Backend Columns to Frontend ---
  const mapBackendColumnsToFrontend = (backendCols, customTitles = {}) => {
    const columns = [
      { id: 'name', title: 'Task', type: 'text', width: 280, fixed: true }
    ];

    // Base column definitions with proper types
    const columnDefs = {
      owner: { type: 'person', width: 100 },
      status: { type: 'status', width: 140 },
      dueDate: { type: 'date', width: 130 },
      priority: { type: 'status', width: 140 },
      timeline: { type: 'timeline', width: 180 },
      lastUpdated: { type: 'date', width: 140 },
      notes: { type: 'text', width: 200 },
      budget: { type: 'number', width: 120 },
      files: { type: 'file', width: 100 },
      email: { type: 'email', width: 180 },
      phone: { type: 'phone', width: 140 },
      numbers: { type: 'number', width: 120 },
      checkbox: { type: 'checkbox', width: 100 },
      dropdown: { type: 'dropdown', width: 140 },
      formula: { type: 'formula', width: 140 }
    };

    // Process ALL backend columns (including numbered ones like email_1, status_2)
    Object.keys(backendCols).forEach(colKey => {
      if (!backendCols[colKey]) return; // Skip if false

      // Extract base type for numbered columns (email_1 → email)
      const baseType = colKey.includes('_') ? colKey.split('_')[0] : colKey;

      // Get column definition (use base type to find the def)
      const def = columnDefs[baseType];

      if (def) {
        // Use custom title if exists, otherwise generate default
        const title = customTitles[colKey] || getDefaultColumnTitle(colKey, def.type);

        columns.push({
          id: colKey,
          title,
          type: def.type,
          width: def.width
        });
      }
    });

    return columns;
  };

  // --- 4. Configurations ---
  const getStatusConfig = () => ({
    'Done': { label: 'Done', bg: '#00c875', color: '#fff' },
    'Working on it': { label: 'Working on it', bg: '#fdab3d', color: '#fff' },
    'Stuck': { label: 'Stuck', bg: '#df2f4a', color: '#fff' },
    'Not Started': { label: 'Not Started', bg: '#c4c4c4', color: '#fff' },
    '': { label: '', bg: '#c4c4c4', color: '#fff' }
  });

  const getPriorityConfig = () => ({
    'Critical': { label: 'Critical ⚠️', bg: '#333333', color: '#fff' },
    'High': { label: 'High', bg: '#401694', color: '#fff' },
    'Medium': { label: 'Medium', bg: '#5559df', color: '#fff' },
    'Low': { label: 'Low', bg: '#579bfc', color: '#fff' },
    '': { label: '', bg: '#c4c4c4', color: '#fff' }
  });

  // --- 5. Fetch Data ---
  const fetchBoardData = useCallback(async () => {
    if (!boardId) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}`);
      const data = await response.json();

      if (data.success && data.board) {
        const board = data.board;
        setBoardName(board.name);
        setColumnTitles(board.columnTitles || {});
        setBoardColumns(mapBackendColumnsToFrontend(board.columns || {}, board.columnTitles || {}));
        setStatusConfig(getStatusConfig());
        setPriorityConfig(getPriorityConfig());

        const allItems = (board.items || []).map(item => {
          const colValues = item.column_values || {};
          const mappedItem = {
            id: item._id || item.id,
            name: item.title,
            group: item.group || 'group_todo'
          };

          // Map all column values dynamically
          Object.keys(colValues).forEach(key => {
            mappedItem[key] = colValues[key];
          });

          return mappedItem;
        });

        const todoItems = allItems.filter(item => item.group === 'group_todo' || !item.group || item.group === 'default');
        const completedItems = allItems.filter(item => item.group === 'group_completed');

        setGroups([
          { id: 'group_todo', name: 'To-Do', color: '#579bfc', expanded: true, tasks: todoItems },
          { id: 'group_completed', name: 'Completed', color: '#00c875', expanded: true, tasks: completedItems }
        ]);
      }
    } catch (error) {
      console.error('Error fetching board:', error);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  useEffect(() => { fetchBoardData(); }, [fetchBoardData]);

  // --- 6. Actions ---
  const handleSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (!searchQuery) { setFilteredGroups(groups); return; }
    const filtered = groups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task => task.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(group => group.tasks.length > 0);
    setFilteredGroups(filtered);
  }, [searchQuery, groups]);

  const toggleGroup = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, expanded: !g.expanded } : g));
  };

  // ✅ CREATE COLUMN with Auto-Numbering
  const handleCreateColumn = async (columnType) => {
    const keyMap = {
      text: 'notes',
      email: 'email',
      numbers: 'numbers',
      formula: 'formula',
      status: 'status',
      file: 'files',
      date: 'dueDate',
      phone: 'phone',
      checkbox: 'checkbox',
      person: 'owner',
      dropdown: 'dropdown',
      timeline: 'timeline',
      priority: 'priority',
      budget: 'budget'
    };

    const baseKey = keyMap[columnType] || columnType;

    // ✅ ALWAYS generate unique column ID (even if base doesn't exist)
    // This ensures that adding "text" when "notes" exists creates "notes_1"
    const newColumnId = generateUniqueColumnId(baseKey, boardColumns, columnTitles);

    // Get default title
    const defaultTitle = getDefaultColumnTitle(newColumnId, columnType);

    try {
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedColumns: { [newColumnId]: true },
          columnTitles: { [newColumnId]: defaultTitle }
        })
      });

      if (response.ok) {
        fetchBoardData();
      }
    } catch (err) {
      console.error('Error creating column:', err);
    }
  };

  // ✅ RENAME COLUMN
  const handleRenameColumn = async (columnId, newTitle) => {
    if (!newTitle || newTitle.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          columnTitles: { [columnId]: newTitle.trim() }
        })
      });

      if (response.ok) {
        // Update local state immediately
        setColumnTitles(prev => ({ ...prev, [columnId]: newTitle.trim() }));
        setBoardColumns(prev => prev.map(col =>
          col.id === columnId ? { ...col, title: newTitle.trim() } : col
        ));
      }
    } catch (err) {
      console.error('Error renaming column:', err);
    }
  };
  // ✅ DELETE COLUMN
  const handleDeleteColumn = async (columnId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedColumns: { [columnId]: false }
        })
      });

      if (response.ok) {
        fetchBoardData();
      }
    } catch (err) {
      console.error('Error deleting column:', err);
    }
  
  }

  // ✅ Add Task (Syncs ID with Backend)
  const handleAddTask = async (groupId, taskName) => {
    const tempId = Date.now().toString();

    const newTask = {
      id: tempId,
      name: taskName,
      group: groupId,
      status: 'Working on it',
      priority: ''
    };

    // Optimistic UI Update
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, tasks: [...g.tasks, newTask] } : g));

    try {
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskName,
          group: groupId,
          column_values: { status: 'Working on it' }
        })
      });
      const data = await response.json();

      if (data.success) {
        const createdItem = data.board.items[data.board.items.length - 1];
        const realId = createdItem._id;

        setGroups(prevGroups => prevGroups.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              tasks: group.tasks.map(t => t.id === tempId ? { ...t, id: realId } : t)
            };
          }
          return group;
        }));
      }
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };

  // ✅ Update Task
  const handleUpdateTask = async (taskId, columnId, newValue) => {
    // Optimistic Update
    setGroups(prevGroups => prevGroups.map(group => ({
      ...group,
      tasks: group.tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, [columnId]: newValue };
        }
        return task;
      })
    })));

    let bodyPayload = {};

    if (columnId === 'name') {
      bodyPayload = { title: newValue };
    } else {
      bodyPayload = { column_values: { [columnId]: newValue } };
    }

    try {
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}/items/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      if (!response.ok) {
        console.error("Failed update:", await response.text());
      }
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const visibleColumns = boardColumns.filter(c => !hiddenColumns.includes(c.id));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BoardHeader boardTitle={boardName} />
      <ActionBar
        columns={boardColumns}
        onSearch={handleSearch}
        onAddTask={() => groups.length > 0 && handleAddTask(groups[0].id, "New Task")}
        addItemText="+ Add Task"
        onSort={(c, o) => setCurrentSort({ column: c, order: o })}
        onHideColumns={(c) => setHiddenColumns(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}
        onGroupBy={(c) => setCurrentGroupBy(c)}
        hiddenColumns={hiddenColumns}
        currentSort={currentSort}
        currentGroupBy={currentGroupBy}
      />

      <div className="p-8 flex-1 overflow-y-auto bg-white">
        {loading ? <div className="text-center text-gray-500 mt-10">Loading board...</div> : (
          <>
            {(searchQuery ? filteredGroups : groups).map(group => (
              <div key={group.id} className="mb-10">
                <div className="flex items-center gap-2 mb-3 cursor-pointer group/header" onClick={() => toggleGroup(group.id)}>
                  <div className="p-1 rounded hover:bg-gray-100 transition-colors">
                    {group.expanded ? <ChevronDown size={20} style={{ color: group.color }} /> : <ChevronRight size={20} style={{ color: group.color }} />}
                  </div>
                  <h3 className="text-[18px] font-normal leading-none" style={{ color: group.color }}>{group.name}</h3>
                  <span className="text-[14px] text-gray-400 font-light ml-2">{group.tasks.length} Task{group.tasks.length !== 1 && 's'}</span>
                </div>
                {group.expanded && (
                  <div className="pl-1">
                    <TanStackBoardTable
                      data={group.tasks}
                      columns={visibleColumns}
                      groupColor={group.color}
                      statusConfig={statusConfig}
                      priorityConfig={priorityConfig}
                      onAddTask={(val) => handleAddTask(group.id, val)}
                      onUpdateTask={handleUpdateTask}
                      onAddColumn={handleCreateColumn}
                      onRename={handleRenameColumn}
                      onDelete={handleDeleteColumn}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded transition-colors text-sm">
                <Plus size={16} /> <span>Add new group</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardPage;