import { MOCK_CARD_LIST } from '@/shared/mock/card'
import Card from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SectionProps {
  sectionName: string
  sectionId: number
}

export default function Section({ sectionName, sectionId }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { openModal } = useModalStore()

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="w-[307px] mx-auto md:mx-0 px-3 md:w-[220px]  md:px-0 lg:w-[256px] pt-2 flex flex-col gap-2 shrink-0">
      <Link
        to={`${currentPath}/section/${sectionId}`}
        className="font-semibold text-sm md:text-base flex justify-between items-center"
      >
        {sectionName}
        <Icon
          className="md:hidden cursor-pointer"
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
        {MOCK_CARD_LIST.map((card, index) => {
          return <Card key={`${card.title}-${index}`} {...card} />
        })}
        <div
          className="w-full h-[81px] bg-white flex justify-center items-center cursor-pointer rounded-card"
          onClick={() => openModal('create-card')}
        >
          <Icon icon="Plus" size={14} />
        </div>
      </div>
    </div>
  )
}
