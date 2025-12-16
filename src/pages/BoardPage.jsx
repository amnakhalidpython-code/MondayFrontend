// src/pages/BoardPage.jsx - DYNAMIC COLUMNS VERSION
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Search, 
  User, 
  Filter, 
  Grid3x3, 
  MoreHorizontal,
  Info,
  MessageSquarePlus,
  Calendar,
  AlertCircle,
  FileText,
  DollarSign,
  Paperclip,
  Clock
} from 'lucide-react';
import StatusDropdown from '../components/StatusDropdown';

const BoardPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  
  const [board, setBoard] = useState(null);
  const [activeView, setActiveView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get userId first
    const storedUser = sessionStorage.getItem('mondayUser');
    const storedEmail = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail');
    
    let id = null;

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        id = parsedUser.uid;
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }

    if (!id && storedEmail) {
      id = storedEmail;
    }

    console.log('BoardPage userId:', id);
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBoard();
    }
  }, [boardId, userId]);

  const fetchBoard = async () => {
    try {
      console.log('Fetching board with userId:', userId);
      
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setBoard(data.board);
        const defaultView = data.board.views?.find(v => v.isDefault) || data.board.views?.[0];
        setActiveView(defaultView);
      } else {
        alert(data.message || 'Board not found');
        navigate('/workspace');
      }
    } catch (error) {
      console.error('Error fetching board:', error);
      alert('Failed to load board');
      navigate('/workspace');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading board...</div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Board not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm" style={{ minHeight: 'calc(100vh - 200px)' }}>
      {/* Board Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-2xl font-semibold hover:bg-gray-100 px-3 py-1 rounded transition-colors">
              {board.name}
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Integrate
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Automate
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Invite
            </button>
          </div>
        </div>
      </div>

      {/* Views Navigation */}
      <div className="border-b">
        <div className="flex items-center gap-1 px-6 py-2 overflow-x-auto">
          {board.views?.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeView?.id === view.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {view.icon === 'board' && '📋'}
              {view.icon === 'chart' && '📊'}
              {view.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeView?.type === 'main' && (
          <DynamicBoardView board={board} setBoard={setBoard} />
        )}
        
        {activeView?.type === 'dashboard' && (
          <DashboardView board={board} />
        )}
      </div>
    </div>
  );
};

