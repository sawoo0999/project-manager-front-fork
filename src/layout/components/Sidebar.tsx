// components/Sidebar.tsx
import { useEffect } from 'react'
import { useSidebarStore } from '@/store/sidebarStore'
import { MainNavigation } from './MainNavigation'
import { ProjectList } from './ProjectList'
import { UserProfile } from './UserProfile'
import { CreateProjectButton } from './CreateProjectButton'

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarStore()

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
      className={`p-2 bg-gradient-to-b from-white to-screenBg rounded-tr-lg flex flex-col h-[calc(100vh)] transition-all duration-300 ease-in-out text-sm font-pretendard
      ${isOpen ? 'w-64' : 'w-16 items-center'}`}
    >
      <CreateProjectButton isOpen={isOpen} />
      <nav className="flex-1">
        <MainNavigation isOpen={isOpen} />
        <ProjectList isOpen={isOpen} />
      </nav>
      <UserProfile isOpen={isOpen} />
    </aside>
  )
}
