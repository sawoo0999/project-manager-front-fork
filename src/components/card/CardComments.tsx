import { useMutationUpdateCard } from '@/shared/queries/useMutationEditCard'
import { Button } from '@/shared/ui/common/button'
import { useNavigate } from 'react-router-dom'

type UpdateCardMutationType = ReturnType<typeof useMutationUpdateCard>

interface CardCommentsProps {
  isEdit: boolean
  projectId: number
  sectionId: number
  cardId: number
  isValid: boolean
  updateCardMutation: UpdateCardMutationType
}

export default function CardComments({
  isEdit,
  projectId,
  sectionId,
  cardId,
  isValid,
  updateCardMutation,
}: CardCommentsProps) {
  const navigate = useNavigate()

  return (
    <>
      <div className="w-full">
        {isEdit ? (
          <div className="flex justify-end gap-2">
            <Button
              variant="modalOutline"
              type="button"
              onClick={() =>
                navigate(`/project/${projectId}/section/${sectionId}/${cardId}`)
              }
              disabled={updateCardMutation.isPending}
              className="h-7 sm:h-8 text-xs sm:text-sm"
            >
              취소하기
            </Button>
            <Button
              variant="modal"
              type="submit"
              disabled={!isValid || updateCardMutation.isPending}
              className="h-7 sm:h-8 text-xs sm:text-sm"
            >
              {updateCardMutation.isPending ? '수정 중...' : '수정하기'}
            </Button>
          </div>
        ) : (
          <div>댓글</div>
        )}
      </div>
    </>
  )
}
