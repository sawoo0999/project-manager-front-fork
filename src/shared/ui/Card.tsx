import profileImg from '@/assets/images/profile.png'
import { differenceInDays, endOfDay, format } from 'date-fns'
import { Link } from 'react-router-dom'

export interface CardProps {
  projectId: number
  cardId: number
  sectionId: number
  title: string
  content: string
  startDate: string
  endDate: string
  completedDate?: string
  color: string
  categoryName: string
  nickName: string
  photoUrl: string
}

export default function Card({
  projectId,
  cardId,
  sectionId,
  title,
  // content,
  startDate,
  endDate,
  color,
  categoryName,
  // nickName,
  photoUrl,
}: CardProps) {
  const now = endOfDay(new Date())
  const endDay = endOfDay(new Date(endDate))
  const dDay = differenceInDays(endDay, now)

  return (
    <Link
      to={`/project/${projectId}/section/${sectionId}/${cardId}`}
      className="w-full rounded-card bg-white shadow-md mb-2"
    >
      <div
        className="px-3 py-1 text-xs rounded-t-card"
        style={{ backgroundColor: color }}
      >
        {categoryName}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col flex-1 gap-1 pl-3 py-2 truncate">
          <span className="text-sm truncate">{title}</span>
          <span className="text-xs text-cardDate">
            {format(startDate, 'yy.MM.dd')} - {format(endDate, 'yy.MM.dd')}
          </span>
        </div>
        <div className="flex flex-col items-center mt-2 mb-1.5 mr-1.5 gap-0.5">
          <span className="text-xs w-fit">
            D{dDay < 0 ? `+${dDay * -1}` : dDay === 0 ? '-day' : dDay * -1}
          </span>
          <img
            src={photoUrl || profileImg}
            width={25}
            height={25}
            alt="user-img"
            className="rounded-full"
          />
        </div>
      </div>
    </Link>
  )
}
