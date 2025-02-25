import { UppercaseColorKeys } from './common'

export interface Category {
  projectId: number
  id: number
  name: string
  description: string
  color: string
}

export interface CreateCategoryRequest {
  projectId: number
  name: string
  description: string
  color: UppercaseColorKeys
}

export interface UpdateCategoryRequest {
  projectId: number
  categoryId: number
  name: string
  description: string
  color: UppercaseColorKeys
}

export interface DeleteCategoryRequest {
  projectId: number
  categoryId: number
}
