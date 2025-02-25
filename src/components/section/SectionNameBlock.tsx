import { useSectionId } from '@/shared/hooks/useProjectId'
import { useMutationDeleteSection } from '@/shared/queries/useMutationSection'
import { useQuerySection } from '@/shared/queries/useQuerySection'
import { ProjectSectionParams } from '@/shared/types/common'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
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

  return (
    <div className="flex justify-between w-full mr-2 md:mr-3">
      <div className={`flex items-center gap-2 md:gap-3`}>
        <div className="md:text-xl">{section?.name}</div>
        <Button>
          <Icon
            icon="Update"
            className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
            onClick={() =>
              openModal('update-section', {
                sectionName: section?.name,
                sectionId: section?.id,
                projectId,
              })
            }
          />
        </Button>
        <Button>
          <Icon
            icon="Delete"
            className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
            onClick={onDelete}
          />
        </Button>
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
