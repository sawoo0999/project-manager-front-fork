import {
  useMutationAcceptNotification,
  useMutationRefuseNotification,
} from '@/shared/queries/useMutationNotification'
import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/common/button'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'

interface NotificationInvite {
  projectId: string
  projectName: string
  inviterName: string
}

interface NotificationInviteCardProps {
  notification: NotificationInvite
}

export default function NotificationInviteCard({
  notification,
}: NotificationInviteCardProps): ReactElement {
  const { projectId, projectName, inviterName } = notification

  const refuseMutation = useMutationRefuseNotification()
  const acceptMutation = useMutationAcceptNotification()

  const handleRefuse = async () => {
    if (!projectId) return

    try {
      await refuseMutation.mutateAsync({ projectId: Number(projectId) })
      toast.success('프로젝트가 거절되었습니다')
    } catch (error) {
      console.error('ERROR:::', error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const handleAccept = async () => {
    if (!projectId) return

    try {
      await acceptMutation.mutateAsync({ projectId: Number(projectId) })
      toast.success('프로젝트에 참여되었습니다')
    } catch (error) {
      toast.error('오류가 발생하였습니다')
      console.error('ERROR:::', error)
    }
  }

  return (
    <div className="flex flex-row items-start p-5 gap-4  w-full  bg-white shadow-md rounded-xl">
      <div className="flex-shrink-0">
        {<Icon icon="Member" size={32} className="w-6 h-6" />}
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <h3 className=" text-sm">
          <span className="font-bold">{`${inviterName}`}</span> 님으로부터
          <span className="font-bold">{` ${projectName}`}</span> 프로젝트 초대
          요청이 왔습니다.
        </h3>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="categoryDelete"
            className="text-xs px-3 py-1"
            onClick={handleRefuse}
            disabled={refuseMutation.isPending}
          >
            {refuseMutation.isPending ? '거절 중...' : '거절'}
          </Button>
          <Button
            variant="inbox"
            className="text-xs px-3 py-1"
            onClick={handleAccept}
            disabled={acceptMutation.isPending}
          >
            {acceptMutation.isPending ? '수락 중...' : '수락'}
          </Button>
        </div>
      </div>
    </div>
  )
}
