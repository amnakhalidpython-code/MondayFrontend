// src/pages/WorkspacePage.jsx - FINAL UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Search, 
  Star,
  MoreHorizontal,
  Grid3x3,
  List,
  Calendar,
  Clock,
  Users
} from 'lucide-react';

const WorkspacePage = ({ workspace }) => {  // ← Yeh prop add kiya (App.jsx se aayega)
  const navigate = useNavigate();
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchUserBoards();
  }, [user]);

  const fetchUserBoards = async () => {
    try {
      const storedUser = sessionStorage.getItem('mondayUser');
      const storedEmail = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail');
      
      let userId = null;

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser.uid;
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }

      if (!userId && storedEmail) {
        userId = storedEmail;
      }

      if (!userId && user?.uid) {
        userId = user.uid;
      }

      if (!userId) {
        console.warn('No user ID found');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://monday-clone-backend.vercel.app/api/boards/user/${encodeURIComponent(userId)}`);
      const data = await response.json();

      if (data.success) {
        setBoards(data.boards);
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = () => {
    navigate('/nine'); // Ya jo aapka board create page hai
  };

  const handleBoardClick = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  // ← Workspace ke liye color match (sidebar jaisa)
  const getWorkspaceColor = () => {
    const colorMap = {
      'Grants Management': '#067B4B',
      'Donor Management': '#FB275D',
      'monday Fundraising': '#FDAB3D',
      'Volunteer Registration Management': '#9cd326',
    };
    return colorMap[workspace] || '#579bfc'; // fallback blue
  };

  // ← First letter for avatar
  const getInitial = () => {
    if (!workspace) return 'M';
    const map = {
      'Grants Management': 'G',
      'Donor Management': 'D',
      'monday Fundraising': 'F',
      'Volunteer Registration Management': 'V'
    };
    return map[workspace] || workspace.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-500">Loading workspace...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Dynamic Workspace Name & Avatar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Workspace Avatar */}
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
                style={{ backgroundColor: getWorkspaceColor() }}
              >
                {getInitial()}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {workspace || 'Main workspace'}
                </h1>
                <p className="text-gray-500 mt-1">
                  {boards.length} {boards.length === 1 ? 'board' : 'boards'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Search</span>
              </button>

              <button 
                onClick={handleCreateBoard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add board
              </button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {boards.length === 0 ? (
          <EmptyState onCreateBoard={handleCreateBoard} />
        ) : (
          <>
            {viewMode === 'grid' ? (
              <GridView boards={boards} onBoardClick={handleBoardClick} />
            ) : (
              <ListView boards={boards} onBoardClick={handleBoardClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Baaki components same hi rahenge (EmptyState, GridView, BoardCard, ListView, BoardRow)

const EmptyState = ({ onCreateBoard }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Grid3x3 className="w-16 h-16 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No boards yet</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Create your first board to start organizing your work
      </p>
      <button 
        onClick={onCreateBoard}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        Create board
      </button>
    </div>
  );
};

// GridView, BoardCard, ListView, BoardRow – bilkul same rakho jo pehle the

const GridView = ({ boards, onBoardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map(board => (
        <BoardCard key={board._id} board={board} onClick={() => onBoardClick(board._id)} />
      ))}
    </div>
  );
};

const BoardCard = ({ board, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemCount = board.items?.length || 0;

  const getStatusColor = (status) => {
    const colors = {
      'Working on it': '#fdab3d',
      'Done': '#00c875',
      'Stuck': '#e44258',
      'Not Started': '#c4c4c4'
    };
    return colors[status] || '#c4c4c4';
  };

  const statusCounts = board.items?.reduce((acc, item) => {
    const status = item.data?.status || 'Not Started';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
    >
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {board.name}
          </h3>
          <button 
            onClick={(e) => e.stopPropagation()}
            className={`p-2 rounded-lg hover:bg-gray-200 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <List className="w-4 h-4" />
            <span>{itemCount} items</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(board.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {itemCount > 0 ? (
          <>
            <div className="mb-5">
              <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-gray-100">
                {Object.entries(statusCounts || {}).map(([status, count]) => (
                  <div
                    key={status}
                    style={{
                      width: `${(count / itemCount) * 100}%`,
                      backgroundColor: getStatusColor(status)
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {board.items.slice(0, 4).map((item, idx) => (
                <div key={item._id || idx} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getStatusColor(item.data?.status) }}
                  />
                  <span className="text-gray-700 text-sm truncate">{item.title || 'Untitled item'}</span>
                </div>
              ))}
              {itemCount > 4 && (
                <div className="text-sm text-gray-500 pl-6">
                  +{itemCount - 4} more items
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No items yet
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Only me</span>
        </div>
        <button onClick={(e) => e.stopPropagation()} className="text-yellow-500 hover:text-yellow-600">
          <Star className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ListView = ({ boards, onBoardClick }) => {
  // Same as before – no change needed
  return (
    <div className="bg-white rounded-lg border">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b bg-gray-50 text-sm font-medium text-gray-700">
        <div className="col-span-5">Board Name</div>
        <div className="col-span-2">Items</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Created</div>
        <div className="col-span-1"></div>
      </div>
      {boards.map(board => (
        <BoardRow key={board._id} board={board} onClick={() => onBoardClick(board._id)} />
      ))}
    </div>
  );
};

const BoardRow = ({ board, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemCount = board.items?.length || 0;
  const doneCount = board.items?.filter(item => item.data?.status === 'Done').length || 0;
  const progress = itemCount > 0 ? (doneCount / itemCount) * 100 : 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition-colors cursor-pointer items-center"
    >
      <div className="col-span-5 flex items-center gap-3">
        <Grid3x3 className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-900">{board.name}</span>
      </div>
      <div className="col-span-2 text-gray-600">{itemCount} items</div>
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="col-span-2 text-gray-600 text-sm">
        {new Date(board.createdAt).toLocaleDateString()}
      </div>
      <div className="col-span-1 flex justify-end">
        <button
          onClick={(e) => e.stopPropagation()}
          className={`p-1 rounded hover:bg-gray-200 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default WorkspacePage;