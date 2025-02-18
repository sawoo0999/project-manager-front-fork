import axiosApi from '@/helper/api_helper'

export interface InviteProjectRequest {
  projectId: number
  email: string[]
}

export const inviteProject = async ({
  projectId,
  email,
}: InviteProjectRequest) => {
  const response = await axiosApi.post(`projects/invite/${projectId}`, email)
  return response.data
}
