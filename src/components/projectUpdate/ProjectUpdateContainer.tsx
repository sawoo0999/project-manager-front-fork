import { useProjectId } from '@/shared/hooks/useProjectId'
import ProjectHeader from '../projectMain/ProjectHeader'
import ProjectUpdate from './ProjectUpdate'

export default function ProjectUpdateContainer() {
  const projectId = useProjectId()
  return (
    <section className="w-full h-full bg-white">
      <ProjectHeader projectId={projectId} />
      <ProjectUpdate projectId={projectId} />
    </section>
  )
}
