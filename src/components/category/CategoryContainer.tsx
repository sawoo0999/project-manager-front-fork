import { useProjectId } from '@/shared/hooks/useProjectId'
import { useQueryProject } from '@/shared/queries/useQueryProject'
import ProjectHeader from '../projectMain/ProjectHeader'
import Category from './Category'

export default function CategoryContainer() {
  const projectId = useProjectId()
  const { data: project } = useQueryProject(projectId)

  if (project?.data)
    return (
      <section className="w-full bg-white rounded-tl-lg">
        <ProjectHeader {...project?.data} />
        <Category projectId={projectId} />
      </section>
    )
}
