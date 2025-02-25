import { NotificationItem } from '@/shared/mock/inbox'
import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/common/button'
import { ReactElement } from 'react'

interface NotificationCardProps {
  notification: NotificationItem
  showActions?: boolean
}

const getIconByType = (type: string): ReactElement => {
  switch (type) {
    case 'task':
      return <Icon icon="Bell" size={32} className=" md:w-8 md:h-8 w-6 h-6" />
    case 'invite':
      return <Icon icon="Member" size={32} className=" md:w-8 md:h-8 w-6 h-6" />
    case 'comment':
      return <Icon icon="Update" size={32} className="md:w-8 md:h-8 w-6 h-6" />
    default:
      return <Icon icon="Bell" size={32} className="md:w-8 md:h-8 w-6 h-6" />
  }
}

export default function NotificationCard({
  notification,
  showActions = false,
}: NotificationCardProps): ReactElement {
  const { type, title, content } = notification

  return (
    <div className="flex flex-row items-start md:p-4 md:pl-8 p-3 pl-4 gap-2 md:gap-4 w-full bg-white shadow-md rounded-xl">
      <div className="flex-shrink-0">{getIconByType(type)}</div>
      <div className="flex flex-col gap-1 md:gap-2 flex-grow">
        <h3 className="font-bold text-xs md:text-sm ">{title}</h3>
        <p className="font-bold text-xs md:text-sm ">{content}</p>
        {showActions && (
          <div className="flex justify-end gap-1 md:gap-2 mt-2">
            <Button variant="categoryDelete" className="text-xs px-3 py-1">
              거절
            </Button>
            <Button variant="modal" className="text-xs px-3 py-1">
              수락
            </Button>
          </div>
        )}
      </div>
      {type !== 'invite' && (
        <button className="p-1">
          <Icon
            icon="Close"
            size={14}
            className="text-gray-400 md:w-3.5 md:h-3.5 w-2 h-2"
          />
        </button>
      )}
    </div>
  )
}
