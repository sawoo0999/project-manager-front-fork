// pages/NotificationPage.tsx
import { ReactElement, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { dummyData, NotificationResponse } from '@/shared/mock/inbox'
import NotificationCard from './NotificationCard'
import EmptyState from './EmptyState'
import { cn } from '@/shared/lib/utils'

type TabType = 'news' | 'invite'

export default function NotificationPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<TabType>('news')

  const { data, isLoading } = useQuery<NotificationResponse>({
    queryKey: ['notifications'],
    queryFn: () => Promise.resolve(dummyData),
    staleTime: Infinity,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  const notifications = data?.data ?? []

  const newsNotifications = notifications.filter(
    (notice) => notice.type === 'task' || notice.type === 'comment',
  )

  const inviteNotifications = notifications.filter(
    (notice) => notice.type === 'invite',
  )

  return (
    <div className="flex flex-col items-center py-8 gap-8 w-full ">
      <h1 className="text-xl font-semibold">수신함</h1>

      {/* 모바일/태블릿 탭 UI */}
      <div className="flex md:hidden w-[280px] border-b border-gray-200">
        <div className="flex w-[172px] gap-3">
          <button
            onClick={() => setActiveTab('news')}
            className={cn(
              ' py-1 text-sm font-semibold text-center',
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
              ' py-1 text-sm font-semibold text-center',
              activeTab === 'invite'
                ? 'text-black border-t-2 border-primary'
                : 'text-gray-400',
            )}
          >
            프로젝트 초대
          </button>
        </div>
      </div>

      {/* 모바일/태블릿 컨텐츠 */}
      <div className="md:hidden flex flex-col gap-4 w-[280px]">
        {activeTab === 'news' ? (
          newsNotifications.length > 0 ? (
            newsNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <EmptyState iconName="Category" message="새로운 소식이 없습니다" />
          )
        ) : inviteNotifications.length > 0 ? (
          inviteNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              showActions={notification.type === 'invite'}
            />
          ))
        ) : (
          <EmptyState iconName="Member" message="프로젝트 초대가 없습니다" />
        )}
      </div>

      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:flex flex-row gap-20">
        <div className="flex flex-col gap-4 w-[400px]">
          <h2 className="font-semibold text-base">새로운 소식</h2>
          {newsNotifications.length > 0 ? (
            newsNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <EmptyState iconName="Category" message="새로운 소식이 없습니다" />
          )}
        </div>

        <div className="flex flex-col gap-4 w-[400px]">
          <h2 className="font-semibold text-base">프로젝트 초대</h2>
          {inviteNotifications.length > 0 ? (
            inviteNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                showActions={notification.type === 'invite'}
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
