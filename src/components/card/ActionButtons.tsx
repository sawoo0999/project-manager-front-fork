import { useProjectId } from '@/shared/hooks/useProjectId'
import {
  useMutationCompleteCard,
  useMutationDeleteCard,
  useMutationInProgressCard,
} from '@/shared/queries/useMutationEditCard'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { Link, useNavigate } from 'react-router-dom'

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

  const handleCompleteToggle = async () => {
    try {
      const today = new Date()
      const formattedDate = today.toISOString().split('T')[0]

      if (isComplete) {
        await inProgressCardMutation.mutateAsync({ cardId })
      } else {
        await completeCardMutation.mutateAsync({
          cardId,
          completeDate: formattedDate,
        })
      }
    } catch (error) {
      console.error('Failed to toggle card completion:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCardMutation.mutateAsync({
        cardId,
        projectId: projectId,
      })
      navigate(`/project/${projectId}`)
    } catch (error) {
      console.error('Failed to delete card:', error)
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
            onClick={handleDelete}
            disabled={deleteCardMutation.isPending}
            className="h-4 sm:w-5 sm:h-5"
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
        <button onClick={() => navigate(-1)} className="h-4 sm:w-5 sm:h-5">
          <Icon icon="Home" size={18} />
        </button>
      </div>
    </div>
  )
}
