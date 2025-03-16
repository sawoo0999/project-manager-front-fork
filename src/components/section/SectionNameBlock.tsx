import { useSectionId } from '@/shared/hooks/useProjectId'
import { useUserRole } from '@/shared/hooks/useUserRole'
import { useMutationDeleteSection } from '@/shared/queries/useMutationSection'
import { useQuerySection } from '@/shared/queries/useQuerySection'
import { ProjectSectionParams } from '@/shared/types/common'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import Tooltip from '@/shared/ui/Tooltip'
import { useModalStore } from '@/store/useModalStore'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SectionNameBlock({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) {
  const navigate = useNavigate()

  const sectionId = useSectionId()

  const { openModal } = useModalStore()

  const deleteSection = useMutationDeleteSection()
  const { data: section } = useQuerySection({ projectId, sectionId })

  const { userRoleIsUser } = useUserRole(projectId)

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

  const onDelete = async () => {
    try {
      await deleteSection.mutateAsync({
        sectionId,
        projectId,
      })
      navigate(`/project/${projectId}`)
      toast.success('섹션이 삭제되었습니다')
    } catch (error) {
      console.error(error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const onClickUpdateHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (!userRoleIsUser) {
      openModal('update-section', {
        sectionName: section?.name,
        sectionId: section?.id,
        projectId,
      })
    }
  }

  const onclickDeleteHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (!userRoleIsUser) {
      openModal('delete-alert', {
        modalText:
          '섹션을 삭제하시겠습니까?\n해당 카드 데이터가 모두 삭제됩니다.\n계속하시려면 아래 삭제 버튼을 눌러주세요.',
        onClickHandler: onDelete,
      })
    }
  }

  return (
    <div className="flex justify-between w-full mr-2 md:mr-3">
      <div className={`flex items-center gap-2 md:gap-3`}>
        <div className="md:text-xl">{section?.name}</div>
        <ConditionalTooltip
          content="권한이 없습니다"
          condition={userRoleIsUser}
        >
          <Button
            onClick={onClickUpdateHandler}
            variant={userRoleIsUser ? 'disabled' : 'default'}
            className={userRoleIsUser ? '!px-2' : ''}
          >
            <Icon
              icon="Update"
              className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
            />
          </Button>
        </ConditionalTooltip>
        <ConditionalTooltip
          content="권한이 없습니다"
          condition={userRoleIsUser}
        >
          <Button
            onClick={onclickDeleteHandler}
            variant={userRoleIsUser ? 'disabled' : 'default'}
            className={userRoleIsUser ? '!px-2' : ''}
          >
            <Icon
              icon="Delete"
              className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
            />
          </Button>
        </ConditionalTooltip>
      </div>
      <Button
        variant="default"
        className="flex gap-0.5 px-2"
        onClick={() => openModal('create-card', { sectionName: section?.name })}
      >
        <Icon icon="Plus" className="w-3 h-3 md:w-2.5 md:h-2.5" />
        <span className="hidden md:block">카드 추가</span>
      </Button>
    </div>
  )
}
