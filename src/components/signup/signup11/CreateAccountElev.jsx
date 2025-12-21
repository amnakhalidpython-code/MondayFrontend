import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TasksOverviewIcon, TasksByStatusIcon, TasksByOwnerIcon, OverdueTasksIcon, TasksByDueDateIcon } from '../../icons/BoardIcons'



const CreateAccountEleven = () => {
   const navigate = useNavigate();
  const { userCategory } = useAuth();

   useEffect(() => {
    const category = userCategory || sessionStorage.getItem('userCategory');
    if (category === 'ngo' || category === 'nonprofit') {
      console.log('⏭️ Skipping this step for non-profit');
      navigate('/dashboard');
    }
  }, [userCategory, navigate]);
  
  if (userCategory === 'ngo' || userCategory === 'nonprofit') {
    return null;
  }
  const [selectedWidgets, setSelectedWidgets] = useState({
    tasksOverview: true,
    tasksByStatus: true,
    tasksByOwner: true,
    overdueTasks: false,
    tasksByDueDate: false
  });

  const toggleWidget = (widget) => {
    setSelectedWidgets(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const widgets = [
    { id: 'tasksOverview', label: 'Tasks overview', Icon: TasksOverviewIcon },
    { id: 'tasksByStatus', label: 'Tasks by status', Icon: TasksByStatusIcon },
    { id: 'tasksByOwner', label: 'Tasks by owner', Icon: TasksByOwnerIcon },
    { id: 'overdueTasks', label: 'Overdue tasks', Icon: OverdueTasksIcon },
    { id: 'tasksByDueDate', label: 'Tasks by due date', Icon: TasksByDueDateIcon }
  ];

  const hasAnySelected = Object.values(selectedWidgets).some(v => v);

  return (
    <div className="fixed inset-0 bg-[rgba(41,47,76,0.7)] flex items-center justify-center" style={{ fontFamily: 'Figtree, Roboto, ' }}> 
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
                  Get real-time insights with dashboards
                </h2>
                <p className="text-[14px] text-[#323338] leading-[20px]">
                  Customize the widgets you want to see in your dashboard.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {widgets.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => toggleWidget(id)}
                    className={`h-[40px] px-3  rounded-md flex items-center gap-2 transition-all text-[#323338] ${
                      selectedWidgets[id] 
                        ? 'border-2 border-[#0073ea] bg-white shadow-sm' 
                        : 'border border-[#c3c6d4] bg-white hover:bg-[#F0F0F1] shadow-sm'
                    }`}
                    aria-pressed={selectedWidgets[id]}
                  >
                    <Icon />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 px-20 py-6 flex justify-between items-center bg-white ">
          <Link to={
  userCategory === 'ngo' || userCategory === 'nonprofit' 
    ? '/eight' 
    : '/ten'
}>
            <button className="px-4 py-2 border border-[#c3c6d4] rounded text-[#323338] hover:bg-[#e6e9ef] transition-colors flex items-center gap-1">
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            </Link>
            
           <Link to='/twelve'>
            <button className="px-4 py-2 bg-[#0073ea] text-white rounded hover:bg-[#0060b9] transition-colors flex items-center gap-1">
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
            </Link>
            
          </div>
        </div>

        {/* RIGHT PANEL - DASHBOARD PREVIEW */}
        <div className="w-1/2 bg-[#eceff8] flex items-center" style={{ contain: 'strict' }}>
          <div className="bg-white w-full h-[650px] ml-16 flex flex-col" style={{ 
            filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px'
          }}>
            <div className=" pt-4 pb-4">
              <h1 className="text-[24px] font-medium text-[#676879] leading-[30px] tracking-[-0.1px] ml-6" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
                Project overview
              </h1>
            </div>
            
            {/* EMPTY STATE - No widgets selected */}
            {!hasAnySelected && (
              <div className="px-6 pb-4 bg-[#f6f7fb] flex-1 overflow-y-auto">
                <div className="p-2">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-[#ecedf5] rounded-lg h-[101px] border border-[#d0d4e4]"></div>
                    <div className="bg-[#ecedf5] rounded-lg h-[101px] border border-[#d0d4e4]"></div>
                    <div className="bg-[#ecedf5] rounded-lg h-[101px] border border-[#d0d4e4]"></div>
                    <div className="bg-[#ecedf5] rounded-lg h-[101px] border border-[#d0d4e4]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tasks Overview Widget - Always first row when selected */}
            {hasAnySelected && (
              <div className="px-6 pb-4 bg-[#f6f7fb] flex-1 overflow-y-auto">
                <div className="p-2">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4 flex flex-col">
                      <span className="text-[14px] text-[#676879] mb-3">All Tasks</span>
                      <div className="h-px bg-[#d0d4e4] mb-3"></div>
                      <span className="text-[24px] font-semibold text-[#323338] leading-none">14</span>
                    </div>
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-3 h-3 rounded-full bg-[#00c875]"></span>
                        <span className="text-[14px] text-[#676879]">Done</span>
                      </div>
                      <div className="h-px bg-[#d0d4e4] mb-3"></div>
                      <span className="text-[24px] font-semibold text-[#323338] leading-none">7</span>
                    </div>
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-3 h-3 rounded-full bg-[#fdab3d]"></span>
                        <span className="text-[14px] text-[#676879]">Working on it</span>
                      </div>
                      <div className="h-px bg-[#d0d4e4] mb-3"></div>
                      <span className="text-[24px] font-semibold text-[#323338] leading-none">5</span>
                    </div>
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-3 h-3 rounded-full bg-[#df2f4a]"></span>
                        <span className="text-[14px] text-[#676879]">Stuck</span>
                      </div>
                      <div className="h-px bg-[#d0d4e4] mb-3"></div>
                      <span className="text-[24px] font-semibold text-[#323338] leading-none">2</span>
                    </div>
                  </div>

                {/* Second Row - Status and Owner charts */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {selectedWidgets.tasksByStatus ? (
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4">
                      <h3 className="text-[14px] font-normal text-[#323338] mb-3">Tasks by status</h3>
                      <div className="h-px bg-[#d0d4e4] mb-4"></div>
                      <div className="flex items-center justify-center">
                        <img src="https://dapulse-res.cloudinary.com/image/upload/Pie-donut.svg" alt="Tasks by status chart" className="w-full max-w-[130px]" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                  )}

                  {selectedWidgets.tasksByOwner ? (
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4">
                      <h3 className="text-[14px] font-normal text-[#323338] mb-3">Tasks by owner</h3>
                      <div className="h-px bg-[#d0d4e4] mb-4"></div>
                      <div className="flex items-center justify-center">
                        <img src="https://dapulse-res.cloudinary.com/image/upload/tasksByOwnerChart.svg" alt="Tasks by owner chart" className="w-full max-w-[300px]" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                  )}
                </div>

                {/* Third Row - Overdue and Due Date charts */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedWidgets.overdueTasks ? (
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4">
                      <h3 className="text-[14px] font-normal text-[#323338] mb-3">Overdue tasks</h3>
                      <div className="h-px bg-[#d0d4e4] mb-4"></div>
                      <div className="flex items-center justify-center gap-4 py-2">
                        <div className="flex flex-col items-center">
                          <img src="https://dapulse-res.cloudinary.com/image/upload/Bar_5.svg" alt="Working on it bar" className="h-24 mb-2" />
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-[#fdab3d]"></span>
                            <span className="text-[14px] text-[#676879]">Working on it</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <img src="https://dapulse-res.cloudinary.com/image/upload/Bar_6.svg" alt="Stuck bar" className="h-24 mb-2" />
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-[#df2f4a]"></span>
                            <span className="text-[14px] text-[#676879]">Stuck</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                  )}

                  {selectedWidgets.tasksByDueDate ? (
                    <div className="bg-white border border-[#d0d4e4] rounded-lg p-4">
                      <h3 className="text-[14px] font-normal text-[#323338] mb-3">Tasks by due date</h3>
                      <div className="h-px bg-[#d0d4e4] mb-4"></div>
                      <div className="relative">
                        <img src="https://dapulse-res.cloudinary.com/image/upload/dashboardBackground.svg" alt="Dashboard background" className="w-full" />
                        <div className="absolute inset-0 grid grid-cols-4 gap-1 items-end justify-center px-4 pb-8">
                          <div className="flex flex-col items-center gap-2">
                            <img src="https://dapulse-res.cloudinary.com/image/upload/Bar_1.svg" alt="Jun bar" className="w-full" style={{maxHeight: '90px'}} />
                            <span className="text-[14px] text-[#323338]">Jun'</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <img src="https://dapulse-res.cloudinary.com/image/upload/Bar_2.svg" alt="Jul bar" className="w-full" style={{maxHeight: '90px'}} />
                            <span className="text-[14px] text-[#323338]">Jul'</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <img src="https://dapulse-res.cloudinary.com/image/upload/Bar_3.svg" alt="Aug bar" className="w-full" style={{maxHeight: '90px'}} />
                            <span className="text-[14px] text-[#323338]">Aug'</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <img src="https://dapulse-res.cloudinary.com/image/upload/Bar_4.svg" alt="Sep bar" className="w-full" style={{maxHeight: '90px'}} />
                            <span className="text-[14px] text-[#323338]">Sep'</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#ecedf5] rounded-lg h-[200px] border border-[#d0d4e4]"></div>
                  )}
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountEleven;