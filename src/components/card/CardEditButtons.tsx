import { Button } from '@/shared/ui/common/button'
import { useNavigate } from 'react-router-dom'

interface CardEditButtonsProps {
  projectId: number
  sectionId: number
  cardId: number
  isValid: boolean
  isPending: boolean
  resetForm: () => void
}

export default function CardEditButtons({
  projectId,
  sectionId,
  cardId,
  isValid,
  isPending,
  resetForm,
}: CardEditButtonsProps) {
  const navigate = useNavigate()

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="modalOutline"
        type="button"
        onClick={() => {
          resetForm()
          navigate(`/project/${projectId}/section/${sectionId}/${cardId}`)
        }}
        className="h-7 sm:h-8 text-xs sm:text-sm"
      >
        취소하기
      </Button>
      <Button
        variant="modal"
        type="submit"
        disabled={!isValid || isPending}
        className="h-7 sm:h-8 text-xs sm:text-sm"
      >
        {isPending ? '수정 중...' : '수정하기'}
      </Button>
    </div>
  )
}
