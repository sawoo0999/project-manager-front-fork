import { deleteMember, inviteProject } from '@/services/member.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'
import { DeleteMemberRequest, InviteProjectRequest } from '../types/member'
import { APIResponse } from '../types/response'

const useMutationInviteProject = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, InviteProjectRequest>({
    mutationFn: inviteProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.members.lists(variables.projectId),
      })
    },
    onError: (error) => {
      console.error('초대 실패:', error.response?.data)
    },
  })
}

const useMutationDeleteMember = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, DeleteMemberRequest>({
    mutationFn: deleteMember,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.members.lists(variables.projectId),
      })
    },
    onError: (error) => {
      console.error('삭제 실패:', error.response?.data)
    },
  })
}

export { useMutationDeleteMember, useMutationInviteProject }
