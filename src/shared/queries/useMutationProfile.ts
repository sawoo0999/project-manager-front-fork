import { useMutation, useQueryClient } from '@tanstack/react-query'
import { APIResponse } from '../types/response'
import { updateProfile, User } from '@/services/user.service'

const useMutationUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<User>, Error, FormData>({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Error deleting card:', error)
    },
  })
}

export { useMutationUpdateProfile }
