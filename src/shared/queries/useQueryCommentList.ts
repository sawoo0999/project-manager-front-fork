import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import { Comments } from '../types/card'

const useQueryCommentList = (cardId: number) => {
  const { data, isError, isPending } = useQuery<APIResponse<Comments[]>>({
    queryKey: QUERY_KEYS.comments.lists(cardId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`cards/${cardId}/comments`)
      return data
    },
    enabled: !!cardId,
  })

  return { data, isError, isPending }
}

export { useQueryCommentList }
