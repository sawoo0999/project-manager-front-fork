import { confirmPassword, updatePassword } from '@/services/auth.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { PasswordRequest } from '../types/auth'
import { APIResponse } from '../types/response'

const useMutationConfirmPassword = () => {
  const queryClient = useQueryClient()
  return useMutation<APIResponse<null>, Error, PasswordRequest>({
    mutationFn: confirmPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.password.all,
      })
    },
    onError: (error) => {
      console.error('Conform password failed: ', error)
    },
  })
}

const useMutationUpdatePassword = () => {
  const queryClient = useQueryClient()
  return useMutation<APIResponse<null>, Error, PasswordRequest>({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.password.all,
      })
    },
    onError: (error) => {
      console.error('Update password failed: ', error)
    },
  })
}

export { useMutationConfirmPassword, useMutationUpdatePassword }
