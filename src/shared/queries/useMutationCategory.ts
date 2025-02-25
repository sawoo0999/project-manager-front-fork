import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories.all(variables.projectId),
      })
    },
  })
}

const useMutationUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories.lists(variables.projectId),
      })
    },
  })
}
const useMutationDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories.lists(variables.projectId),
      })
    },
  })
}

export {
  useMutationCreateCategory,
  useMutationDeleteCategory,
  useMutationUpdateCategory,
}
