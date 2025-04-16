import axiosApi from '@/helper/api_helper'

export interface User {
  id: number
  email: string
  nickname: string
  image_url?: string
}

export interface Project {
  id: string
  name: string
  color: string
}

// export interface UpdateProfileRequest {
//   nickname: string
//   image: File | string | null
// }

export const getUser = async (): Promise<User> => {
  const response = await axiosApi.get('/users')
  return response.data
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await axiosApi.get('/projects')
  return response.data
}

export const updateProfile = async (payload: FormData) => {
  const response = await axiosApi.put('/users', payload)
  return response.data
}
