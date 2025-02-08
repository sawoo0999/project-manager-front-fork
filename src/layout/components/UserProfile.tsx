import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/services/user.service'
import profileIcon from '@/assets/images/profile.png'
interface UserProfileProps {
  isOpen: boolean
}

export const UserProfile = ({ isOpen }: UserProfileProps) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })

  if (isLoading || !user) return null

  return (
    <div className={`p-4 border-t border-gray-200`}>
      <div
        className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}
      >
        <Link to="/profile" className={`${isOpen ? 'w-14 h-14' : 'w-8 h-8'}`}>
          {!user.imageUrl ? (
            <img src={profileIcon} alt="프로필" className="rounded-full" />
          ) : (
            <img src={user.imageUrl} alt="프로필" className="rounded-full" />
          )}
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
