/**
 * Donor API Service
 * Handles all API calls related to donors
 */

import { API_ENDPOINTS } from './config';

/**
 * Fetch all donors with optional filters
 */
export const fetchDonors = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.order) queryParams.append('order', params.order);
    if (params.status) queryParams.append('status', params.status);

    const url = `${API_ENDPOINTS.DONORS}?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching donors:', error);
    throw error;
  }
};

/**
 * Fetch single donor by ID
 */
export const fetchDonorById = async (id) => {
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_BY_ID(id));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching donor:', error);
    throw error;
  }
};

/**
 * Create new donor
 */
export const createDonor = async (donorData) => {
  try {
    const response = await fetch(API_ENDPOINTS.DONORS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donorData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create donor');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating donor:', error);
    throw error;
  }
};

/**
 * Update donor
 */
export const updateDonor = async (id, updates) => {
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
      throw new Error(errorData.message || 'Failed to update donor');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating donor:', error);
    throw error;
  }
};

/**
 * Delete donor
 */
export const deleteDonor = async (id) => {
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_BY_ID(id), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete donor');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting donor:', error);
    throw error;
  }
};

/**
 * Update custom field for donor
 */
export const updateDonorCustomField = async (id, columnKey, value) => {
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_CUSTOM_FIELD(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ column_key: columnKey, value }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update custom field');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating custom field:', error);
    throw error;
  }
};

/**
 * Upload file for donor
 */
export const uploadDonorFile = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(API_ENDPOINTS.DONOR_FILES(id), {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload file');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Get donor files
 */
export const fetchDonorFiles = async (id) => {
  try {
    const response = await fetch(API_ENDPOINTS.DONOR_FILES(id));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching donor files:', error);
    throw error;
  }
};
