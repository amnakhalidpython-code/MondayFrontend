/**
 * Row API Service
 * Handles all CRUD API calls for table rows (Donors).
 */

import { API_ENDPOINTS } from './config';

/**
 * Get all rows (donors) with optional pagination, searching, and sorting.
 * @param {object} params - The query parameters.
 * @param {number} [params.page=1] - The page number for pagination.
 * @param {number} [params.limit=10] - The number of items per page.
 * @param {string} [params.search] - A search term to filter by name, email, or phone.
 * @param {string} [params.sortBy='createdAt'] - The field to sort by.
 * @param {string} [params.order='desc'] - The sort order ('asc' or 'desc').
 * @param {string} [params.status] - Filter by status ('potential', 'active', 'inactive').
 * @returns {Promise<object>} The API response with donors and pagination info.
 */
export const getAllRows = async (params = {}) => {
  const query = new URLSearchParams({
    page: params.page || 1,
    limit: params.limit || 10,
    sortBy: params.sortBy || 'createdAt',
    order: params.order || 'desc',
    ...params,
  }).toString();

  try {
    const response = await fetch(`${API_ENDPOINTS.DONORS}?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all rows:', error);
    throw error;
  }
};

/**
 * Get a single row (donor) by its ID.
 * @param {string} id - The ID of the row to fetch.
 * @returns {Promise<object>} The API response with the donor data.
 */
export const getRowById = async (id) => {
  if (!id) throw new Error('Row ID is required.');
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_BY_ID(id));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching row with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new row (donor).
 * @param {object} rowData - The data for the new row.
 * @param {string} rowData.donor_name - The name of the donor.
 * @param {string} rowData.email - The email of the donor.
 * @param {string} [rowData.phone] - The phone number of the donor.
 * @returns {Promise<object>} The API response with the newly created donor data.
 */
export const createRow = async (rowData) => {
  if (!rowData || !rowData.donor_name || !rowData.email) {
    throw new Error('New row data with at least name and email is required.');
  }
  try {
    const response = await fetch(API_ENDPOINTS.DONORS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create row');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating row:', error);
    throw error;
  }
};

/**
 * Update an existing row (donor).
 * @param {string} id - The ID of the row to update.
 * @param {object} updates - An object containing the fields to update.
 * @returns {Promise<object>} The API response with the updated donor data.
 */
export const updateRow = async (id, updates) => {
  if (!id) throw new Error('Row ID is required for updates.');
  if (!updates || Object.keys(updates).length === 0) {
    throw new Error('Updates object cannot be empty.');
  }
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_BY_ID(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update row');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating row with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a row (donor).
 * @param {string} id - The ID of the row to delete.
 * @returns {Promise<object>} The API response confirming the deletion.
 */
export const deleteRow = async (id) => {
  if (!id) throw new Error('Row ID is required for deletion.');
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_BY_ID(id), {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete row');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting row with ID ${id}:`, error);
    throw error;
  }
};
