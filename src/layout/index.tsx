import logoText from '@/assets/images/logo-text.png'
import ModalController from '@/components/modal/ModalController'
import { postLogout } from '@/services/auth.service'
import { Icon } from '@/shared/ui/Icon'
import { useSidebarStore } from '@/store/sidebarStore'
import useSessionStore from '@/store/useSessionStore'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toggle } = useSidebarStore()
  const { access_token } = useSessionStore.getState()
  const logout = useSessionStore((state) => state.logout)
  // 사이드바가 필요한 메인 경로들
  const mainRoutes = [
    '/main',
    '/project',
    '/inbox',
    '/profile',
    '/section',
    '/home',
  ]
  const isMainRoute = mainRoutes.some((route) =>
    location.pathname.startsWith(route),
  )

  const handleLogout = async () => {
    try {
      await postLogout()
      logout()
      navigate('/')
    } catch (error) {
      console.error('로그아웃 실패:', error)
      navigate('/')
    }
  }

  // 랜딩 페이지
  if (location.pathname === '/') {
    return (
      <div className="bg-screenBg min-h-screen">
        <nav className="px-4 flex items-center justify-between">
          <Link to="/">
            <img src={logoText} className="w-2/3 md:w-auto h-auto" />
          </Link>

          {!access_token ? (
            <Link to="/login">로그인</Link>
          ) : (
            <button onClick={handleLogout}>로그아웃</button>
          )}
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    )
  }

  // 로그인, 회원가입 페이지
  if (['/login', '/signup'].includes(location.pathname)) {
    return (
      <div className="bg-screenBg min-h-screen">
        <nav className="px-4 flex">
          <Link to="/">
            <img src={logoText} className="w-2/3 md:w-auto h-auto" />
          </Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    )
  }

  // 메인 라우트 (대시보드, 프로젝트 등)
  if (isMainRoute) {
    return (
      <div className="bg-screenBg min-h-screen">
        <nav className="px-4 flex items-center">
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
}
