import axios from 'axios'
import { ApiError } from '@/errors/ApiError'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const data = error.response?.data

    const message =
      data?.message ||
      error.message ||
      'Erro inesperado na comunicação com o servidor'

    if (status === 401) {
      console.error('Unauthorized, logging out...')
    }

    return Promise.reject(
      new ApiError(message, status, data)
    )
  }
)

export default axiosInstance