import { useProjectId } from '@/shared/hooks/useProjectId'
import { useQueryProject } from '@/shared/queries/useQueryProject'
import ProjectHeader from '../projectMain/ProjectHeader'
import ProjectUpdate from './ProjectUpdate'

export default function ProjectUpdateContainer() {
  const projectId = useProjectId()
  const { data: project } = useQueryProject(projectId)

  if (project?.data)
    return (
      <section className="w-full h-full bg-white">
        <ProjectHeader {...project?.data} />
        <ProjectUpdate {...project?.data} />
      </section>
    )
}
