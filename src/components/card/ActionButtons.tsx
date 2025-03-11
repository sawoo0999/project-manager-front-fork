import { useProjectId } from '@/shared/hooks/useProjectId'
import {
  useMutationCompleteCard,
  useMutationDeleteCard,
  useMutationInProgressCard,
} from '@/shared/queries/useMutationEditCard'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface ActionButtonsProps {
  isComplete: boolean
  cardId: number
  isEdit: boolean
}

export function ActionButtons({
  isComplete,
  cardId,
  isEdit,
}: ActionButtonsProps) {
  const navigate = useNavigate()
  const projectId = useProjectId()
  const completeCardMutation = useMutationCompleteCard()
  const inProgressCardMutation = useMutationInProgressCard()
  const deleteCardMutation = useMutationDeleteCard()
  const { openModal } = useModalStore()
  const handleCompleteToggle = async () => {
    try {
      const today = new Date()
      const formattedDate = today.toISOString().split('T')[0]

      if (isComplete) {
        await inProgressCardMutation.mutateAsync({ cardId })
        toast.success('카드가 진행되었습니다')
      } else {
        await completeCardMutation.mutateAsync({
          cardId,
          completeDate: formattedDate,
        })
        toast.success('카드가 완료되었습니다')
      }
    } catch (error) {
      console.error('Failed to toggle card completion:', error)
      toast.error('오류가 발생했습니다')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCardMutation.mutateAsync({
        cardId,
        projectId: projectId,
      })
      toast.success('카드가 삭제되었습니다')
      navigate(`/project/${projectId}`)
    } catch (error) {
      console.error('Failed to delete card:', error)
      toast.error('오류가 발생했습니다')
    }
  }

  return (
    <div className="flex w-full justify-between">
      <Button
        variant={isComplete ? 'categoryDelete' : 'modalOutline'}
        className="group flex gap-2 p-2 sm:p-3 h-7 sm:h-8 "
        onClick={(e) => {
          e.preventDefault()
          handleCompleteToggle()
        }}
        type="button"
        disabled={completeCardMutation.isPending}
      >
        <div
          className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full  ${
            isComplete ? 'bg-warning' : 'bg-primary'
          } group-hover:bg-white`}
        />
        <span>
          {completeCardMutation.isPending
            ? '처리 중...'
            : isComplete
              ? '진행중으로 변경'
              : '완료로 표시'}
        </span>
      </Button>
      <div className="flex gap-2">
        {isEdit ? (
          <button
            disabled={deleteCardMutation.isPending}
            className="h-4 sm:w-5 sm:h-5"
            onClick={() =>
              openModal('delete-alert', {
                modalText:
                  '카드를 삭제하시겠습니까?\n해당 프로젝트의 카드와 댓글 데이터가 모두 삭제됩니다.\n계속하시려면 아래 삭제 버튼을 눌러주세요.',
                onClickHandler: handleDelete,
              })
            }
            type="button"
          >
            <Icon
              icon="Delete"
              size={18}
              className="sm:w-5 sm:h-5 fill-warning"
            />
          </button>
        ) : (
          <Link to="edit">
            <Icon icon="Setting" size={18} className="sm:w-5 sm:h-5" />
          </Link>
        )}
        <button
          onClick={() => navigate(`/project/${projectId}`)}
          className="h-4 sm:w-5 sm:h-5"
          type="button"
        >
          <Icon icon="Home" size={18} />
        </button>
      </div>
    </div>
  )
}
