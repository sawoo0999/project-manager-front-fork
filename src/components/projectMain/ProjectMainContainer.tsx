import { useProjectId } from '@/shared/hooks/useProjectId'
import { useQueryProject } from '@/shared/queries/useQueryProject'
import CardContainer from './CardContainer'
import ProjectHeader from './ProjectHeader'
import SettingMenuBar from './SettingMenuBar'

export default function ProjectMainContainer() {
  const projectId = useProjectId()
  const { data: project } = useQueryProject(projectId)

  if (project?.data)
    return (
      <section className="h-full w-full flex flex-col overflow-x-scroll">
        <ProjectHeader {...project?.data} />
        <SettingMenuBar page="project" projectId={projectId} />
        <CardContainer projectId={projectId} />
      </section>
    )
}
