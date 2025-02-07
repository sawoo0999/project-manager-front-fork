import ProjectHeader from '../projectMain/ProjectHeader'
import ProjectUpdate from './ProjectUpdate'

export default function ProjectUpdateContainer() {
  return (
    <section className="w-full h-full bg-white">
      <ProjectHeader />
      <ProjectUpdate />
    </section>
  )
}
