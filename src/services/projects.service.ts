import axiosApi from '@/helper/api_helper'
import { CATEGORY_COLORS } from '@/shared/constants/color'

type CategoryColors = typeof CATEGORY_COLORS
type ColorKeys = keyof CategoryColors
export type UppercaseColorKeys = Uppercase<ColorKeys>

export interface CreateProjectRequest {
  name: string
  color: UppercaseColorKeys
}

export interface UpdateProjectRequest {
  id: number
  name: string
  color: string
}

export interface GetProjectRequest {
  projectId: number
}

export interface Project {
  id: number
  name: string
  color: string
}

export const createProject = async (
  payload: CreateProjectRequest,
): Promise<Project> => {
  const { data } = await axiosApi.post(`projects`, payload)
  return data
}

export const updateProject = async ({
  id,
  color,
  name,
}: UpdateProjectRequest) => {
  const response = await axiosApi.put(`/projects/${id}`, { name, color })
  return response.data
}

export const deleteProject = async ({ projectId }: GetProjectRequest) => {
  const response = await axiosApi.delete(`projects/${projectId}`)
  return response.data
}
