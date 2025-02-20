import { Icon } from '@/shared/ui/Icon'
import { TaskListResponse } from '@/services/task.service'
import { Link } from 'react-router-dom'

interface TaskListProps {
  taskData?: TaskListResponse
  onPageChange: (page: number) => void
}

export default function TaskList({ taskData, onPageChange }: TaskListProps) {
  if (!taskData?.content.length) {
    return (
      <div className="text-center py-10 text-gray-500">작업이 없습니다.</div>
    )
  }

  const { content: tasks, currentPage: page, totalPages } = taskData

  function getDateDiff(endDate: string): string {
    const today = new Date()
    const end = new Date(endDate)
    const diffDays = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )

    return diffDays === 0
      ? 'D-Day'
      : diffDays < 0
        ? `D+${Math.abs(diffDays)}`
        : `D-${diffDays}`
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col   ">
        {/*  PC 버전 */}
        <div className="hidden  lg:block ">
          <div className="grid grid-cols-[180px_120px_120px_200px_160px] place-items-center ">
            <div className="contents">
              <div className="w-full text-sm text-center py-1 border-b">
                프로젝트
              </div>
              <div className="w-full text-sm text-center py-1 border-b">
                섹션
              </div>
              <div className="w-full text-sm text-center py-1 border-b">
                카테고리
              </div>
              <div className="w-full text-sm text-center py-1 border-b">
                카드
              </div>
              <div className="w-full text-sm text-center py-1 border-b">
                기간
              </div>
            </div>

            {tasks.map((task) => {
              const formatStartDate = task.startDate.split('T')[0]
              const formatEndDate = task.endDate.split('T')[0]
              const cardId = task.id
              const projectId = task.section.project.id
              const sectionId = task.section.id
              return (
                <Link
                  to={`/project/${projectId}/section/${sectionId}/${cardId}`}
                  key={`pc-${task.id}`}
                  className="contents"
                >
                  <div className="flex gap-3 py-1 ">
                    <div
                      className="w-6 h-6 rounded flex-shrink-0"
                      style={{ backgroundColor: task.section.project.color }}
                    />
                    <span className="text-sm font-medium w-[120px]  truncate overflow-hidden whitespace-nowrap">
                      {task.section.project.name}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-center py-1">
                    {task.section.project.name}
                  </div>
                  <div className=" text-sm font-medium text-center py-1">
                    {task.category.name}
                  </div>
                  <div className=" text-sm font-medium text-center py-1">
                    {task.title}
                  </div>
                  <div className=" text-xs font-medium text-center py-1">
                    {`${formatStartDate} ~ ${formatEndDate}`}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/*  태블릿 버전 */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-[140px_140px_140px_140px] place-items-center">
            <div className="contents">
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                프로젝트
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                섹션
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                카드
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                기간
              </div>
            </div>

            {tasks.map((task) => {
              const cardId = task.id
              const projectId = task.section.project.id
              const sectionId = task.section.id

              return (
                <Link
                  to={`/project/${projectId}/section/${sectionId}/${cardId}`}
                  key={`tablet-${task.id} `}
                  className="contents"
                >
                  <div className="flex items-center justify-center gap-3 py-2">
                    <div
                      className="w-6 h-6 rounded flex-shrink-0"
                      style={{ backgroundColor: task.section.project.color }}
                    />
                    <span className="text-sm font-medium w-[120px] truncate overflow-hidden whitespace-nowrap">
                      {task.section.project.name}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-center py-2   ">
                    {task.section.name}
                  </div>
                  <div className="text-sm font-medium text-center py-2  ">
                    {task.title}
                  </div>
                  <div className="text-xs font-medium text-center py-2 ">
                    {getDateDiff(task.endDate)}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ✅ 모바일 버전 */}
        <div className="block md:hidden">
          <div className="grid grid-cols-[100px_120px_40px] place-items-center">
            <div className="contents">
              <div className="text-xs text-center py-1 border-b border-bodyBorder">
                프로젝트
              </div>
              <div className="text-xs text-center py-1 border-b border-bodyBorder">
                카드
              </div>
              <div className="text-xs text-center py-1 border-b border-bodyBorder">
                기간
              </div>
            </div>

            {tasks.map((task) => {
              const cardId = task.id
              const projectId = task.section.project.id
              const sectionId = task.section.id
              return (
                <Link
                  to={`/project/${projectId}/section/${sectionId}/${cardId}`}
                  key={`tablet-${task.id} `}
                  className="contents"
                >
                  <div className=" text-sm font-medium text-center py-2 max-w-[120px] truncate overflow-hidden whitespace-nowrap ">
                    {task.section.project.name}
                  </div>
                  <div className=" text-sm font-medium text-center py-2 max-w-[120px] truncate overflow-hidden whitespace-nowrap">
                    {task.title}
                  </div>
                  <div className="text-xs font-medium text-center py-2">
                    {getDateDiff(task.endDate)}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-3">
          <div className="flex items-center gap-2">
            <button
              className={`${page <= 0 ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(0)}
              disabled={page <= 0}
            >
              <Icon icon="AngleDoubleLeft" size={10} />
            </button>
            <button
              className={`${page <= 0 ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 0}
            >
              <Icon icon="AngleLeft" size={10} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i)
              .filter((num) =>
                page < 5 ? num < 5 : num >= page - 2 && num <= page + 2,
              )
              .map((num) => (
                <button
                  key={num}
                  className={`text-xs font-medium px-2 ${
                    num === page ? 'text-primary font-bold' : 'text-black'
                  }`}
                  onClick={() => onPageChange(num)}
                >
                  {num + 1}
                </button>
              ))}
            <button
              className={`${page >= totalPages - 1 ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages - 1}
            >
              <Icon icon="AngleRight" size={10} />
            </button>
            <button
              className={`${page >= totalPages - 1 ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(totalPages - 1)}
              disabled={page >= totalPages - 1}
            >
              <Icon icon="AngleDoubleRight" size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
