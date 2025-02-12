import { useParams } from 'react-router-dom'

export const useProjectId = () => {
  const { projectId } = useParams<{ projectId: string }>()

  // const location = useLocation()
  // const currentProjectPath = location.pathname.split('/').slice(0, 3).join('/')

  if (!projectId) {
    throw new Error('Project ID is required')
  }

  const numericId = parseInt(projectId)

  if (isNaN(numericId)) {
    throw new Error('Invalid project ID format')
  }

  return numericId
}
