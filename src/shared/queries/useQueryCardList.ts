import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { Card } from '../types/card'
import { ProjectSectionParams } from '../types/common'
import { APIResponse } from '../types/response'

const useQueryCardList = ({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) => {
  const { data, isError } = useQuery<APIResponse<Card[]>>({
    queryKey: QUERY_KEYS.cards.lists(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`projects/${projectId}/cards`)
      return data
    },
    enabled: projectId > 0,
  })
  return { data, isError }
}

export { useQueryCardList }
