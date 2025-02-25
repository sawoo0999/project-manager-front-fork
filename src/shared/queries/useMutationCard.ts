import { createCard } from '@/services/card.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { CreateCardRequest } from '../types/card'
import { APIResponse } from '../types/response'

const useMutationCreateCard = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, CreateCardRequest>({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cards.all })
    },
    onError: (error) => {
      console.error('Error creating card:', error)
    },
  })
}
export { useMutationCreateCard }
