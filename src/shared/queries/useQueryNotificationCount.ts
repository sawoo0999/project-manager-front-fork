import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

const useQueryNotificationCount = () => {
  const { data, isError } = useQuery<APIResponse<number>>({
    queryKey: QUERY_KEYS.notifications.count(),
    queryFn: async () => {
      const { data } = await axiosApi.get('/notification/count')
      return data
    },
  })
  return { data, isError }
}

export { useQueryNotificationCount }
