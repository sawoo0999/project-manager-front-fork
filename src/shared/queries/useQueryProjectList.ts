import axiosApi from '@/helper/api_helper'
import { Project } from '@/services/projects.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useQueryProjectList = () => {
  const { isPending, isError, data, error } = useQuery<APIResponse<Project[]>>({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: async () => {
      const { data } = await axiosApi.get('/projects')
      return data
    },
  })
  return { isPending, isError, data, error }
}

export { useQueryProjectList }
