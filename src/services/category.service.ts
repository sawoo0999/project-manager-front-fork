import axiosApi from '@/helper/api_helper'
import axios from 'axios'

// interface CategoriesRequest {
//   project_id: number
// }

interface CreateCategoryRequest {
  project_id: number
  name: string
  description: string
  color: string
}

export interface Project {
  id: string
  name: string
  color: string
}

export const getAllCategories = async (projectNumber: number) => {
  try {
    const response = await axiosApi.get('/categories', {
      params: {
        project_id: projectNumber,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Request URL:', error.config?.url)
      console.log('Request Method:', error.config?.method)
      console.log('Request Params:', error.config?.params)
      console.log('Response Data:', error.response?.data)
    }
    throw error
  }
}

export const createCategory = async (requestData: CreateCategoryRequest) => {
  const response = await axiosApi.post('/categories', requestData)
  return response.data
}

export const getProjects = async () => {
  const response = await axiosApi.get('/projects')
  return response.data
}
