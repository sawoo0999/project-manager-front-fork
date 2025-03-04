import { useQueryCardList } from '@/shared/queries/useQueryCardList'
import { ProjectSectionParams } from '@/shared/types/common'
import Card from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SectionProps extends ProjectSectionParams {
  sectionName: string
}

export default function Section({
  sectionName,
  sectionId,
  projectId,
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { openModal } = useModalStore()

  const { data: cardList } = useQueryCardList({ projectId })

  const filteredCardList = cardList?.data?.filter(
    (card) => card.sectionId === sectionId,
  )

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="h-fit w-[307px] mx-auto md:mx-0 px-3 md:w-[220px] md:px-0 md:pb-3 lg:w-[256px] pt-2 flex flex-col gap-2 shrink-0">
      <Link
        to={`${currentPath}/section/${sectionId}`}
        className="font-semibold text-sm md:text-base flex justify-between items-center"
      >
        {sectionName}
        <Icon
          className={`${filteredCardList?.length === 0 && 'hidden'} md:hidden cursor-pointer`}
          icon={isOpen ? 'AngleDoubleUp' : 'AngleDoubleDown'}
          size={20}
          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        />
      </Link>
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden md:!max-h-none ${
          isOpen ? 'max-h-[1000px] slide-down' : 'max-h-[89px] slide-up'
        }`}
      >
        {filteredCardList?.map((card) => {
          return <Card key={card.cardId} projectId={projectId} {...card} />
        })}
        <div
          className="w-full h-[81px] bg-white flex justify-center items-center cursor-pointer rounded-card"
          onClick={() => openModal('create-card', { sectionName })}
        >
          <Icon icon="Plus" size={14} />
        </div>
      </div>
    </div>
  )
}
