import axiosApi from '@/helper/api_helper'
import { APIResponse } from '@/shared/types/response'

export interface FormData {
  title: string
  content: string
  startDate: Date | undefined
  endDate: Date | undefined
  categoryId: number
}
export interface Card {
  cardId: number
  sectionId: number
  title: string
  content: string
  startDate: string
  endDate: string
  completeDate: string | null
  color: string
  categoryName: string
  nickName: string
  photoUrl: string
}
export interface CreateCardRequest {
  projectId: number
  sectionId: number
  categoryId: number
  title: string
  content: string | undefined
  startDate: string
  endDate: string
}

export interface UpdateCardRequest {
  cardId: number
  data: FormData
}

export interface CardData {
  id: number
  title: string
  content: string
  startDate: string
  endDate: string
  completeDate: string | null
  categoryColor: string
  categoryName: string
  nickName: string
  photoUrl: string
}

export interface DeleteCardRequest {
  cardId: number
  projectId: number
}

export interface CompleteCardRequest {
  cardId: number
  completeDate: string | null
}

export interface ProgressCardRequest {
  cardId: number
}

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
