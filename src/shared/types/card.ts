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

export interface FormData {
  title: string
  content: string
  startDate: Date | undefined
  endDate: Date | undefined
  categoryId: number
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

export interface Comments {
  commentId: number
  content: string
  nickName: string
  createAt: string
  photoUrl: string
}
