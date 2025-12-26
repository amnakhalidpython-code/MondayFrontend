/**
 * API Configuration
 * Base URL and common settings for API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

export const API_ENDPOINTS = {
  // Donor endpoints
  DONORS: `${API_BASE_URL}/donors`,
  DONOR_BY_ID: (id) => `${API_BASE_URL}/donors/${id}`,
  DONOR_CUSTOM_FIELD: (id) => `${API_BASE_URL}/donors/${id}/custom`,
  DONOR_FILES: (id) => `${API_BASE_URL}/donors/${id}/files`,
  
  // Column endpoints
  COLUMNS: `${API_BASE_URL}/columns`,
  COLUMN_BY_ID: (id) => `${API_BASE_URL}/columns/${id}`,
  COLUMNS_ADD: `${API_BASE_URL}/columns/add`,
  COLUMNS_REORDER: `${API_BASE_URL}/columns/reorder`,
};

export default API_BASE_URL;
