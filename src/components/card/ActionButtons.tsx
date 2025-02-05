import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { Link, useNavigate } from 'react-router-dom'

interface ActionButtonsProps {
  isComplete: boolean
}

export function ActionButtons({ isComplete }: ActionButtonsProps) {
  const navigate = useNavigate()
  return (
    <div className="flex w-full justify-between">
      <Button
        variant={isComplete ? 'categoryDelete' : 'modalOutline'}
        className="flex gap-2 p-2 sm:p-3 h-7 sm:h-8"
      >
        <div
          className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full ${isComplete ? 'bg-warning' : 'bg-primary'}`}
        />
        <span>{isComplete ? '진행중으로 변경' : '완료로 표시'}</span>
      </Button>
      <div className="flex gap-2 ">
        <Link to="edit">
          <Icon icon="Setting" size={18} className="sm:w-5 sm:h-5" />
        </Link>
        <button onClick={() => navigate(-1)} className="h-4 sm:w-5 sm:h-5">
          <Icon icon="Home" size={18} />
        </button>
      </div>
    </div>
  )
}
