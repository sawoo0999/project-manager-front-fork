import axiosApi from '@/helper/api_helper'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import {
  NotificationComment,
  NotificationInvites,
  NotificationRoles,
} from '../types/notification'

const useQueryNotificationComment = () => {
  const queryClient = useQueryClient()
  const { data, isError, isPending } = useQuery<
    APIResponse<NotificationComment[]>
  >({
    queryKey: QUERY_KEYS.notifications.commentList(),
    queryFn: async () => {
      const { data } = await axiosApi.get('/notification/comment')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.count(),
      })
      return data
    },
  })
  return { data, isError, isPending }
}

const useQueryNotificationInvites = () => {
  const { data, isError, isPending } = useQuery<
    APIResponse<NotificationInvites[]>
  >({
    queryKey: QUERY_KEYS.notifications.inviteList(),
    queryFn: async () => {
      const { data } = await axiosApi.get('/notification/invites')
      return data
    },
  })
  return { data, isError, isPending }
}

const useQueryNotificationRole = () => {
  const queryClient = useQueryClient()
  const { data, isError, isPending } = useQuery<
    APIResponse<NotificationRoles[]>
  >({
    queryKey: QUERY_KEYS.notifications.roleList(),
    queryFn: async () => {
      const { data } = await axiosApi.get('/notification/roles')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.all,
      })
      return data
    },
  })
  return { data, isError, isPending }
}

export {
  useQueryNotificationComment,
  useQueryNotificationInvites,
  useQueryNotificationRole,
}
