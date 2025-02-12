import axiosApi from '@/helper/api_helper'
import { UppercaseColorKeys } from './projects.service'

// interface CategoriesRequest {
//   project_id: number
// }

export interface Category {
  projectId: number
  id: string
  name: string
  description: string
  color: string
}

interface CreateCategoryRequest {
  projectId: number
  name: string
  description: string
  color: UppercaseColorKeys
}

export const getAllCategories = async (projectNumber: number) => {
  try {
    const response = await axiosApi.get('/categories', {
      params: {
        projectId: projectNumber,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createCategory = async (payload: CreateCategoryRequest) => {
  const response = await axiosApi.post('/categories', payload)
  return response.data
}
