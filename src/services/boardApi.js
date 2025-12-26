// src/services/boardApi.js - API Service for Board Operations
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// ================================
// CREATE BOARD FROM TEMPLATE
// ================================
export const createBoardFromTemplate = async (templateId, templateData, userId, userEmail) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/from-template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateId,
        templateData,
        userId,
        userEmail
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create board');
    }

    return data;
  } catch (error) {
    console.error('Error creating board from template:', error);
    throw error;
  }
};

// ================================
// GET BOARD BY ID
// ================================
export const getBoardById = async (boardId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch board');
    }

    return data;
  } catch (error) {
    console.error('Error fetching board:', error);
    throw error;
  }
};

// ================================
// ADD ITEM TO BOARD
// ================================
export const addItemToBoard = async (boardId, groupId, itemData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: itemData.name, 
        group: groupId,       
        data: itemData        
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add item');
    }

    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// ================================
// UPDATE ITEM
// ================================
export const updateBoardItem = async (boardId, itemId, itemData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: itemData
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update item');
    }

    return data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// ================================
// DELETE ITEM
// ================================
export const deleteItemFromBoard = async (boardId, itemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete item');
    }

    return data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// ================================
// ADD COLUMN
// ================================
export const addColumnToBoard = async (boardId, columnTitle, columnType = 'text') => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: columnTitle,
        type: columnType
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add column');
    }

    return data;
  } catch (error) {
    console.error('Error adding column:', error);
    throw error;
  }
};

// ================================
// UPDATE COLUMN
// ================================
export const updateBoardColumn = async (boardId, columnId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update column');
    }

    return data;
  } catch (error) {
    console.error('Error updating column:', error);
    throw error;
  }
};

// ================================
// DELETE COLUMN
// ================================
export const deleteColumnFromBoard = async (boardId, columnId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete column');
    }

    return data;
  } catch (error) {
    console.error('Error deleting column:', error);
    throw error;
  }
};

// ================================
// GET USER BOARDS
// ================================
export const getUserBoards = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user boards');
    }

    return data;
  } catch (error) {
    console.error('Error fetching user boards:', error);
    throw error;
  }
};

// ================================
// UPDATE BOARD NAME
// ================================
export const updateBoardName = async (boardId, newName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update board name');
    }

    return data;
  } catch (error) {
    console.error('Error updating board name:', error);
    throw error;
  }
};

export default {
  createBoardFromTemplate,
  getBoardById,
  addItemToBoard,
  updateBoardItem,
  deleteItemFromBoard,
  addColumnToBoard,
  updateBoardColumn,
  deleteColumnFromBoard,
  getUserBoards,
  updateBoardName
};