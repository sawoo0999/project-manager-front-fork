import { useProjectId } from '@/shared/hooks/useProjectId'
import { useQueryProject } from '@/shared/queries/useQueryProject'
import ProjectHeader from '../projectMain/ProjectHeader'

import CardContentContainer from './CardContentContainer'

interface CardDetailContainerProps {
  mode?: 'view' | 'edit'
}
export default function CardDetailContainer({
  mode = 'view',
}: CardDetailContainerProps) {
  const projectId = useProjectId()
  const { data: project } = useQueryProject(projectId)

  if (project?.data)
    return (
      <div className="min-h-screen bg-white w-full rounded-card">
        <ProjectHeader {...project?.data} />
        <CardContentContainer projectId={projectId} mode={mode} />
      </div>
    )
}
