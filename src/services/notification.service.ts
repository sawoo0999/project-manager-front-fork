import axiosApi from '@/helper/api_helper'

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
