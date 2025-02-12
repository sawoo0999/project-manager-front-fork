import axiosApi from '@/helper/api_helper'
import { Project } from '@/services/projects.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useQueryProject = (projectId: number) => {
  const { isPending, isError, data, error } = useQuery<APIResponse<Project>>({
    queryKey: QUERY_KEYS.projects.lists(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`/projects/${projectId}`)
      return data
    },
    enabled: projectId > 0,
  })
  return { isPending, isError, data, error }
}

export { useQueryProject }
