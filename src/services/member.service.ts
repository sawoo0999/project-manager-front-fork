import axiosApi from '@/helper/api_helper'
import {
  DeleteMemberRequest,
  InviteProjectRequest,
} from '@/shared/types/member'

export const inviteProject = async ({
  projectId,
  emailList,
}: InviteProjectRequest) => {
  const response = await axiosApi.post(`projects/invites/${projectId}`, {
    emails: emailList,
  })
  return response.data
}

export const deleteMember = async ({
  projectId,
  userId,
}: DeleteMemberRequest) => {
  const response = await axiosApi.delete(`projects/${projectId}/${userId}`)
  return response.data
}
