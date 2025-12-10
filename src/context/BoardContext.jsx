// src/context/BoardContext.js
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
    }
  });

  return (
    <BoardContext.Provider value={{ boardData, setBoardData }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within BoardProvider');
  }
  return context;
};