import { MOCK_CARD_LIST } from '@/shared/mock/card'
import Card from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { useState } from 'react'

export default function InProgressCardList() {
  const [isOpen, setIsOpen] = useState(false)

  const { openModal } = useModalStore()

  return (
    <div className="lg:w-[256px] flex flex-col gap-2">
      <div className="font-semibold text-sm md:text-base flex justify-between items-center pt-2 ">
        진행 중
        <Icon
          className="md:hidden cursor-pointer"
          icon={isOpen ? 'AngleDoubleUp' : 'AngleDoubleDown'}
          size={20}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`md:grid md:grid-cols-2 lg:flex flex flex-col md:gap-x-2 transition-all duration-300 ease-in-out overflow-hidden md:!max-h-none ${
          isOpen ? 'max-h-[1000px] slide-down' : 'max-h-[89px] slide-up'
        }`}
      >
        {MOCK_CARD_LIST.map((card, index) => {
          return <Card {...card} key={`${card.title}-${index}`} />
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
