import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://blog-app-4mcq.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// User APIs
export const userAPI = {
  register: async (formData) => {
    return api.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response
  },

  logout: async () => {
    const response = await api.get('/users/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return response
  },

  getMyProfile: async () => {
    return api.get('/users/my-profile')
  },

  getAdmins: async () => {
    return api.get('/users/admins')
  },
}

// Blog APIs
export const blogAPI = {
  getAllBlogs: async () => {
    return api.get('/blogs/all-blogs')
  },

  getSingleBlog: async (id) => {
    return api.get(`/blogs/single-blog/${id}`)
  },

  getMyBlogs: async () => {
    return api.get('/blogs/my-blog')
  },

  createBlog: async (formData) => {
    return api.post('/blogs/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  updateBlog: async (id, data) => {
    return api.put(`/blogs/update/${id}`, data)
  },

  deleteBlog: async (id) => {
    return api.delete(`/blogs/delete/${id}`)
  },
}

export default api

