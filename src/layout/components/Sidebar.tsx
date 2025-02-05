import profileIcon from '@/assets/images/profile.png'
import { MOCK_PROJECT_LIST } from '@/shared/mock/projectList'
import { Icon } from '@/shared/ui/Icon'
import { useSidebarStore } from '@/store/sidebarStore'
import { useModalStore } from '@/store/useModalStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarStore()

  const { openModal } = useModalStore()

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 640
      setIsOpen(isDesktop)
    }
    // 초기 실행
    handleResize()
    // resize 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)
    // cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpen])

  return (
    <aside
      className={`bg-gradient-to-b from-white to-screenBg rounded-tr-lg flex flex-col transition-all duration-300 ease-in-out text-sm  font-pretendard
        ${isOpen ? 'w-64 px-2 py-1' : 'w-16 items-center'} 
        h-[calc(100vh-64px)]`}
    >
      <div
        className="p-4 sm:px-2"
        onClick={() => {
          openModal('create-project')
        }}
      >
        <button
          className={` bg-[#82CD47] text-white rounded-button hover:bg-primary/80 transition-all duration-300 h-10
          ${isOpen ? 'w-19 px-4' : 'w-7 h-7'}`}
        >
          <div
            className={`flex  items-center w-full justify-center overflow-hidden`}
          >
            <Icon
              icon="Plus"
              size={10}
              className={`transition-all duration-300 whitespace-nowrap   ${isOpen ? 'mr-1 opacity-100' : 'opacity-0 w-0'}`}
            />
            <span
              className={`transition-all duration-300 whitespace-nowrap   ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
            >
              프로젝트
            </span>
            <span
              className={`text-center transition-all duration-300  ${isOpen ? 'opacity-0 w-0' : 'opacity-100 '}`}
            >
              <Icon icon="Plus" size={10} />
            </span>
          </div>
        </button>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1">
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

        {/* 프로젝트 리스트 */}
        <div
          className={`mt-1 px-3 transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        >
          <div
            className={`flex items-center p-2  
                ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
          >
            <Icon icon="Folder" size={14} className="min-w-[14px]" />
            <span
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
            >
              프로젝트
            </span>
          </div>
          {/* api 적용할때 반복문으로 수정 */}
          <div className="space-y-2">
            {MOCK_PROJECT_LIST.map((project) => {
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className={`flex items-center  p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${isOpen ? 'gap-2' : ''}`}
                >
                  <div className="w-3.5 h-3.5 rounded-sm bg-red-500 min-w-[8px]"></div>
                  <span
                    className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
                  >
                    {project.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 하단 프로필 영역 */}
      <div className={`p-4 border-t border-gray-200 `}>
        <div
          className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}
        >
          <Link
            to="/profile"
            className={` ${isOpen ? 'w-14 h-14' : 'w-8 h-8'}`}
          >
            <img src={profileIcon} alt="프로필" />
          </Link>
          <div className={`${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <Link to="/profile" className="font-medium">
              강나연
            </Link>
            <div className={`text-xs text-gray-500 `}>yeonna18k@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
