import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { APIResponse } from '../types/response'
import { User } from '@/services/user.service'

const useQueryUser = () => {
  const { data, isPending, isError } = useQuery<APIResponse<User>>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosApi.get('/users')
      return data
    },
  })
  return { data, isPending, isError }
}

export { useQueryUser }
