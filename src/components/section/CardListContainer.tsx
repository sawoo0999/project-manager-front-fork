import { useQuerySectionCardList } from '@/shared/queries/useQuerySectionCardList'
import CompletedCardList from './CompletedCardList'
import InProgressCardList from './InProgressCardList'

export default function CardListContainer({
  projectId,
}: {
  projectId: number
}) {
  const sectionId = parseInt(location.pathname.split('/').slice(-1).join(''))

  const { data: sectionCardList } = useQuerySectionCardList(
    projectId,
    sectionId,
  )
  if (sectionCardList)
    return (
      <section className="bg-bodyBg h-full px-3 lg:px-0 w-full ">
        <div className="w-[283px] md:w-[453px] lg:w-[996px] mx-auto lg:flex-row lg:px-3 flex flex-col gap-3">
          <InProgressCardList
            projectId={projectId}
            sectionId={sectionId}
            sectionCardList={sectionCardList}
          />
          <CompletedCardList
            projectId={projectId}
            sectionCardList={sectionCardList}
          />
        </div>
      </section>
    )
}
