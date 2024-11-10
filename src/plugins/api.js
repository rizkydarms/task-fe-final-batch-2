import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Biarkan proxy Vite mengarahkan ke server backend
  timeout: 1000,
});


// Optionally, you can add request/response interceptors here
// Request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `${token}` // Set the Authorization header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
