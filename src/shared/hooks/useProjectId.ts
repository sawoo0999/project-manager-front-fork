import { useParams } from 'react-router-dom'

export const useProjectId = () => {
  const { projectId } = useParams<{ projectId: string }>()

  if (!projectId) {
    throw new Error('Project ID is required')
  }

  const numericId = parseInt(projectId)

  if (isNaN(numericId)) {
    throw new Error('Invalid project ID format')
  }

  return numericId
}

export const useSectionId = () => {
  const { sectionId } = useParams<{ sectionId: string }>()

  if (!sectionId) {
    throw new Error('Section ID is required')
  }

  const numericId = parseInt(sectionId)

  if (isNaN(numericId)) {
    throw new Error('Invalid project ID format')
  }

  return numericId
}
