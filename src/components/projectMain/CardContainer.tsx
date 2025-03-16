import { useUserRole } from '@/shared/hooks/useUserRole'
import { useQuerySectionList } from '@/shared/queries/useQuerySectionList'
import { ProjectSectionParams } from '@/shared/types/common'
import { Icon } from '@/shared/ui/Icon'
import Tooltip from '@/shared/ui/Tooltip'
import { useModalStore } from '@/store/useModalStore'
import { ReactNode } from 'react'
import Section from './Section'

export default function CardContainer({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) {
  const { openModal } = useModalStore()

  const { data: sectionList, isError } = useQuerySectionList(projectId)
  const { userRoleIsUser } = useUserRole(projectId)

  if (isError) {
    return <div className="text-red-500">Error loading sections.</div>
  }

  function ConditionalTooltip({
    className,
    children,
    condition,
    content,
  }: {
    className?: string
    children: ReactNode
    condition: boolean
    content: ReactNode
  }) {
    if (condition) {
      return (
        <Tooltip content={content} className={className}>
          {children}
        </Tooltip>
      )
    }
    return <>{children}</>
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
        className={`font-semibold text-sm md:text-base flex gap-1 h-fit pt-2 items-center whitespace-nowrap w-[307px] mx-auto md:mx-0 px-3 md:min-w-[220px] md:px-0 lg:min-w-[256px]`}
        onClick={() => !userRoleIsUser && openModal('create-section')}
      >
        <ConditionalTooltip
          content="권한이 없습니다"
          condition={userRoleIsUser}
        >
          <button
            className={`flex items-center gap-1 ${userRoleIsUser && 'text-modalPlaceholder cursor-default'}`}
          >
            <Icon icon="Plus" size={12} /> 섹션 추가
          </button>
        </ConditionalTooltip>
      </div>
    </div>
  )
}
