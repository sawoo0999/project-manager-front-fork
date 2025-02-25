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
