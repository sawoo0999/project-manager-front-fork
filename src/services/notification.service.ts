import axiosApi from '@/helper/api_helper'
import { NotificationRoles } from '@/shared/types/notification'

export const refuseNotification = async ({
  projectId,
}: {
  projectId: number
}) => {
  const response = await axiosApi.post(`/projects/refuse/${projectId}`)
  return response.data
}

export const acceptNotification = async ({
  projectId,
}: {
  projectId: number
}) => {
  const response = await axiosApi.post(`/projects/accept/${projectId}`)
  return response.data
}

export const checkNotification = async ({
  notificationId,
}: {
  notificationId: string
}) => {
  const response = await axiosApi.put(`/notification/comment/${notificationId}`)
  return response.data
}

export const deleteNotification = async ({
  notificationId,
}: {
  notificationId: string
}) => {
  const response = await axiosApi.delete(
    `/notification/comment/${notificationId}`,
  )
  return response.data
}

export const deleteRoleNotification = async (payload: NotificationRoles) => {
  const response = await axiosApi.delete('/notification/roles', {
    data: payload,
  })
  return response.data
}
