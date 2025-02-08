import { Link } from 'react-router-dom'
import { Icon } from '@/shared/ui/Icon'

interface MainNavigationProps {
  isOpen: boolean
}

export const MainNavigation = ({ isOpen }: MainNavigationProps) => {
  return (
    <ul className="space-y-1 px-3 border-b border-bodyBorder">
      <li>
        <Link
          to="/home"
          className={`flex items-center p-2 hover:bg-gray-100 rounded-lg 
          ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
        >
          <Icon icon="Home" size={14} className="min-w-[14px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden 
            ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
          >
            홈
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/inbox"
          className={`flex items-center p-2 hover:bg-gray-100 rounded-lg 
            ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
        >
          <Icon icon="Bell" size={14} className="min-w-[14px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
          >
            수신함
          </span>
        </Link>
      </li>
    </ul>
  )
}
