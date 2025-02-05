import CardContainer from './CardContainer'
import ProjectHeader from './ProjectHeader'
import SettingMenuBar from './SettingMenuBar'

export default function ProjectMainContainer() {
  return (
    <section className="h-full w-full flex flex-col overflow-x-scroll">
      <ProjectHeader />
      <SettingMenuBar page="project" />
      <CardContainer />
    </section>
  )
}
