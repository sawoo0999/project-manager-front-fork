import axiosApi from '@/helper/api_helper'
import { Card } from '@/services/card.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useQueryCardList = (projectId: number) => {
  const { data, isError } = useQuery<APIResponse<Card[]>>({
    queryKey: QUERY_KEYS.cards.detail(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`projects/${projectId}/cards`)
      return data
    },
  })
  return { data, isError }
}

export { useQueryCardList }
