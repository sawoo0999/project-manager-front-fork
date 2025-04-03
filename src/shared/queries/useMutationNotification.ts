import { useMutation, useQueryClient } from '@tanstack/react-query'
import { APIResponse } from '../types/response'

import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'
import {
  acceptNotification,
  checkNotification,
  deleteNotification,
  deleteRoleNotification,
  refuseNotification,
} from '@/services/notification.service'
import { NotificationRoles } from '../types/notification'

const useMutationRefuseNotification = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, AxiosError, { projectId: number }>({
    mutationFn: refuseNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.inviteList(),
      })
    },
    onError: (error: AxiosError) => {
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
    onError: (error: AxiosError) => {
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
      onError: (error: AxiosError) => {
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
      onError: (error: AxiosError) => {
        console.error('초대 실패:', error.response?.data)
      },
    },
  )
}

const useMutationDeleteRoleNotification = () => {
  const queryClient = useQueryClient()
  return useMutation<APIResponse<null>, AxiosError, NotificationRoles>({
    mutationFn: deleteRoleNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.all,
      })
    },
    onError: (error: AxiosError) => {
      console.error('역할 알림 삭제 실패:', error.response?.data)
    },
  })
}

export {
  useMutationRefuseNotification,
  useMutationAcceptNotification,
  useMutationCheckNotification,
  useMutationDeleteNotification,
  useMutationDeleteRoleNotification,
}
