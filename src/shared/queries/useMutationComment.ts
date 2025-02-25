import {
  createComment,
  deleteComment,
  editComment,
} from '@/services/card.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useMutationCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation<
    APIResponse<null>,
    Error,
    { cardId: number; content: string }
  >({
    mutationFn: createComment,
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.lists(cardId),
      })
    },
  })
}

const useMutationEditComment = () => {
  const queryClient = useQueryClient()
  return useMutation<
    APIResponse<null>,
    Error,
    { commentId: number; cardId: number; content: string }
  >({
    mutationFn: async ({ commentId, content }) => {
      return editComment({ commentId, content })
    },
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.lists(cardId),
      })
    },
  })
}

const useMutationDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation<
    APIResponse<null>,
    Error,
    { commentId: number; cardId: number }
  >({
    mutationFn: async ({ commentId }) => {
      return deleteComment({ commentId })
    },
    onSuccess: (_, { cardId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.lists(cardId),
      })
    },
  })
}

export {
  useMutationCreateComment,
  useMutationEditComment,
  useMutationDeleteComment,
}
