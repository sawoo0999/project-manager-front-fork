import { UppercaseColorKeys } from './common'

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
