import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'

interface CreateProjectButtonProps {
  isOpen: boolean
}

export const CreateProjectButton = ({ isOpen }: CreateProjectButtonProps) => {
  const { openModal } = useModalStore()

  return (
    <div
      className="p-4 px-2.5 sm:px-2"
      onClick={() => openModal('create-project')}
    >
      <Button
        className={` transition-all duration-300
      ${isOpen ? 'max-w-[100px] w-full ' : 'max-w-[32px] w-8 h-8'}`}
      >
        <Icon
          icon="Plus"
          size={12}
          className={`transition-all duration-300 ease-in-out 
        ${isOpen ? 'mr-2 opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
        />
        <span
          className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden 
         ${isOpen ? 'opacity-100 max-w-full scale-100' : 'opacity-0 max-w-0 scale-90'}`}
        >
          프로젝트
        </span>

        <span
          className={`transition-all duration-300 ease-in-out absolute
        ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        >
          <Icon icon="Plus" size={12} />
        </span>
      </Button>
    </div>
  )
}
