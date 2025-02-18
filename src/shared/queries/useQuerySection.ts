import axiosApi from '@/helper/api_helper'
import { Section } from '@/services/section.service'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '../constants/queryKeys'

interface GetSectionProps {
  projectId: number
  sectionId: number
}

const useQuerySection = ({ projectId, sectionId }: GetSectionProps) => {
  const { data, isError, isLoading, refetch } = useQuery<Section, AxiosError>({
    queryKey: QUERY_KEYS.sections.detail(projectId, sectionId),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `/projects/${projectId}/sections/${sectionId}`,
      )
      return data.data
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false
      return failureCount < 3
    },
    retryOnMount: false,
  })
  return { data, isError, isLoading, refetch }
}

export { useQuerySection }
