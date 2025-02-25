import {
  createSection,
  deleteSection,
  updateSection,
} from '@/services/section.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import {
  CreateSectionRequest,
  DeleteSectionRequest,
  Section,
  UpdateSectionRequest,
} from '../types/section'

const useMutationCreateSection = () => {
  const queryClient = useQueryClient()

  return useMutation<Section, Error, CreateSectionRequest>({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sections.all,
      })
    },
  })
}

const useMutationUpdateSection = () => {
  const queryClient = useQueryClient()

  return useMutation<Section, Error, UpdateSectionRequest>({
    mutationFn: async ({ sectionId, projectId, name }) => {
      const response = await updateSection({ sectionId, projectId, name })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sections.all,
      })
    },
  })
}

const useMutationDeleteSection = () => {
  const queryClient = useQueryClient()

  return useMutation<Section, Error, DeleteSectionRequest>({
    mutationFn: async ({ sectionId, projectId }) => {
      const response = await deleteSection({ sectionId, projectId })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sections.all,
      })
    },
  })
}

export {
  useMutationCreateSection,
  useMutationDeleteSection,
  useMutationUpdateSection,
}
