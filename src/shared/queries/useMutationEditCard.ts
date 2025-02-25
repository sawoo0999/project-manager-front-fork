import {
  completeCard,
  deleteCard,
  progressCard,
  updateCard,
} from '@/services/card.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import {
  DeleteCardRequest,
  UpdateCardRequest,
  CompleteCardRequest,
  ProgressCardRequest,
} from '../types/card'

const useMutationDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, DeleteCardRequest>({
    mutationFn: deleteCard,
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cards.lists() })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.cards.detail(cardId) })
    },
    onError: (error) => {
      console.error('Error deleting card:', error)
    },
  })
}

const useMutationUpdateCard = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, UpdateCardRequest>({
    mutationFn: updateCard,
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.detail(cardId),
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.lists(),
      })
    },
    onError: (error) => {
      console.error('Error updating card:', error)
    },
  })
}

const useMutationCompleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, CompleteCardRequest>({
    mutationFn: completeCard,
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.detail(cardId),
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.lists(),
      })
    },
    onError: (error) => {
      console.error('Error completing card:', error)
    },
  })
}

const useMutationInProgressCard = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, ProgressCardRequest>({
    mutationFn: progressCard,
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.detail(cardId),
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.cards.lists(),
      })
    },
    onError: (error) => {
      console.error('Error completing card:', error)
    },
  })
}

export {
  useMutationDeleteCard,
  useMutationUpdateCard,
  useMutationCompleteCard,
  useMutationInProgressCard,
}
