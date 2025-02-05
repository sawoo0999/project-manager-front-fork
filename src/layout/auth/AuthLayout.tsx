import { Link, Outlet } from 'react-router-dom'
import logoText from '@/assets/images/logo-text.png'

export default function AuthLayout() {
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
