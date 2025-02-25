import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import { Card } from '../types/card'

const useQuerySectionCardList = (projectId: number, sectionId: number) => {
  const { data, isError } = useQuery<APIResponse<Card[]>>({
    queryKey: QUERY_KEYS.cards.detail(sectionId, sectionId),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `projects/${projectId}/sections/${sectionId}/cards`,
      )
      return data
    },
  })
  return { data, isError }
}

export { useQuerySectionCardList }
