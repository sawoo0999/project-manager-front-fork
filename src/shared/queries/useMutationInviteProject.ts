import { inviteProject, InviteProjectRequest } from '@/services/member.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'
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

export { useMutationInviteProject }
