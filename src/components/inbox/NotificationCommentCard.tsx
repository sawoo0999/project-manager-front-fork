import { useMutationCheckNotification } from '@/shared/queries/useMutationNotification'
import { Icon } from '@/shared/ui/Icon'
import { ReactElement } from 'react'

interface NotificationComment {
  notificationId: string
  projectName: string
  cardName: string
  nickName: string
  content: string
  createAt: string
  status: 'check' | 'uncheck'
}

interface NotificationCommentCardProps {
  notification: NotificationComment
}

export default function NotificationCommentCard({
  notification,
}: NotificationCommentCardProps): ReactElement {
  const {
    notificationId,
    projectName,
    cardName,
    nickName,
    content,
    status,
    createAt,
  } = notification
  const formattedDate = createAt.split(' ')[0]
  const checkMutation = useMutationCheckNotification()

  const handleCheckNotification = async () => {
    if (status === 'check') return

    try {
      await checkMutation.mutateAsync({ notificationId })
    } catch (error) {
      console.error('읽음 처리 오류:', error)
    }
  }

  return (
    <div
      className={`flex flex-row items-start p-4 gap-2 w-full h-[120px] bg-white shadow-md rounded-xl cursor-pointer transition-opacity duration-300 ${
        status === 'check' ? 'opacity-50' : ''
      }`}
      onClick={handleCheckNotification}
    >
      <div className="flex-shrink-0">
        {<Icon icon="Update" size={32} className="w-6 h-6" />}
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="font-bold text-xs md:text-sm ">
          {`${projectName}의 ${cardName} 카드에 ${nickName}님이 댓글을 달았습니다.`}
          {status === 'uncheck' && (
            <span className="ml-1 w-2 h-2 bg-warning rounded-full inline-block" />
          )}
        </h3>
        <p className="text-xs md:text-sm ">{`"${content ?? '내용 없음'}"`}</p>
        <p className="text-cardDate text-xs md:text-sm  ">{formattedDate}</p>
      </div>
      <button className="p-1">
        <Icon
          icon="Close"
          size={14}
          className={`text-gray-400 md:w-3.5 md:h-3.5 w-2 h-2 ${status === 'check' ? 'opacity-50' : ''}`}
        />
      </button>
    </div>
  )
}
