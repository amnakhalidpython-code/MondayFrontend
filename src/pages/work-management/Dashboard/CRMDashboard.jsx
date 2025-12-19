import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MondayCRMNavbar from '../../../components/mondayCRM-navbar/MondayCRMNavbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import MondayHeader from '../../../components/mondayCRM-navbar/MondayHeader';

const CRMDashboard = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      // Get user ID from multiple sources
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

      console.log('Dashboard fetching boards for userId:', userId);

      if (!userId) {
        console.warn('No user ID found, showing empty dashboard');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://monday-clone-backend.vercel.app/api/boards/user/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setBoards(data.boards);
        console.log('✅ Dashboard - Boards loaded:', data.boards);
      }
    } catch (error) {
      console.error('❌ Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBoardClick = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <div className="min-h-screen bg-[#e1eff2]">
      {/* Top Navbar - Full Width */}
      <MondayCRMNavbar />
      
      {/* Main Layout: Sidebar (Left) + Content (Right) */}
      <div className="flex">
        {/* Left Sidebar - Fixed Width */}
        <div className="flex-shrink-0">
          <Sidebar boards={boards} onBoardClick={handleBoardClick} />
        </div>
        
        {/* Right Side Content - Takes Remaining Space */}
        <div className="flex-1">
          {/* Header */}
          <MondayHeader />
          
          {/* Main Content Area */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading...</div>
              </div>
            ) : boards.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mb-4">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome to monday.com!
                </h3>
                <p className="text-gray-600 mb-6">
                  You don't have any boards yet. Create your first board to get started.
                </p>
                <button 
                  onClick={() => navigate('/nine')}
                  className="px-6 py-3 bg-[#0073ea] text-white rounded-lg hover:bg-[#0060b9] transition-colors font-medium"
                >
                  Create your first board
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your boards
                  </h2>
                  <p className="text-gray-600">
                    {boards.length} {boards.length === 1 ? 'board' : 'boards'} available
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boards.map((board) => (
                    <div 
                      key={board._id}
                      onClick={() => handleBoardClick(board._id)}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer p-6 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                            {board.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {board.items?.length || 0} items
                          </p>
                        </div>
                        <div className="ml-3">
                          <svg 
                            className="w-8 h-8 text-blue-500"
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v10h10V5H5z"/>
                            <path d="M7 7h2v6H7V7zm4 0h2v6h-2V7z"/>
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                      </div>

                      {/* Views */}
                      {board.views && board.views.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {board.views.map((view) => (
                            <span 
                              key={view.id}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {view.icon === 'board' && '📋'}
                              {view.icon === 'chart' && '📊'}
                              {view.icon === 'document' && '📄'}
                              {' '}{view.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Columns Preview */}
                      {board.columns && (
                        <div className="flex flex-wrap gap-1">
                          {board.columns.owner && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                              Owner
                            </span>
                          )}
                          {board.columns.status && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                              Status
                            </span>
                          )}
                          {board.columns.dueDate && (
                            <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-xs">
                              Due Date
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;