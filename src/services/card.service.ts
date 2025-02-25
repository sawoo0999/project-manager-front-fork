import axiosApi from '@/helper/api_helper'
import {
  CompleteCardRequest,
  CreateCardRequest,
  DeleteCardRequest,
  ProgressCardRequest,
  UpdateCardRequest,
} from '@/shared/types/card'
import { APIResponse } from '@/shared/types/response'

export const createCard = async ({
  projectId,
  sectionId,
  categoryId,
  title,
  content,
  startDate,
  endDate,
}: CreateCardRequest) => {
  const response = await axiosApi.post(
    `projects/${projectId}/sections/${sectionId}/cards`,
    { categoryId, title, content, startDate, endDate },
  )
  return response.data
}

export const updateCard = async ({
  cardId,
  data,
}: UpdateCardRequest): Promise<APIResponse<null>> => {
  const response = await axiosApi.put(`/cards/${cardId}`, data)
  return response.data
}

export const deleteCard = async ({
  cardId,
  projectId,
}: DeleteCardRequest): Promise<APIResponse<null>> => {
  const response = await axiosApi.delete(`/cards/${cardId}`, {
    data: {
      projectId,
    },
  })
  return response.data
}

export const completeCard = async ({
  cardId,
  completeDate,
}: CompleteCardRequest): Promise<APIResponse<null>> => {
  console.log(completeDate)
  const response = await axiosApi.put(`/cards/${cardId}/complete`, {
    completeDate,
  })
  return response.data
}

export const progressCard = async ({
  cardId,
}: ProgressCardRequest): Promise<APIResponse<null>> => {
  const response = await axiosApi.put(`/cards/${cardId}/progress`)
  return response.data
}

export const createComment = async ({
  cardId,
  content,
}: {
  cardId: number
  content: string
}): Promise<APIResponse<null>> => {
  const response = await axiosApi.post(`/cards/${cardId}/comments`, { content })
  return response.data
}

export const editComment = async ({
  commentId,
  content,
}: {
  commentId: number
  content: string
}): Promise<APIResponse<null>> => {
  const response = await axiosApi.put(`/comments/${commentId}`, { content })
  return response.data
}

export const deleteComment = async ({
  commentId,
}: {
  commentId: number
}): Promise<APIResponse<null>> => {
  const response = await axiosApi.delete(`/comments/${commentId}`)
  return response.data
}
