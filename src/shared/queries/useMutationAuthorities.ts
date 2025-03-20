import { updateAuthorities } from '@/services/authorities.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationUpdateAuthorities = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAuthorities,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.authorities.lists(variables.projectId),
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.all,
      })
    },
  })
}

export { useMutationUpdateAuthorities }
