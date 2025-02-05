import { MOCK_SECTION_LIST } from '@/shared/mock/section'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import Section from './Section'

export default function CardContainer() {
  const { openModal } = useModalStore()
  // const { projectId } = useParams()  // 프로젝트 id로 섹션 및 카드 정보 불러올 예정

  return (
    <div className="bg-bodyBg flex-1 md:flex md:px-3 md:gap-3 md:overflow-x-auto">
      {MOCK_SECTION_LIST.map((section) => {
        return (
          <Section
            sectionName={section.name}
            sectionId={section.id}
            key={section.id}
          />
        )
      })}
      <div
        className="font-semibold text-sm md:text-base flex gap-1 h-fit pt-2 items-center cursor-pointer whitespace-nowrap w-[307px] mx-auto md:mx-0 px-3 md:min-w-[220px] md:px-0 lg:min-w-[256px]"
        onClick={() => openModal('create-section')}
      >
        <Icon icon="Plus" size={12} /> 섹션 추가
      </div>
    </div>
  )
}
