import { withdrawal } from '@/services/auth.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useMutationWithdrawal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['withdrawal'],
      }),
  })
}

export { useMutationWithdrawal }
