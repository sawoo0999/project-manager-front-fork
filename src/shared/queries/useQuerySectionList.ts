import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import { Section } from '../types/section'

const useQuerySectionList = (projectId: number) => {
  const { data, isError } = useQuery<APIResponse<Section[]>>({
    queryKey: QUERY_KEYS.sections.lists(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`/projects/${projectId}/sections`)
      return data
    },
  })
  return { data, isError }
}

export { useQuerySectionList }
