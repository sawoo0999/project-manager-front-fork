import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { ProjectSectionParams } from '../types/common'

const useQueryAuthorities = ({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) => {
  const { data, isError } = useQuery({
    queryKey: QUERY_KEYS.authorities.lists(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`authorities/${projectId}`)
      return data.data
    },
  })
  return { data, isError }
}

export { useQueryAuthorities }
