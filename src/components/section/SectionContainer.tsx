import ProjectHeader from '../projectMain/ProjectHeader'
import SettingMenuBar from '../projectMain/SettingMenuBar'
import CardListContainer from './CardListContainer'

export default function SectionContainer() {
  return (
    <section className="h-full w-full flex flex-col">
      <ProjectHeader />
      <SettingMenuBar page="section" />
      <CardListContainer />
    </section>
  )
}
