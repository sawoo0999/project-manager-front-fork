import { useProjectId } from '@/shared/hooks/useProjectId'
import ProjectHeader from '../projectMain/ProjectHeader'
import Category from './Category'

export default function CategoryContainer() {
  const projectId = useProjectId()
  return (
    <section className="w-full bg-white">
      <ProjectHeader projectId={projectId} />
      <Category projectId={projectId} />
    </section>
  )
}
