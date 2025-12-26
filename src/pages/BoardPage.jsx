import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  Plus
} from 'lucide-react';
import ActionBar from '../components/board/components/ActionBar';
import BoardHeader from '../components/board/components/BoardHeader'; 
import TanStackBoardTable from '../components/board/TanStackBoardTable';
import boardApi from '../services/boardApi';
import boardTemplates from '../config/boardTemplates';

const BoardPage = () => {
  const { boardId } = useParams();
  const [boardName, setBoardName] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentGroupBy, setCurrentGroupBy] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState([]);
  
  // Board Data
  const [groups, setGroups] = useState([]);
  const [boardColumns, setBoardColumns] = useState([]);
  const [statusConfig, setStatusConfig] = useState({});

  // Fetch board data from API
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        setLoading(true);
        // Using getBoardById from service
        // In a real app, userId would come from AuthContext
        const data = await boardApi.getBoardById(boardId, 'user-123');

        if (data.success && data.board) {
          setBoardName(data.board.name || 'Untitled Board');

          let columns = data.board.columns || [];
          let statuses = data.board.statusConfig || {};
          let apiGroups = data.board.groups || [];

          // Force "Donors" template structure if acceptable or empty
          if (columns.length === 0 || data.board.name?.toLowerCase().includes('donor')) {
            columns = [
              { id: 'name', title: 'Donor', type: 'text', width: 280 },
              { id: 'status', title: 'Status', type: 'status', width: 140 },
              { id: 'email', title: 'Email', type: 'email', width: 200 },
              { id: 'phone', title: 'Phone', type: 'phone', width: 180 },
              { id: 'donated', title: '$ Donated', type: 'number', width: 140 },
              { id: 'donations', title: 'Donations', type: 'text', width: 140 }, // Using text to show "-" or custom format
              { id: 'files', title: 'Files', type: 'file', width: 120 }
            ];
            statuses = {
              potential: { label: 'Potential', bg: '#FFCB00' },
              active: { label: 'Active', bg: '#00C875' }
            };

            // If groups are empty, provide a clean "Potential Donors" group
            if (apiGroups.length === 0) {
              apiGroups = [
                { 
                  id: 'group-potential',
                  name: 'Potential Donors',
                  color: '#FDAB3D',
                  expanded: true,
                  tasks: [
                    {
                      id: 't1',
                      name: 'Lorenzo Harvey',
                      email: 'Lorenzo@email.com',
                      phone: '+1 541 754 3010',
                      status: 'potential',
                      donated: 0,
                      donations: null
                    }
                  ]
                },
                { 
                  id: 'group-active',
                  name: 'Active Donors',
                  color: '#00C875',
                  expanded: true,
                  tasks: []
                }
              ];
            }
          }

          setBoardColumns(columns);
          setStatusConfig(statuses);
          setGroups(apiGroups);
        } else {
          setBoardName('Untitled Board');
        }

      } catch (error) {
        console.error('Error fetching board:', error);
        // Fallback for demo/error state
        setBoardName('Donors');
        setBoardColumns([
          { id: 'name', title: 'Donor', type: 'text', width: 280 },
          { id: 'status', title: 'Status', type: 'status', width: 140 },
          { id: 'email', title: 'Email', type: 'email', width: 200 },
          { id: 'phone', title: 'Phone', type: 'phone', width: 180 },
          { id: 'donated', title: '$ Donated', type: 'number', width: 140 },
          { id: 'donations', title: 'Donations', type: 'text', width: 140 },
          { id: 'files', title: 'Files', type: 'file', width: 120 }
        ]);
        setGroups([
          {
            id: 'group-fallback',
            name: 'Potential Donors',
            color: '#FDAB3D',
            expanded: true,
            tasks: []
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (boardId) {
      fetchBoardData();
    }
  }, [boardId]);

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
        task.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.tasks.length > 0);

    setFilteredGroups(filtered);
  }, [searchQuery, groups]);

  const toggleGroup = (groupId) => {
    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, expanded: !g.expanded } : g
    ));
  };

  // Backend Integration: Add Task
  const handleAddTask = async (groupId, taskName) => {
    if (!taskName.trim()) return;

    try {
      // Optimistic Update
      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        status: null,
        email: '',
        phone: '',
        donated: 0,
        donations: null
      };

      const newGroups = groups.map(g =>
        g.id === groupId ? { ...g, tasks: [...g.tasks, newTask] } : g
      );
      setGroups(newGroups);

      // API Call
      const response = await boardApi.addItemToBoard(boardId, groupId, { name: taskName });
      if (response.success && response.item) {
        setGroups(prev => prev.map(g =>
          g.id === groupId ? {
            ...g,
            tasks: g.tasks.map(t => t.id === newTask.id ? response.item : t)
          } : g
        ));
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Backend Integration: Update Task
  const handleUpdateTask = async (taskId, field, value) => {
    try {
      // Optimistic Update
      setGroups(prev => prev.map(g => ({
        ...g,
        tasks: g.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t)
      })));

      // API Call
      await boardApi.updateBoardItem(boardId, taskId, { [field]: value });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Add New Column Handler
  const handleAddColumn = async (type) => {
    // Generate new column
    const newColId = `col_${Date.now()}`;
    const newColumn = {
      id: newColId,
      title: type.charAt(0).toUpperCase() + type.slice(1), // e.g. "Text", "Date"
      type: type,
      width: 150
    };

    // Optimistic Update
    setBoardColumns([...boardColumns, newColumn]);

    try {
      // API call to persist (assuming endpoint exists as per boardApi.js)
      await boardApi.addColumnToBoard(boardId, newColumn.title, type);
    } catch (error) {
      console.error("Failed to add column:", error);
    }
  };


  // Handle various actions
  const handleSort = (columnId, order) => setCurrentSort({ column: columnId, order });
  const handleHideColumns = (columnId) => {
    setHiddenColumns(prev => prev.includes(columnId) ? prev.filter(c => c !== columnId) : [...prev, columnId]);
  };
  const handleGroupBy = (columnId) => setCurrentGroupBy(columnId);

  const visibleColumns = boardColumns.filter(c => !hiddenColumns.includes(c.id));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BoardHeader boardTitle={boardName} />
      <ActionBar 
        columns={boardColumns}
        onSearch={handleSearch}
        onSort={handleSort}
        onHideColumns={handleHideColumns}
        onGroupBy={handleGroupBy}
        hiddenColumns={hiddenColumns}
        currentSort={currentSort}
        currentGroupBy={currentGroupBy}
        onAddTask={() => {
          if (groups.length > 0) handleAddTask(groups[0].id, "New Donor");
        }}
        addItemText="+ Add donor"
      />

      <div className="p-8 flex-1 overflow-y-auto bg-white">
        {loading ? (
          <div className="text-center py-10">Loading board...</div>
        ) : (
          <>
            {(searchQuery ? filteredGroups : groups).map(group => (
              <div key={group.id} className="mb-10">
                {/* Group Header - Aligned to match Monday Design */}
                <div 
                  className="flex items-center gap-2 mb-3 cursor-pointer group/header"
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="p-1 rounded hover:bg-gray-100 transition-colors">
                    {group.expanded ? (
                      <ChevronDown size={20} style={{ color: group.color }} />
                    ) : (
                        <ChevronRight size={20} style={{ color: group.color }} />
                    )}
                  </div>
                  <h3 className="text-[18px] font-normal leading-none" style={{ color: group.color }}>
                    {group.name}
                  </h3>
                  <span className="text-[14px] text-gray-400 font-light ml-2">
                    {group.tasks.length} {group.tasks.length === 1 ? 'Donor' : 'Donors'}
                  </span>
                </div>

                {group.expanded && (
                  <div className="pl-1 border-2 border-purple-500">
                    <TanStackBoardTable
                      data={group.tasks}
                      columns={visibleColumns}
                        groupColor={group.color}
                        statusConfig={statusConfig}
                      onUpdateTask={handleUpdateTask}
                      onAddTask={(val) => handleAddTask(group.id, val)}
                      onAddColumn={handleAddColumn}
                      onSort={handleSort}
                      onFilter={handleHideColumns}
                      onGroupBy={handleGroupBy}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Empty state "Add Group" at bottom */}
            <div className="mt-4">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded transition-colors text-sm">
                <Plus size={16} />
                <span>Add new group</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardPage;