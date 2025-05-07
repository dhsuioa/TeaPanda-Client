import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { config } from '../config'
import { useRouter } from 'vue-router'

const router = useRouter()

const apiClient: AxiosInstance = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (axiosConfig: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwt')
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`
    }
    return axiosConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt')
      router.push('/auth')
      console.error('Unauthorized, logging out or redirecting...')
    }
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error.response?.data || error)
  }
)

export default apiClient