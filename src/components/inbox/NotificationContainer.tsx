import { useState, ReactElement } from 'react'
import NotificationCommentCard from './NotificationCommentCard'
import NotificationInviteCard from './NotificationInviteCard'
import EmptyState from './EmptyState'
import { cn } from '@/shared/lib/utils'
import {
  useQueryNotificationComment,
  useQueryNotificationInvites,
} from '@/shared/queries/useQueryNotification'

type TabType = 'news' | 'invite'

export default function NotificationContainer(): ReactElement {
  const [activeTab, setActiveTab] = useState<TabType>('news')

  const { data: notificationData, isPending: isCommentsPending } =
    useQueryNotificationComment()
  const { data: inviteData, isPending: isInvitesPending } =
    useQueryNotificationInvites()

  const notificationComments = (notificationData?.data ?? []).map(
    (comment) => ({
      ...comment,
      type: 'comment' as const,
    }),
  )
  const enrichedInvites = (inviteData?.data ?? []).map((invite) => ({
    projectId: invite.id,
    type: 'invite' as const,
    projectName: invite.name,
    inviterName: '초대한 사람 (임시)',
  }))

  if (isCommentsPending || isInvitesPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center py-8 gap-8 w-[290px] sm:w-full">
      <h1 className="text-xl font-semibold">수신함</h1>

      {/* ✅ 모바일/태블릿 탭 UI */}
      <div className="flex md:hidden w-[280px] border-b border-gray-200">
        <div className="flex w-[172px] gap-3">
          <button
            onClick={() => setActiveTab('news')}
            className={cn(
              'py-1 text-sm font-semibold text-center',
              activeTab === 'news'
                ? 'text-black border-t-2 border-primary'
                : 'text-gray-400',
            )}
          >
            새로운 소식
          </button>
          <button
            onClick={() => setActiveTab('invite')}
            className={cn(
              'py-1 text-sm font-semibold text-center',
              activeTab === 'invite'
                ? 'text-black border-t-2 border-primary'
                : 'text-gray-400',
            )}
          >
            프로젝트 초대
          </button>
        </div>
      </div>

      {/* ✅ 모바일/태블릿 컨텐츠 */}
      <div className="md:hidden flex flex-col gap-4 w-[280px]">
        {activeTab === 'news' ? (
          notificationComments.length > 0 ? (
            notificationComments.map((notification) => (
              <NotificationCommentCard
                key={notification.notificationId}
                notification={notification}
              />
            ))
          ) : (
            <EmptyState iconName="Category" message="새로운 소식이 없습니다" />
          )
        ) : enrichedInvites.length > 0 ? (
          enrichedInvites.map((notification) => (
            <NotificationInviteCard
              key={notification.projectId}
              notification={notification}
            />
          ))
        ) : (
          <EmptyState iconName="Member" message="프로젝트 초대가 없습니다" />
        )}
      </div>

      {/* ✅ 데스크탑 레이아웃 */}
      <div className="hidden md:flex flex-row gap-20">
        <div className="flex flex-col gap-4 w-[400px]">
          <h2 className="font-semibold text-base">새로운 소식</h2>
          {notificationComments.length > 0 ? (
            notificationComments.map((notification) => (
              <NotificationCommentCard
                key={notification.notificationId}
                notification={notification}
              />
            ))
          ) : (
            <EmptyState iconName="Category" message="새로운 소식이 없습니다" />
          )}
        </div>

        <div className="flex flex-col gap-4 w-[400px]">
          <h2 className="font-semibold text-base">프로젝트 초대</h2>
          {enrichedInvites.length > 0 ? (
            enrichedInvites.map((notification) => (
              <NotificationInviteCard
                key={notification.projectId}
                notification={notification}
              />
            ))
          ) : (
            <EmptyState iconName="Member" message="프로젝트 초대가 없습니다" />
          )}
        </div>
      </div>
    </div>
  )
}
