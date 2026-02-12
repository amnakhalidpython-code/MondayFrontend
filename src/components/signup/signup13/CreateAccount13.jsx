import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, FileText, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBoardContext } from '../../../context/BoardContext';
import { useAuth } from '../../../context/AuthContext';

// Helper to map column IDs to readable labels
const getColumnLabel = (id) => {
  const map = {
    owner: 'Owner',
    status: 'Status',
    dueDate: 'Due date',
    priority: 'Priority',
    notes: 'Notes',
    budget: 'Budget',
    files: 'Files',
    timeline: 'Timeline',
    lastUpdated: 'Last updated'
  };
  return map[id] || id.charAt(0).toUpperCase() + id.slice(1);
};

const CreateAccount13 = () => {
  const navigate = useNavigate();
  const { boardData, setBoardData } = useBoardContext();
  const { user } = useAuth();

  const boardName = boardData.boardName || 'My first project';
  const [taskNames, setTaskNames] = useState(['', '', '']); // Default 3 empty tasks
  const [isCreating, setIsCreating] = useState(false);

  // Determine active columns from context, or default to the ones in the design
  const contextColumns = boardData.selectedColumns
    ? Object.keys(boardData.selectedColumns).filter(key => boardData.selectedColumns[key])
    : [];

  // If no columns selected in context, default to the standard design view
  const activeColumns = contextColumns.length > 0
    ? contextColumns
    : ['owner', 'status', 'dueDate'];

  const handleTaskChange = (index, value) => {
    const newTasks = [...taskNames];
    newTasks[index] = value;
    setTaskNames(newTasks);
    // Sync context for persistence
    setBoardData(prev => ({ ...prev, tasks: newTasks }));
  };

  const handleGetStarted = async () => {
    setIsCreating(true);
    try {
      // 1. Resolve User Info
      const storedUser = sessionStorage.getItem('mondayUser');
      const storedEmail = sessionStorage.getItem('mondaySignupEmail') || localStorage.getItem('userEmail');
      let userId = null;
      let userEmail = null;

      if (user) {
        userId = user.uid;
        userEmail = user.email;
      } else if (storedUser) {
        try {
          const u = JSON.parse(storedUser);
          userId = u.uid;
          userEmail = u.email;
        } catch (e) { console.error("Parse error", e); }
      } else if (storedEmail) {
        userId = storedEmail;
        userEmail = storedEmail;
      }

      // 2. Prepare Payload
      // Filter out empty task strings if you want, or send them as placeholder items
      const finalTasks = taskNames.map((t, i) => t || `Task ${i + 1}`);

      const payload = {
        boardName: boardName,
        // Send the raw boolean map from context, or reconstruct it from activeColumns
        selectedColumns: boardData.selectedColumns || { owner: true, status: true, dueDate: true },
        selectedWidgets: boardData.selectedWidgets || {},
        tasks: finalTasks,
        userId: userId || 'guest',
        userEmail: userEmail
      };

      // 3. Fetch Backend
      const response = await fetch('http://localhost:5000/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Created:', data);
        // Navigate to the new board
        navigate(`/boards/${data.board._id}`);
      } else {
        alert('Failed to create workspace: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Helper to render cell content based on column type and row index (for mock visualization)
  const renderCellContent = (colType, rowIdx) => {
    if (colType === 'owner') {
      return (
        <img src="https://cdn1.monday.com/dapulse_default_photo.png" alt="owner" className="w-[26px] h-[26px] rounded-full" />
      );
    }
    if (colType === 'status') {
      const statusColors = ['#fdab3d', '#00c875', '#df2f4a']; // Working (Orange), Done (Green), Stuck (Red)
      const statusLabels = ['Working on it', 'Done', 'Stuck'];
      const color = statusColors[rowIdx % 3];
      const label = statusLabels[rowIdx % 3];
      return (
        <div className="w-full h-full flex items-center justify-center text-white" style={{ backgroundColor: color }}>
          <span className="text-[15px] leading-[40px] truncate px-1">{label}</span>
        </div>
      );
    }
    if (colType === 'dueDate') {
      const dates = ['Dec 7', 'Dec 8', 'Dec 9'];
      const icons = [
        <span key="1" className="text-red-500 text-sm mr-1">⚠</span>,
        <span key="2" className="text-green-500 text-sm mr-1">✓</span>,
        <span key="3" className="text-gray-500 text-sm mr-1">◐</span>
      ];
      return (
        <div className="flex items-center justify-center w-full h-full bg-white">
          {icons[rowIdx % 3]}
          <span className="text-[15px] text-[#323338]">{dates[rowIdx % 3]}</span>
        </div>
      );
    }
    if (colType === 'priority') {
      const priorityColor = rowIdx === 0 ? '#5eb7f1' : rowIdx === 1 ? '#401694' : '#5559df';
      const priorityText = rowIdx === 0 ? 'Low' : rowIdx === 1 ? 'High' : 'Medium';
      return (
        <div className="flex items-center justify-center w-full h-full" style={{ backgroundColor: priorityColor }}>
          <span className="text-[15px] text-white leading-[40px]">{priorityText}</span>
        </div>
      );
    }

    // --- UPDATED CELLS TO MATCH SCREENSHOTS ---

    // 1. FILES: Purple solid square with white icon
    if (colType === 'files') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-white">
          <div className="w-[24px] h-[24px] bg-[#6161ff] rounded flex items-center justify-center">
            <img src="https://dapulse-res.cloudinary.com/image/upload/file.png" alt="file" className="w-[20px] h-[24px]" />
          </div>
        </div>
      );
    }

    // 2. LAST UPDATED: Grey circle user icon + Text centered
    if (colType === 'lastUpdated') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-white gap-2">
          <div className="w-[26px] h-[26px] bg-[#e6e9ef] rounded-full flex items-center justify-center">
            <img src="https://cdn1.monday.com/dapulse_default_photo.png" alt="user" className="w-5 h-5 rounded-full" />
             </div>
            <span className="text-[15px] text-[#323338]">{rowIdx + 2}h ago</span>         

        </div>
      );
    }

    // 3. BUDGET: Simple text
    if (colType === 'budget') {
      const budgets = ['$100', '$1000', '$500'];
      return (
        <div className="flex items-center justify-center w-full h-full bg-white">
          <span className="text-[15px] text-[#323338]">{budgets[rowIdx % 3]}</span>
        </div>
      );
    }

    // 4. TIMELINE: Periwinkle/Blue Pill
    if (colType === 'timeline') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-white">
          <div className="h-[20px] w-[85px] bg-[#579bfc] rounded-full"></div>
        </div>
      );
    }

    // 5. NOTES: Light grey small pill/dash
    if (colType === 'notes') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-white">
          <div className="h-1 w-12 bg-[#c3c6d4] rounded"></div>
        </div>
      )
    }

    // Default/Fallback for other columns
    return <div className="h-1 w-10 bg-[#e6e9ef] rounded"></div>;
  };

  return (
    <div className="fixed inset-0 bg-[rgba(41,47,76,0.7)] flex items-center justify-center" style={{ fontFamily: 'Figtree, Roboto, sans-serif' }}>
      {/* Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #c3c6d4;
          border-radius: 10px;
          border: 2px solid #ffffff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #808191;
        }
      `}</style>

      <div className="bg-white w-full h-full overflow-hidden shadow-2xl flex relative">
        <button className="fixed top-2.5 right-2.5 z-10 w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 transition-colors" aria-label="Close">
          <X className="w-5 h-5 text-[#323338]" />
        </button>

        {/* LEFT PANEL */}
        <div className="w-1/2 flex flex-col justify-between bg-white">
          <div className="flex-1 overflow-y-auto px-20 pt-20 pb-12">
            <div className="flex justify-between items-center mb-11">
              <img className="h-[25px]" src="https://dapulse-res.cloudinary.com/image/upload/assets/work-management.png" alt="monday work management" />
            </div>

            <div className="max-w-[600px] min-w-[375px]">
              <div className="mb-6">
                <h2 className="text-[24px] font-medium text-[#323338] leading-[30px] tracking-[-0.1px] mb-2" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
                  List your projects
                </h2>
              </div>

              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      value={taskNames[index]}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder={`Task ${index + 1}`}
                      maxLength={40}
                      className="w-full h-[40px] px-3 border border-[#c3c6d4] rounded text-[15px] text-[#323338] focus:outline-none focus:border-[#0073ea] focus:ring-1 focus:ring-[#0073ea]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 px-20 py-6 flex justify-between items-center bg-white">
            <Link to='/twelve'>
              <button className="px-4 py-2 border border-[#c3c6d4] rounded text-[#323338] hover:bg-[#e6e9ef] transition-colors flex items-center gap-1">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
            </Link>

            <button
              onClick={handleGetStarted}
              disabled={isCreating}
              className={`px-4 py-2 rounded text-white transition-colors flex items-center gap-1 ${isCreating ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0073ea] hover:bg-[#0060b9]'}`}
            >
              {isCreating ? 'Creating...' : 'Get started'} {!isCreating && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL - PREVIEW */}
        <div className="w-1/2 bg-[#eceff8] flex items-center justify-center overflow-hidden">
          <div className="bg-white w-full h-[650px] relative ml-16 rounded-tl-2xl rounded-bl-2xl overflow-hidden"
            style={{ filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))', paddingTop: '30px', paddingLeft: '30px' }}>

            <div className="mb-6">
              <h1 className="text-[32px] font-medium text-[#323338] leading-[40px] tracking-[-0.5px] mb-4" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
                {boardName}
              </h1>
              <div className="flex gap-4 border-b border-[#d0d4e4]">
                <button className="pb-2 px-1 text-[15px] font-medium text-[#323338] border-b-2 border-[#0073ea]">Table</button>
                <button className="pb-2 px-1 text-[24px] text-[#676879] leading-none">+</button>
              </div>
            </div>

            <div className="h-[456px] flex">

              {/* FIXED LEFT COLUMN (GROUPS + TASK NAMES) */}
              <div style={{ width: '240px', flexShrink: 0, zIndex: 10 }} className="shadow-[2px_0_5px_rgba(0,0,0,0.05)] bg-white">

                {/* Group 1 */}
                <div className="mb-0">
                  {/* Group Header */}
                  <div className="flex items-center mb-3 pl-2" style={{ height: '24px' }}>
                    <div className="h-1.5 w-[120px] bg-[#579bfc] rounded"></div>
                  </div>

                  {/* Task Header Cell */}
                  <div className="flex items-center bg-white"
                    style={{ borderLeft: '4px solid #579bfc', borderTop: '0.8px solid #d0d4e4', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', borderTopLeftRadius: '4px', height: '40px', paddingLeft: '12px' }}>
                    <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                  </div>

                  {/* Task Rows - UPDATED LOGIC HERE */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center bg-white"
                      style={{ borderLeft: '4px solid #579bfc', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', height: '40px', paddingLeft: '12px' }}>
                      <span className="text-[15px] text-[#323338] truncate">
                        {taskNames[i] || `Task ${i + 1}`}
                      </span>
                    </div>
                  ))}


                  {/* Empty Footer Row */}
                  <div className="flex items-center bg-white"
                    style={{ borderLeft: '4px solid rgba(87, 155, 252, 0.5)', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', borderBottomLeftRadius: '4px', height: '40px', paddingLeft: '12px' }}>
                    <div className="h-1 w-20 bg-[rgba(103,104,121,0.1)] rounded"></div>
                  </div>
                </div>

                {/* Group 2 (Visual Spacer) */}
                <div className="mt-4">
                  <div className="flex items-center mb-3 pl-2" style={{ height: '24px' }}>
                    <div className="h-1.5 w-[120px] bg-[#00c875] rounded"></div>
                  </div>
                  <div className="flex items-center bg-white" style={{ borderLeft: '4px solid #00c875', borderTop: '0.8px solid #d0d4e4', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', borderTopLeftRadius: '4px', height: '40px', paddingLeft: '12px' }}><div className="h-1 w-20 bg-[#c3c6d4] rounded"></div></div>
                  <div className="flex items-center bg-white" style={{ borderLeft: '4px solid rgba(0, 200, 117, 0.5)', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', borderBottomLeftRadius: '4px', height: '40px', paddingLeft: '12px' }}><div className="h-1 w-20 bg-[rgba(103,104,121,0.1)] rounded"></div></div>
                </div>
              </div>

              {/* SCROLLABLE RIGHT COLUMNS */}
              <div className="flex-1 min-w-0 overflow-x-auto custom-scrollbar">

                {/* Group 1 Data */}
                <div className="mb-0">
                  {/* Spacer for Group Header Title */}
                  <div style={{ height: '24px', marginBottom: '12px' }}></div>

                  {/* Column Headers */}
                  <div className="flex" style={{ height: '40px' }}>
                    {activeColumns.map((col) => (
                      <div key={col} className="flex items-center justify-center bg-white" style={{ borderTop: '0.8px solid #d0d4e4', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', width: '136px', flexShrink: 0 }}>
                        <span className="text-[15px] text-[#323338]">{getColumnLabel(col)}</span>
                      </div>
                    ))}
                    {/* Add Column Button */}
                    <div className="flex items-center justify-center bg-white" style={{ width: '48px', borderTop: '0.8px solid #d0d4e4', borderBottom: '0.8px solid #d0d4e4' }}>
                      <span className="text-[#676879] text-lg font-light">+</span>
                    </div>
                  </div>

                  {/* Data Rows */}
                  {[0, 1, 2].map((rowIdx) => (
                    <div key={rowIdx} className="flex" style={{ height: '40px' }}>
                      {activeColumns.map((col) => (
                        <div key={`${rowIdx}-${col}`} className="flex items-center justify-center overflow-hidden"
                          style={{ borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', width: '136px', flexShrink: 0, backgroundColor: '#fff' }}>
                          {renderCellContent(col, rowIdx)}
                        </div>
                      ))}
                      <div className="bg-white" style={{ width: '48px', borderBottom: '0.8px solid #d0d4e4' }}></div>
                    </div>
                  ))}

                  {/* Empty Footer Rows */}
                  <div className="flex" style={{ height: '40px' }}>
                    {activeColumns.map(col => <div key={col} className="bg-white" style={{ borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', width: '136px', flexShrink: 0 }}></div>)}
                    <div className="bg-white" style={{ width: '48px', borderBottom: '0.8px solid #d0d4e4' }}></div>
                  </div>
                </div>

                {/* Group 2 Data (Visual Spacer) */}
                <div className="mt-4">
                  <div style={{ height: '24px', marginBottom: '12px' }}></div>
                  <div className="flex" style={{ height: '40px' }}>
                    {activeColumns.map((col) => (
                      <div key={col} className="flex items-center justify-center bg-white" style={{ borderTop: '0.8px solid #d0d4e4', borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', width: '136px', flexShrink: 0 }}>
                        <span className="text-[15px] text-[#323338]">{getColumnLabel(col)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-center bg-white" style={{ width: '48px', borderTop: '0.8px solid #d0d4e4', borderBottom: '0.8px solid #d0d4e4' }}><span className="text-[#676879] text-lg font-light">+</span></div>
                  </div>
                  <div className="flex" style={{ height: '40px' }}>
                    {activeColumns.map(col => <div key={col} className="bg-white" style={{ borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', width: '136px', flexShrink: 0 }}></div>)}
                    <div className="bg-white" style={{ width: '48px', borderBottom: '0.8px solid #d0d4e4' }}></div>
                  </div>
                  <div className="flex" style={{ height: '40px' }}>
                    {activeColumns.map(col => <div key={col} className="bg-white" style={{ borderBottom: '0.8px solid #d0d4e4', borderRight: '0.8px solid #d0d4e4', width: '136px', flexShrink: 0 }}></div>)}
                    <div className="bg-white" style={{ width: '48px', borderBottom: '0.8px solid #d0d4e4' }}></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount13;