import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'

interface CreateProjectButtonProps {
  isOpen: boolean
}

export const CreateProjectButton = ({ isOpen }: CreateProjectButtonProps) => {
  const { openModal } = useModalStore()

  return (
    <div className="p-4 sm:px-2" onClick={() => openModal('create-project')}>
      <button
        className={`bg-primary text-white rounded-button hover:bg-primary/80 transition-all duration-300 h-10
        ${isOpen ? 'w-19 px-4' : 'w-7 h-7'}`}
      >
        <div
          className={`flex items-center w-full justify-center overflow-hidden`}
        >
          <Icon
            icon="Plus"
            size={10}
            className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'mr-1 opacity-100' : 'opacity-0 w-0'}`}
          />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
          >
            프로젝트
          </span>
          <span
            className={`text-center transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}
          >
            <Icon icon="Plus" size={10} />
          </span>
        </div>
      </button>
    </div>
  )
}
