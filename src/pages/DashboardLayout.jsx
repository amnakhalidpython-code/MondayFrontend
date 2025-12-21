// src/pages/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MondayCRMNavbar from '../components/mondayCRM-navbar/MondayCRMNavbar';
import Sidebar from '../components/sidebar/Sidebar';
import MondayHeader from '../components/mondayCRM-navbar/MondayHeader';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
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
      console.error('❌ Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBoardClick = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <div className="dashboard-layout">
      {/* ✅ Top Navbar - Full Width */}
      <MondayCRMNavbar />
      
      {/* ✅ Main Container: Sidebar + Content */}
      <div className="dashboard-container">
        
        {/* ✅ Left Sidebar - NO MARGIN/PADDING */}
        <div className="dashboard-sidebar-wrapper">
          <Sidebar boards={boards} onBoardClick={handleBoardClick} />
        </div>
        
        {/* ✅ Right Content Area */}
        <div className="dashboard-content-wrapper">
          {/* Optional Header */}
          <MondayHeader />
          
          {/* Main Content */}
          <div className="dashboard-main-content">
            <Outlet context={{ boards, loading, onBoardClick: handleBoardClick }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;