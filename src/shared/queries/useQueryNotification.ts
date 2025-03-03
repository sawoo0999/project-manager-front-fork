import axiosApi from '@/helper/api_helper'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'
import { NotificationComment, NotificationInvites } from '../types/notification'

const useQueryNotificationComment = () => {
  const { data, isError, isPending } = useQuery<
    APIResponse<NotificationComment[]>
  >({
    queryKey: QUERY_KEYS.notifications.commentList(),
    queryFn: async () => {
      const { data } = await axiosApi.get('/notification/comment')
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

export { useQueryNotificationComment, useQueryNotificationInvites }
