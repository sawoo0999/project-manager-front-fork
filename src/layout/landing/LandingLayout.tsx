import logoText from '@/assets/images/logo-text.png'
import useSessionStore from '@/store/useSessionStore'
import { Link, Outlet } from 'react-router-dom'

export default function LandingLayout() {
  const { access_token } = useSessionStore.getState()
  console.log(access_token)

  return (
    <div className="min-h-screen">
      <nav className="bg-screenBg h-14 lg:h-[70px] pl-10 md:pl-12 lg:pl-[60px] content-center">
        <Link to="/">
          <img src={logoText} className="w-[100px] lg:w-[160px] h-auto" />
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