// ✅ Group Section Component
const GroupSection = ({ 
  title, 
  color, 
  items, 
  activeColumns, 
  statusOptions, 
  priorityOptions, 
  onUpdate, 
  onDelete,
  onEditLabel,
  onAddLabel,
  showAddRow = false,
  newItemTitle = '',
  setNewItemTitle,
  handleAddItem,
  isAddingItem = false
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`bg-white border-l-4 ${color} mb-4`}>
      {/* Group Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-0.5 hover:bg-gray-100 rounded transition-colors"
        >
          {expanded ? (
            <ChevronDown className={`w-4 h-4 ${color.replace('border', 'text')}`} />
          ) : (
            <ChevronRight className={`w-4 h-4 ${color.replace('border', 'text')}`} />
          )}
        </button>
        
        <h3 className={`font-semibold text-base ${color.replace('border', 'text')}`}>
          {title}
        </h3>
        <span className="text-sm text-gray-500">
          {items.length} Items
        </span>

        <div className="ml-auto">
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Column Headers */}
      {expanded && (
        <div className="bg-gray-50 border-t border-b flex text-sm">
          <div className="w-12 px-3 py-2"></div>
          <div className="min-w-[300px] px-4 py-2 flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
            <span className="font-medium text-gray-700">Item</span>
          </div>
          
          {activeColumns.map(col => {
            const Icon = col.icon;
            return (
              <div key={col.key} className="w-36 px-4 py-2 flex items-center justify-center gap-1">
                <Icon className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-medium text-gray-700">{col.label}</span>
              </div>
            );
          })}
          
          <div className="w-12 px-2 py-2"></div>
        </div>
      )}

      {/* Item Rows */}
      {expanded && (
        <>
          {items.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400 text-sm">
              No items in this section
            </div>
          ) : (
            items.map((item, index) => (
              <DynamicItemRow
                key={item._id || index}
                item={item}
                activeColumns={activeColumns}
                statusOptions={statusOptions}
                priorityOptions={priorityOptions}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEditLabel={onEditLabel}
                onAddLabel={onAddLabel}
              />
            ))
          )}

          {/* Add Item Row (only for To Do group) */}
          {showAddRow && (
            <div className="bg-white border-t flex hover:bg-gray-50">
              <div className="w-12 px-3 py-3"></div>
              <div className={`min-w-[300px] px-4 py-3 flex items-center gap-2 border-l-4 ${color}`}>
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 opacity-0" />
                <input 
                  type="text" 
                  placeholder="+ Add item"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem();
                    }
                  }}
                  disabled={isAddingItem}
                  className="flex-1 outline-none bg-transparent text-gray-500 placeholder-gray-400 disabled:opacity-50"
                />
              </div>
              {activeColumns.map(col => (
                <div key={col.key} className="w-36 px-4 py-3"></div>
              ))}
              <div className="w-12 px-2 py-3"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ✅ DYNAMIC BOARD VIEW - Uses columns from backend
const DynamicBoardView = ({ board, setBoard }) => {
  const [items, setItems] = useState(board.items || []);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Get active columns from board.columns
  const getActiveColumns = () => {
    const columnConfig = [
      { key: 'owner', label: 'Owner', icon: User },
      { key: 'status', label: 'Status', icon: AlertCircle },
      { key: 'dueDate', label: 'Due Date', icon: Calendar },
      { key: 'priority', label: 'Priority', icon: AlertCircle },
      { key: 'lastUpdated', label: 'Last Updated', icon: Clock },
      { key: 'timeline', label: 'Timeline', icon: Calendar },
      { key: 'notes', label: 'Notes', icon: FileText },
      { key: 'budget', label: 'Budget', icon: DollarSign },
      { key: 'files', label: 'Files', icon: Paperclip }
    ];

    // Filter only selected columns
    return columnConfig.filter(col => board.columns?.[col.key] === true);
  };

  const activeColumns = getActiveColumns();

  // Status options with edit capability
  const [statusOptions, setStatusOptions] = useState([
    { id: 1, label: 'Working on it', color: '#fdab3d', isDefault: true },
    { id: 2, label: 'Done', color: '#00c875', isDefault: true },
    { id: 3, label: 'Stuck', color: '#e44258', isDefault: true },
    { id: 4, label: 'Not Started', color: '#c4c4c4', isDefault: true }
  ]);

  // Separate items into groups (To Do and Done)
  const todoItems = items.filter(item => item.data?.status !== 'Done');
  const doneItems = items.filter(item => item.data?.status === 'Done');

  const priorityOptions = [
    { label: 'Low', color: '#579bfc' },
    { label: 'Medium', color: '#fdab3d' },
    { label: 'High', color: '#e44258' },
    { label: 'Critical', color: '#401694' }
  ];

  // Add new item
  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return;

    setIsAddingItem(true);
    try {
      // Get current user email
      const storedUser = sessionStorage.getItem('mondayUser');
      const storedEmail = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail');
      
      let userEmail = null;
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userEmail = parsedUser.email;
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
      if (!userEmail && storedEmail) {
        userEmail = storedEmail;
      }

      const response = await fetch(`http://localhost:5000/api/boards/${board._id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newItemTitle.trim(),
          group: 'default',
          data: {
            status: 'Not Started',
            owner: userEmail || 'Unassigned',
            dueDate: null,
            priority: 'Low'
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        setItems(data.board.items);
        setBoard(data.board);
        setNewItemTitle('');
      } else {
        alert('Failed to add item: ' + data.message);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    } finally {
      setIsAddingItem(false);
    }
  };

  // Update item
  const handleUpdateItem = async (itemId, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/boards/${board._id}/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      const data = await response.json();
      if (data.success) {
        setItems(data.board.items);
        setBoard(data.board);
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/boards/${board._id}/items/${itemId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        setItems(data.board.items);
        setBoard(data.board);
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  // Handle edit label
  const handleEditLabel = (statusId, newLabel) => {
    setStatusOptions(prev => 
      prev.map(status => 
        status.id === statusId ? { ...status, label: newLabel } : status
      )
    );
  };

  // Handle add new label
  const handleAddLabel = (newStatus) => {
    const newId = Math.max(...statusOptions.map(s => s.id)) + 1;
    setStatusOptions(prev => [...prev, { 
      id: newId, 
      label: newStatus.label, 
      color: newStatus.color, 
      isDefault: false 
    }]);
  };

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b bg-white sticky top-0 z-10">
        <button 
          onClick={handleAddItem}
          disabled={isAddingItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-400"
        >
          <Plus className="w-4 h-4" />
          {isAddingItem ? 'Adding...' : 'New Item'}
        </button>
        
        <div className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <Search className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Search</span>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
          <User className="w-4 h-4" />
          Person
        </button>

        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
          <Filter className="w-4 h-4" />
          Filter
        </button>

        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
          <Grid3x3 className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Board Content */}
      <div className="overflow-x-auto">
        {/* TO DO GROUP */}
        <GroupSection
          title="To Do"
          color="border-blue-500"
          items={todoItems}
          activeColumns={activeColumns}
          statusOptions={statusOptions}
          priorityOptions={priorityOptions}
          onUpdate={handleUpdateItem}
          onDelete={handleDeleteItem}
          onEditLabel={handleEditLabel}
          onAddLabel={handleAddLabel}
          showAddRow={true}
          newItemTitle={newItemTitle}
          setNewItemTitle={setNewItemTitle}
          handleAddItem={handleAddItem}
          isAddingItem={isAddingItem}
        />

        {/* DONE/COMPLETED GROUP */}
        <GroupSection
          title="Done"
          color="border-green-500"
          items={doneItems}
          activeColumns={activeColumns}
          statusOptions={statusOptions}
          priorityOptions={priorityOptions}
          onUpdate={handleUpdateItem}
          onDelete={handleDeleteItem}
          onEditLabel={handleEditLabel}
          onAddLabel={handleAddLabel}
          showAddRow={false}
        />
      </div>
    </div>
  );
};

// ✅ Dynamic Item Row Component
const DynamicItemRow = ({ item, activeColumns, statusOptions, priorityOptions, onUpdate, onDelete, onEditLabel, onAddLabel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.label === status);
    return option?.color || '#c4c4c4';
  };

  const getPriorityColor = (priority) => {
    const option = priorityOptions.find(opt => opt.label === priority);
    return option?.color || '#c4c4c4';
  };

  const handleUpdateStatus = (status) => {
    onUpdate(item._id, { data: { ...item.data, status } });
  };

  const handleUpdatePriority = (priority) => {
    onUpdate(item._id, { data: { ...item.data, priority } });
    setShowPriorityMenu(false);
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle !== item.title) {
      onUpdate(item._id, { title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleDeleteItem = () => {
    setShowMenu(false);
    onDelete(item._id);
  };

  return (
    <div
      className="bg-white border-t flex hover:bg-gray-50 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-12 px-3 py-3 flex items-center justify-center">
        {isHovered && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 w-48">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setIsEditingTitle(true);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    Rename
                  </button>
                  <button
                    onClick={handleDeleteItem}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="min-w-[300px] px-4 py-3 flex items-center gap-2 border-l-4 border-blue-500">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSaveTitle();
            }}
            autoFocus
            className="flex-1 font-medium text-gray-900 outline-none border-b-2 border-blue-500"
          />
        ) : (
          <span 
            className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
            onClick={() => setIsEditingTitle(true)}
          >
            {item.title}
          </span>
        )}
        <button className="ml-auto p-1 hover:bg-gray-200 rounded">
          <MessageSquarePlus className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Dynamic column cells */}
      {activeColumns.map(col => (
        <div key={col.key} className="w-36 px-4 py-3 flex items-center justify-center">
          {col.key === 'status' && (
            <StatusDropdown
              currentStatus={item.data?.status}
              statusOptions={statusOptions}
              onStatusChange={handleUpdateStatus}
              onEditLabel={onEditLabel}
              onAddLabel={onAddLabel}
            />
          )}

          {col.key === 'priority' && (
            <div className="relative w-full">
              <button
                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                className="px-3 py-1.5 rounded-md text-white text-sm font-medium hover:opacity-90 transition-opacity w-full"
                style={{ backgroundColor: getPriorityColor(item.data?.priority) }}
              >
                {item.data?.priority || 'Low'}
              </button>
              {showPriorityMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowPriorityMenu(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 w-full">
                    {priorityOptions.map(priority => (
                      <button
                        key={priority.label}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => handleUpdatePriority(priority.label)}
                      >
                        <div 
                          className="w-4 h-4 rounded-sm" 
                          style={{ backgroundColor: priority.color }}
                        />
                        <span className="text-sm">{priority.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {col.key === 'owner' && (
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">
              <User className="w-4 h-4" />
              {item.data?.owner || 'Unassigned'}
            </button>
          )}

          {col.key === 'dueDate' && (
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {item.data?.dueDate || 'Set date'}
            </button>
          )}

          {col.key === 'timeline' && (
            <div className="text-sm text-gray-600 text-center">
              {item.data?.timeline || '-'}
            </div>
          )}

          {col.key === 'lastUpdated' && (
            <div className="text-sm text-gray-600 text-center">
              {item.data?.lastUpdated || '-'}
            </div>
          )}

          {col.key === 'notes' && (
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              {item.data?.notes ? 'View' : 'Add'}
            </button>
          )}

          {col.key === 'budget' && (
            <div className="text-sm text-gray-600 text-center font-medium">
              {item.data?.budget || '-'}
            </div>
          )}

          {col.key === 'files' && (
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">
              <Paperclip className="w-4 h-4" />
              {item.data?.files || '0'}
            </button>
          )}
        </div>
      ))}

      <div className="w-12 px-2 py-3"></div>
    </div>
  );
};

// ✅ Simple Dashboard View
const DashboardView = ({ board }) => {
  const items = board.items || [];
  
  const statusCounts = {
    'Working on it': items.filter(i => i.data?.status === 'Working on it').length,
    'Done': items.filter(i => i.data?.status === 'Done').length,
    'Stuck': items.filter(i => i.data?.status === 'Stuck').length,
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard & Reporting</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-sm text-gray-600 mb-2">Total Items</div>
          <div className="text-4xl font-bold text-gray-900">{items.length}</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#00c875]"></div>
            <div className="text-sm text-gray-600">Done</div>
          </div>
          <div className="text-4xl font-bold text-gray-900">{statusCounts['Done']}</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#fdab3d]"></div>
            <div className="text-sm text-gray-600">Working on it</div>
          </div>
          <div className="text-4xl font-bold text-gray-900">{statusCounts['Working on it']}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Tasks by Status</h3>
        <div className="space-y-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex items-center gap-3">
              <div className="w-32 text-sm text-gray-600">{status}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div 
                  className="h-full flex items-center justify-end px-3 text-white text-sm font-medium transition-all"
                  style={{ 
                    width: `${items.length > 0 ? (count / items.length) * 100 : 0}%`,
                    backgroundColor: status === 'Done' ? '#00c875' : status === 'Working on it' ? '#fdab3d' : '#e44258'
                  }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
