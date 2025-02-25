import axiosApi from '@/helper/api_helper'
import {
  CreateSectionRequest,
  DeleteSectionRequest,
  UpdateSectionRequest,
} from '@/shared/types/section'

export const createSection = async ({
  projectId,
  name,
}: CreateSectionRequest) => {
  const response = await axiosApi.post(`projects/${projectId}/sections`, {
    name,
  })
  return response.data
}

export const updateSection = async ({
  projectId,
  sectionId,
  name,
}: UpdateSectionRequest) => {
  const response = await axiosApi.put(
    `projects/${projectId}/sections/${sectionId}`,
    {
      name,
    },
  )
  return response.data
}

export const deleteSection = async ({
  sectionId,
  projectId,
}: DeleteSectionRequest) => {
  const response = await axiosApi.delete(
    `projects/${projectId}/sections/${sectionId}`,
  )
  return response.data
}
