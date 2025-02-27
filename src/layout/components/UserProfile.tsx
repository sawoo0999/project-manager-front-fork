import { useQueryUser } from '@/shared/queries/useQueryUser'
import { useSetUser } from '@/store/useUserStore'
import { Link } from 'react-router-dom'
interface UserProfileProps {
  isOpen: boolean
}

export const UserProfile = ({ isOpen }: UserProfileProps) => {
  const { data: userData, isPending } = useQueryUser()
  const user = userData?.data
  const setUser = useSetUser()
  if (user) {
    setUser({
      // id: user.id,
      email: user.email,
      nickName: user.nickname,
      imageUrl: user.image_url,
    })
  }

  if (isPending || !user) return null

  return (
    <div className="p-2.5 border-t border-gray-200">
      <div className="flex items-center transition-all duration-300 ease-in-out">
        <Link
          to="/profile"
          className={` rounded-full transition-all duration-300 ease-in-out
        ${isOpen ? 'w-10 h-10 mr-3' : 'w-7 h-7 mr-0'}`}
        >
          <img
            src={user.image_url}
            alt="프로필"
            className="rounded-full w-full h-full"
          />
        </Link>

        <div
          className={`transition-all duration-300 whitespace-nowrap overflow-hidden origin-left
        ${isOpen ? 'opacity-100 scale-x-100 max-w-full' : 'opacity-0 scale-x-0 max-w-0'}`}
        >
          <Link to="/profile" className="font-medium block">
            {user.nickname}
          </Link>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </div>
    </div>
  )
}
