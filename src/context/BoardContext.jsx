import React, { createContext, useState, useContext } from 'react';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState({
    boardName: '',
    selectedColumns: {
      owner: true,
      status: true,
      dueDate: true,
      priority: false,
      lastUpdated: false,
      timeline: false,
      notes: false,
      budget: false,
      files: false
    },
    // Default Widgets (Step 11)
    selectedWidgets: {
      tasksOverview: true,
      tasksByStatus: true,
      tasksByOwner: true,
      overdueTasks: false,
      tasksByDueDate: false
    },
    // Default View (Step 12)
    selectedView: 'table',
    tasks: ['', '', ''] // Step 13
  });

  return (
    <BoardContext.Provider value={{ boardData, setBoardData }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);