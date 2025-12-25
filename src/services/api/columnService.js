/**
 * Column API Service
 * Handles all API calls related to dynamic columns
 */

import { API_ENDPOINTS } from './config';

/**
 * Fetch all columns
 */
export const fetchColumns = async (includeInactive = false) => {
  try {
    const url = includeInactive 
      ? `${API_ENDPOINTS.COLUMNS}?includeInactive=true`
      : API_ENDPOINTS.COLUMNS;
      
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching columns:', error);
    throw error;
  }
};

/**
 * Fetch single column by ID
 */
export const fetchColumnById = async (id) => {
  try {
    const response = await fetch(API_ENDPOINTS.COLUMN_BY_ID(id));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching column:', error);
    throw error;
  }
};

/**
 * Create new column
 */
export const createColumn = async (columnData) => {
  try {
    const response = await fetch(API_ENDPOINTS.COLUMNS_ADD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(columnData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create column');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating column:', error);
    throw error;
  }
};

/**
 * Update column
 */
export const updateColumn = async (id, updates) => {
  try {
    const response = await fetch(API_ENDPOINTS.COLUMN_BY_ID(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update column');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating column:', error);
    throw error;
  }
};

/**
 * Delete column
 */
export const deleteColumn = async (id, permanent = false) => {
  try {
    const url = permanent 
      ? `${API_ENDPOINTS.COLUMN_BY_ID(id)}?permanent=true`
      : API_ENDPOINTS.COLUMN_BY_ID(id);
      
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete column');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting column:', error);
    throw error;
  }
};

/**
 * Reorder columns
 */
export const reorderColumns = async (columnOrders) => {
  try {
    const response = await fetch(API_ENDPOINTS.COLUMNS_REORDER, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ columnOrders }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to reorder columns');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reordering columns:', error);
    throw error;
  }
};

/**
 * Rename column
 */
export const renameColumn = async (id, newTitle) => {
  try {
    const response = await fetch(API_ENDPOINTS.COLUMN_BY_ID(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to rename column');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error renaming column:', error);
    throw error;
  }
};

/**
 * Duplicate column
 */
export const duplicateColumn = async (id) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.COLUMN_BY_ID(id)}/duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to duplicate column');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error duplicating column:', error);
    throw error;
  }
};

/**
 * Add column to the right
 */
export const addColumnToRight = async (id, columnData) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.COLUMN_BY_ID(id)}/add-to-right`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(columnData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add column');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding column to right:', error);
    throw error;
  }
};
