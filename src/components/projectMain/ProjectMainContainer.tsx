import { useProjectId } from '@/shared/hooks/useProjectId'
import CardContainer from './CardContainer'
import ProjectHeader from './ProjectHeader'
import SettingMenuBar from './SettingMenuBar'

export default function ProjectMainContainer() {
  const projectId = useProjectId()

  return (
    <section className="h-full w-full flex flex-col overflow-x-scroll">
      <ProjectHeader projectId={projectId} />
      <SettingMenuBar page="project" projectId={projectId} />
      <CardContainer projectId={projectId} />
    </section>
  )
}
