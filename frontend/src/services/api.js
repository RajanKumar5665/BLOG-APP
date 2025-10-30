import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://blog-app-fat2.onrender.com/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const endpoints = {
  // User endpoints
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  myProfile: '/users/my-profile',
  admins: '/users/admins',

  // Blog endpoints
  createBlog: '/blogs/create',
  allBlogs: '/blogs/all-blogs',
  myBlogs: '/blogs/my-blog',
  singleBlog: (id) => `/blogs/single-blog/${id}`,
  updateBlog: (id) => `/blogs/update/${id}`,
  deleteBlog: (id) => `/blogs/delete/${id}`,
};

export default api;
