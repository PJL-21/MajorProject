import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the JWT token in the request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await api.get('/expenses');
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Add more API functions as needed

export default api;
