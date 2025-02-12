import axiosApi from '@/helper/api_helper'
import { APIResponse } from '@/shared/types/response'

export interface InviteProjectRequest {
  projectId: number
}

export const inviteProject = async (payload: InviteProjectRequest) => {
  try {
    const response = (await axiosApi.post(
      '/api/projects/invite',
      payload,
    )) as APIResponse<null>
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
