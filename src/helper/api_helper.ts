// libs/axios.ts
import { apiUrl } from '@/shared/constants/configure'
import sessionStore from '@/store/useSessionStore'
import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
axiosApi.interceptors.request.use(
  (config) => {
    const token = sessionStore.getState()?.access_token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 처리

    if (
      error.response?.status === 401 &&
      !error.config.url.includes('/login')
    ) {
      sessionStore.getState().logout()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (error.response?.data) {
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)

export default axiosApi
