import { useMutationDeleteRoleNotification } from '@/shared/queries/useMutationNotification'
import { Icon } from '@/shared/ui/Icon'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'

interface NotificationProjectRole {
  id: number
  name: string
  role: 'USER' | 'ADMIN'
}

interface NotificationProjectRoleCardProps {
  project: NotificationProjectRole
}

export default function NotificationProjectRoleCard({
  project,
}: NotificationProjectRoleCardProps): ReactElement {
  const deleteMutation = useMutationDeleteRoleNotification()
  const handleDeleteRoleCard = async () => {
    try {
      await deleteMutation.mutateAsync({
        projectId: project.id,
        role: project.role,
      })
      toast.success('권한 알림이 삭제되었습니다')
    } catch (error) {
      toast.error('삭제 중 오류가 발생했습니다')
      console.error('삭제 오류:', error)
    }
  }

  return (
    <div className="flex flex-row items-start p-4 gap-2 w-full h-[90px] bg-white shadow-md rounded-xl ">
      <div className="flex-shrink-0">
        {<Icon icon="Folder" size={32} className="w-6 h-6" />}
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="text-xs md:text-sm">
          <span className="inline-flex max-w-[190px] sm:max-w-[310px] truncate font-bold">
            {project.name}
          </span>
          의 권한이
          <span className="font-bold">{` ${project.role}`}</span>으로
          변경되었습니다.
          {/* {status === 'uncheck' && (
            <span className="ml-1 w-2 h-2 bg-warning rounded-full inline-block" />
          )} */}
        </h3>
      </div>
      <button
        onClick={handleDeleteRoleCard}
        disabled={deleteMutation.isPending}
        className="p-1"
        aria-label="알림 삭제"
      >
        <Icon
          icon="Close"
          size={14}
          className={`text-gray-400 md:w-3.5 md:h-3.5 w-2 h-2 ${status === 'check' ? 'opacity-50' : ''}`}
        />
      </button>
    </div>
  )
}
