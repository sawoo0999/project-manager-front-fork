import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { Category } from '../types/category'
import { ProjectSectionParams } from '../types/common'
import { APIResponse } from '../types/response'

const useQueryCategoryList = ({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) => {
  const { data, isError } = useQuery<APIResponse<Category[]>>({
    queryKey: QUERY_KEYS.categories.lists(projectId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`projects/${projectId}/categories`)
      return data
    },
    retry: false,
    enabled: projectId > 0,
  })

  return { data, isError }
}

export { useQueryCategoryList }
