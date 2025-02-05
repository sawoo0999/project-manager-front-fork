import { Icon } from '@/shared/ui/Icon'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ModalController from '@/components/modal/ModalController'
import logoText from '@/assets/images/logo-text.png'
import { useSidebarStore } from '@/store/sidebarStore'

export default function MainLayout() {
  const { toggle } = useSidebarStore()
  return (
    <div className="bg-screenBg min-h-screen flex flex-col">
      <nav className="px-4 ">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 hover:bg-white/60 rounded-lg transition-colors"
          >
            <Icon icon="Menu" size={20} />
          </button>
          <div>
            <Link to="/">
              <img src={logoText} className="w-2/3 md:w-auto h-auto" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex gap-3 overflow-auto ">
        <Sidebar />
        <main className="flex overflow-x-scroll grow">
          <Outlet />
        </main>
      </div>
      <ModalController />
    </div>
  )
}
