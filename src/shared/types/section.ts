export interface Section {
  id: number
  name: string
}

export interface CreateSectionRequest {
  projectId: string | undefined
  name: string
}

export interface UpdateSectionRequest {
  projectId: number
  sectionId: number
  name: string
}

export interface DeleteSectionRequest {
  sectionId: number
  projectId: number
}
