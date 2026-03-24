import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: '',           // vite proxy handles it
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ✅ Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// ✅ Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      toast.error('Session expired. Please login again.')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      toast.error('Access denied.')
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.')
    } else if (!error.response) {
      toast.error('Network error. Is backend running?')
    }
    return Promise.reject(error)
  }
)

export default api
