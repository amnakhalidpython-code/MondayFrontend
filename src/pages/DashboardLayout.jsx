// src/pages/DashboardLayout.jsx - Layout wrapper for Dashboard with Sidebar
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MondayCRMNavbar from '../components/mondayCRM-navbar/MondayCRMNavbar';
import Sidebar from '../components/sidebar/Sidebar';
import MondayHeader from '../components/mondayCRM-navbar/MondayHeader';

const DashboardLayout = () => {
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

      console.log('DashboardLayout fetching boards for userId:', userId);

      if (!userId) {
        console.warn('No user ID found');
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/boards/user/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setBoards(data.boards);
        console.log('✅ DashboardLayout - Boards loaded:', data.boards);
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
          
          {/* Main Content Area - Outlet for nested routes */}
          <div className="p-6">
            <Outlet context={{ boards, loading, onBoardClick: handleBoardClick }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
