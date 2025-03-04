export interface Member {
  id: number
  email: string
  nickname: string
  image_url: string
  role: string
}
export interface InviteProjectRequest {
  projectId: number
  emailList: string[]
}

export interface DeleteMemberRequest {
  projectId: number
  userId: number
}
