import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import { CardData } from '@/services/card.service'

interface CardDetailParams {
  cardId: number
  projectId: number
  sectionId: number
}

const useQueryCardDetail = ({
  cardId,
  projectId,
  sectionId,
}: CardDetailParams) => {
  const { data, isPending, isError } = useQuery<APIResponse<CardData>>({
    queryKey: QUERY_KEYS.cards.detail(cardId),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `/projects/${projectId}/sections/${sectionId}/cards/${cardId}`,
      )
      return data
    },
    enabled: !!cardId,
  })

  return { data, isPending, isError }
}

export { useQueryCardDetail }
