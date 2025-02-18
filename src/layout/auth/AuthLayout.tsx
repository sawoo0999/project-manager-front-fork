import logoText from '@/assets/images/logo-text.png'
import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className=" min-h-screen">
      <nav className="bg-screenBg h-14 lg:h-[70px] pl-10 md:pl-12 lg:pl-[60px] content-center">
        <Link to="/">
          <img src={logoText} className="w-[100px] lg:w-[160px] h-auto" />
        </Link>
      </nav>
      <main className="w-full h-[calc(100vh-56px)] md:h-[calc(100vh-70px)] bg-white flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  )
}
