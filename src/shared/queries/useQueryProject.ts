import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { Project } from '../types/project'
import { APIResponse } from '../types/response'

const useQueryProject = (projectId: number) => {
  const { isPending, isError, data, error } = useQuery<APIResponse<Project>>({
    queryKey: QUERY_KEYS.projects.lists(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`/projects/${projectId}`)
      return data
    },
    enabled: projectId > 0,
    refetchOnReconnect: false, // 재연결 시 재요청 안 함
  })
  return { isPending, isError, data, error }
}

export { useQueryProject }
