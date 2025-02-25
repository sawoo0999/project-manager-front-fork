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
    <div className={`p-4 border-t border-gray-200`}>
      <div
        className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}
      >
        <Link to="/profile" className={`${isOpen ? 'w-10 h-10' : 'w-7 h-7'}`}>
          <img src={user.image_url} alt="프로필" className="rounded-full" />
        </Link>
        <div className={`${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
          <Link to="/profile" className="font-medium">
            {user.nickname}
          </Link>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </div>
    </div>
  )
}
