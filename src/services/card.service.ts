import axiosApi from '@/helper/api_helper'

export interface FormData {
  title: string
  description: string
  category: string
  startDate: Date | undefined
  endDate: Date | undefined
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
}: {
  cardId: string
  data: FormData
}) => {
  const response = await fetch(`/cards/${cardId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update card')
  }

  return response.json()
}
