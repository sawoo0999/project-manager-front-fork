import axiosApi from '@/helper/api_helper'
import {
  CreateProjectRequest,
  GetProjectRequest,
  UpdateProjectRequest,
} from '@/shared/types/project'

export const createProject = async ({ name, color }: CreateProjectRequest) => {
  const { data } = await axiosApi.post(`projects`, { name, color })
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
