import { useMutation, useQueryClient } from '@tanstack/react-query'
import { APIResponse } from '../types/response'

import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'
import {
  acceptNotification,
  checkNotification,
  deleteNotification,
  refuseNotification,
} from '@/services/notification.service'

const useMutationRefuseNotification = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, { projectId: number }>({
    mutationFn: refuseNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.inviteList(),
      })
    },
    onError: (error) => {
      console.error('초대 실패:', error.response?.data)
    },
  })
}

const useMutationAcceptNotification = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, { projectId: number }>({
    mutationFn: acceptNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.inviteList(),
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      })
    },
    onError: (error) => {
      console.error('초대 실패:', error.response?.data)
    },
  })
}

const useMutationCheckNotification = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, { notificationId: string }>(
    {
      mutationFn: checkNotification,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.notifications.all,
        })
      },
      onError: (error) => {
        console.error('초대 실패:', error.response?.data)
      },
    },
  )
}

const useMutationDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, { notificationId: string }>(
    {
      mutationFn: deleteNotification,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.notifications.all,
        })
      },
      onError: (error) => {
        console.error('초대 실패:', error.response?.data)
      },
    },
  )
}

export {
  useMutationRefuseNotification,
  useMutationAcceptNotification,
  useMutationCheckNotification,
  useMutationDeleteNotification,
}
