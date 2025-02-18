import {
  MOCK_COMPLETED_TASKS,
  MOCK_PROGRESS_TASKS,
  MOCK_USER,
} from '@/shared/mock/task'
import { useState } from 'react'
import TaskList from './TaskList'
export default function HomePage() {
  const [inProgressPage, setInProgressPage] = useState(1)
  const [completedPage, setCompletedPage] = useState(1)
  const inProgressTaskData = MOCK_PROGRESS_TASKS.find(
    (t) => t.page === inProgressPage,
  )
  const completedTaskData = MOCK_COMPLETED_TASKS.find(
    (t) => t.page === completedPage,
  )
  const formatDate = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const day = dayNames[now.getDay()]
    return `${month}월 ${date}일 ${day}요일`
  }

  const handleInProgressPageChange = (page: number) => {
    setInProgressPage(page)
  }

  const handleCompletedPageChange = (page: number) => {
    setCompletedPage(page)
  }

  return (
    <div className="w-full bg-white rounded-l-lg flex">
      <div className="flex flex-col items-center py-10 gap-14  px-4 sm:px-2 w-full">
        {/* Header */}
        <div className="text-center text-base">
          {formatDate()}{' '}
          <span className="font-semibold">{MOCK_USER.username}</span>님
          안녕하세요!
        </div>

        {/* Stats Bar */}
        <div className="flex  justify-center gap-4 px-4 py-2 border border-primary rounded-full sm:text-sm">
          <div className="text-primary font-bold">total</div>
          <div className="text-primary font-bold">
            {MOCK_USER.stats.totalProjects} 프로젝트
          </div>
          <div className="text-primary font-bold">
            {MOCK_USER.stats.totalCards} 카드
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm lg:text-xl font-bold">{`${MOCK_USER.username}님의 진행중인 작업`}</h2>
            <TaskList
              taskData={inProgressTaskData}
              onPageChange={handleInProgressPageChange}
            />
          </div>
          <div className="flex flex-col  gap-3">
            <h2 className="text-sm lg:text-xl font-bold">{`${MOCK_USER.username}님의 완료 된 작업`}</h2>
            <TaskList
              taskData={completedTaskData}
              onPageChange={handleCompletedPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
