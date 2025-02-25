import axiosApi from '@/helper/api_helper'
import { apiUrl } from '@/shared/constants/configure'
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  PasswordRequest,
  WithdrawalRequest,
} from '@/shared/types/auth'

export const postLogin = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosApi.post('/users/login', payload)
  return response.data
}

export const getLogout = async () => {
  try {
    const response = await axiosApi.get('/users/logout')
    return response.data
  } catch (error) {
    console.log('로그아웃 에러:', error)
    throw error
  }
}

export const postSignup = async (payload: SignupRequest) => {
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)
  console.log('API Base URL:', apiUrl)
  console.log('TEST:::', payload)
  const response = await axiosApi.post('/users', payload)
  return response?.data || {}
}

export const withdrawal = async ({ password }: WithdrawalRequest) => {
  const response = await axiosApi.delete(`users/withdraw`, {
    data: { password },
  })
  return response.data
}

export const confirmPassword = async ({ password }: PasswordRequest) => {
  const response = await axiosApi.post(`users/password`, { password })
  return response.data
}

export const updatePassword = async ({ password }: PasswordRequest) => {
  const response = await axiosApi.put(`users/password`, { password })
  return response.data
}
