import { useProjectId } from '@/shared/hooks/useProjectId'
import { useQueryProject } from '@/shared/queries/useQueryProject'
import ProjectHeader from '../projectMain/ProjectHeader'
import SettingMenuBar from '../projectMain/SettingMenuBar'
import CardListContainer from './CardListContainer'

export default function SectionContainer() {
  const projectId = useProjectId()
  const { data: project } = useQueryProject(projectId)

  if (project?.data)
    return (
      <section className="h-full w-full flex flex-col">
        <ProjectHeader {...project?.data} />
        <SettingMenuBar page="section" projectId={projectId} />
        <CardListContainer projectId={projectId} />
      </section>
    )
}
