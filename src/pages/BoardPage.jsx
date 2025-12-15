// src/pages/BoardPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, Plus } from 'lucide-react';

const BoardPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  
  const [board, setBoard] = useState(null);
  const [activeView, setActiveView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}`);
      const data = await response.json();
      
      if (data.success) {
        setBoard(data.board);
        // Set default view
        const defaultView = data.board.views?.find(v => v.isDefault) || data.board.views?.[0];
        setActiveView(defaultView);
      } else {
        alert('Board not found');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching board:', error);
      alert('Failed to load board');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">Loading board...</div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">Board not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Board Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Board Name & Dropdown */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center text-white font-bold">
              {board.name.charAt(0)}
            </div>
            <button className="flex items-center gap-2 text-xl font-semibold hover:bg-gray-100 px-3 py-1 rounded">
              {board.name}
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>
      </div>

      {/* Views/Sections Navigation */}
      <div className="bg-white border-b">
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
              {view.icon === 'document' && '📄'}
              {view.icon === 'chart' && '📊'}
              {view.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {activeView?.type === 'main' && (
          <MainBoardView board={board} />
        )}
        
        {activeView?.type === 'table' && activeView.id === 'getting-started' && (
          <GettingStartedView />
        )}
        
        {activeView?.type === 'table' && activeView.id === 'grant-providers' && (
          <GrantProvidersView board={board} />
        )}
        
        {activeView?.type === 'dashboard' && (
          <GrantsDashboardView board={board} />
        )}
      </div>
    </div>
  );
};

// ✅ Main Board View
const MainBoardView = ({ board }) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border">
        {/* Board Table */}
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Item</th>
              {board.columns.owner && <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Owner</th>}
              {board.columns.status && <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>}
              {board.columns.dueDate && <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Due Date</th>}
              {board.columns.budget && <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Budget</th>}
            </tr>
          </thead>
          <tbody>
            {board.items?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.title}</td>
                {board.columns.owner && <td className="px-4 py-3">{item.data?.owner || '-'}</td>}
                {board.columns.status && (
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {item.data?.status || 'Not Set'}
                    </span>
                  </td>
                )}
                {board.columns.dueDate && <td className="px-4 py-3">{item.data?.dueDate || '-'}</td>}
                {board.columns.budget && <td className="px-4 py-3">${item.data?.budget?.toLocaleString() || '0'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Getting Started View
const GettingStartedView = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border p-8">
        <h2 className="text-2xl font-bold mb-4">🚀 Getting Started with Grants Management</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Step 1: Set Up Your Pipeline</h3>
            <p className="text-gray-700">Navigate to "Grants Pipeline" to add your grant applications</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Step 2: Add Grant Providers</h3>
            <p className="text-gray-700">Go to "Grant Providers" to maintain your database of funding organizations</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Step 3: Monitor Progress</h3>
            <p className="text-gray-700">Use "Grants Dashboard" to track deadlines and success rates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Grant Providers View
const GrantProvidersView = ({ board }) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Grant Providers Database</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Provider Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Focus Area</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Typical Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500 italic" colSpan="4">
                No providers added yet. Click "Add Item" to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Grants Dashboard View
const GrantsDashboardView = ({ board }) => {
  const totalGrants = board.items?.length || 0;
  const totalBudget = board.items?.reduce((sum, item) => sum + (item.data?.budget || 0), 0) || 0;
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Grants Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg border p-6">
          <div className="text-3xl font-bold text-blue-600">{totalGrants}</div>
          <div className="text-gray-600 mt-2">Total Grant Applications</div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="text-3xl font-bold text-green-600">${totalBudget.toLocaleString()}</div>
          <div className="text-gray-600 mt-2">Total Grant Amount</div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="text-3xl font-bold text-orange-600">3</div>
          <div className="text-gray-600 mt-2">Upcoming Deadlines</div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
        <div className="space-y-3">
          {board.items?.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">Due: {item.data?.dueDate}</div>
              </div>
              <div className="text-lg font-semibold text-green-600">
                ${item.data?.budget?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;