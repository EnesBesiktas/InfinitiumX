import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchWithAI = async (query) => {
  try {
    const response = await apiClient.post('/api/v1/packages', {
      query: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error during AI search:', error);
    throw error;
  }
};

// Original Functions
export const getHealth = () => {
  return apiClient.get('/healthz');
};

export const getDetailedHealth = () => {
  return apiClient.get('/health/detailed');
};

export const getApiConfig = () => {
  return apiClient.get('/api/config');
};

export const clearCache = () => {
  return apiClient.post('/clear-cache');
};

// New Search API Functions
export const searchProducts = (query, limit = 20) => {
  return apiClient.post('/api/v1/search', { query, limit });
};

export const getProductById = (productId) => {
  return apiClient.get(`/products/${productId}`);
};

export const getSearchSuggestions = (query) => {
  return apiClient.get('/search/suggestions', { params: { q: query } });
};

export const getTrendingSearches = () => {
  return apiClient.get('/search/trending');
};

export const bookmarkProduct = (productId) => {
  return apiClient.post(`/products/${productId}/bookmark`);
};

export const removeBookmark = (productId) => {
  return apiClient.delete(`/products/${productId}/bookmark`);
};

export const getUserBookmarks = (userId) => {
  return apiClient.get(`/users/${userId}/bookmarks`);
};

export const getSearchHistory = (userId) => {
  return apiClient.get(`/users/${userId}/search-history`);
};

export const deleteSearchHistory = (userId) => {
  return apiClient.delete(`/users/${userId}/search-history`);
};

export const getRecommendations = (userId) => {
  return apiClient.get(`/users/${userId}/recommendations`);
};

export const getSearchHealth = () => {
  return apiClient.get('/health');
};

export default apiClient;
