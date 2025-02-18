import logoText from '@/assets/images/logo-text.png'
import { postLogout } from '@/services/auth.service'
import useSessionStore from '@/store/useSessionStore'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function LandingLayout() {
  const { access_token } = useSessionStore.getState()
  console.log(access_token)
  const logout = useSessionStore((state) => state.logout)
  const navigate = useNavigate()
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
