import { useQueryNotificationCount } from '@/shared/queries/useQueryNotificationCount'
import { useQueryProjectList } from '@/shared/queries/useQueryProjectList'
import { Icon } from '@/shared/ui/Icon'
import { useSidebarStore } from '@/store/sidebarStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CreateProjectButton } from './CreateProjectButton'
import { UserProfile } from './UserProfile'

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarStore()
  const { data: inboxCountData } = useQueryNotificationCount()
  const { data } = useQueryProjectList()
  const inboxCount = inboxCountData?.data ?? 0

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 640
      setIsOpen(isDesktop)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpen])

  return (
    <aside
      className={`p-2 bg-gradient-to-b from-white to-screenBg rounded-tr-lg flex flex-col transition-all duration-300 ease-in-out text-sm
      ${isOpen ? 'max-w-64 w-full' : 'max-w-16 w-16'}`}
    >
      <CreateProjectButton isOpen={isOpen} />
      <nav className="flex-1">
        <ul className="space-y-1 px-3 border-b border-bodyBorder">
          <li>
            <Link
              to="/home"
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg w-full transition-all duration-300 ease-in-out"
            >
              <Icon
                icon="Home"
                size={14}
                className={`min-w-[14px] transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-[-4px]'}`}
              />
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden origin-left
        ${isOpen ? 'opacity-100 scale-x-100 ml-3' : 'opacity-0 scale-x-0 ml-0'}`}
              >
                홈
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/inbox"
              className="relative flex items-center p-2 hover:bg-gray-100 rounded-lg w-full transition-all duration-300 ease-in-out"
            >
              <Icon
                icon="Bell"
                size={14}
                className={`min-w-[14px] transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-[-4px]'}`}
              />
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden origin-left
        ${isOpen ? 'opacity-100 scale-x-100 ml-3' : 'opacity-0 scale-x-0 ml-0'}`}
              >
                수신함
              </span>
              {inboxCount > 0 && (
                <span
                  className={`absolute bg-warning  text-center text-white  font-semibold  rounded-full
                  ${isOpen ? ' w-5 h-5 right-[10px] top-[9px]    text-sm' : 'w-[15px] h-[15px] right-[1px] top-[5px] text-xs '}`}
                >
                  {inboxCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        <div
          className={`mt-1 px-3 transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        >
          <div className="flex items-center p-2 rounded-lg w-full transition-all duration-300 ease-in-out">
            <Icon
              icon="Folder"
              size={14}
              className={`min-w-[14px] transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-[-4px]'}`}
            />
            <span
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden origin-left
        ${isOpen ? 'opacity-100 scale-x-100 ml-3' : 'opacity-0 scale-x-0 ml-0'}`}
            >
              프로젝트
            </span>
          </div>
          <div>
            {data?.data?.map((project) => {
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-sm min-w-[14px] transition-all duration-300
      ${isOpen ? 'translate-x-0' : 'translate-x-[-4px]'}`}
                    style={{ backgroundColor: project.color }}
                  />
                  <span
                    className={`transition-all duration-300 whitespace-nowrap overflow-hidden origin-left
      ${isOpen ? 'opacity-100 scale-x-100 ml-2' : 'opacity-0 scale-x-0 ml-0'}`}
                  >
                    {project.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
      <UserProfile isOpen={isOpen} />
    </aside>
  )
}
