interface User {
  createdAt: string
  id: number
  email: string
  password: string
  nickname: string
  photoUrl: string
}

interface Project {
  id: number
  name: string
  color: string
}

interface Category {
  id: number
  color: string
  name: string
  description: string
  project: Project
}

interface Section {
  id: number
  name: string
  project: Project
}

export interface TaskCard {
  id: number
  title: string
  content: string
  startDate: string
  endDate: string
  completeDate: string | null
  user: User
  category: Category
  section: Section
}

export interface TaskListResponse {
  content: TaskCard[]
  totalPages: number
  totalElements: number
  currentPage: number
}

// 페이지네이션 정보
export interface PaginationInfo {
  page: number
  size: number
}
