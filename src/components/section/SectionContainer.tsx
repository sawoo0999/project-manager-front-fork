import { useProjectId } from '@/shared/hooks/useProjectId'
import ProjectHeader from '../projectMain/ProjectHeader'
import SettingMenuBar from '../projectMain/SettingMenuBar'
import CardListContainer from './CardListContainer'

export default function SectionContainer() {
  const projectId = useProjectId()
  return (
    <section className="h-full w-full flex flex-col">
      <ProjectHeader projectId={projectId} />
      <SettingMenuBar page="section" projectId={projectId} />
      <CardListContainer projectId={projectId} />
    </section>
  )
}
