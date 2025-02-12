import { createCategory } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories.lists(variables.projectId),
      })
    },
    onError: (error: AxiosError) => {
      console.log('Mutation Error:', error.response?.data)
      console.log('Request Payload:', error.config?.data)
    },
  })
}

export { useMutationCreateCategory }
