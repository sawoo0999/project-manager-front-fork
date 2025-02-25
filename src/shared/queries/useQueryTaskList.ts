import { useQuery } from '@tanstack/react-query'
import { APIResponse } from '../types/response'
import axiosApi from '@/helper/api_helper'
import { TaskListResponse } from '../types/task'

const useQueryInProgressTaskList = (page?: number) => {
  return useQuery<APIResponse<TaskListResponse>>({
    queryKey: ['inProgress_task', page],
    queryFn: async () => {
      const params = {
        ...(page && { page }), // page가 있을 때만 추가
      }
      const { data } = await axiosApi.get(`/cards/progress`, { params })
      return data
    },
  })
}

const useQueryCompletedTaskList = (page?: number) => {
  return useQuery<APIResponse<TaskListResponse>>({
    queryKey: ['completed_task', page],
    queryFn: async () => {
      const params = {
        ...(page && { page }), // page가 있을 때만 추가
      }
      const { data } = await axiosApi.get(`/cards/completed`, { params })
      return data
    },
  })
}

export { useQueryInProgressTaskList, useQueryCompletedTaskList }
