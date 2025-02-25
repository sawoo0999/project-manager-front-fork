import { useQuerySectionList } from '@/shared/queries/useQuerySectionList'
import { ProjectSectionParams } from '@/shared/types/common'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import Section from './Section'

export default function CardContainer({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) {
  const { openModal } = useModalStore()

  const { data: sectionList, isError } = useQuerySectionList(projectId)

  if (isError) {
    return <div className="text-red-500">Error loading sections.</div>
  }

  return (
    <div className="bg-bodyBg flex-1 md:flex md:px-3 md:gap-3 overflow-auto">
      {sectionList?.data?.map((section) => {
        return (
          <Section
            projectId={projectId}
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
