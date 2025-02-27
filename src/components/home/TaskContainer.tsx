import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  useQueryCompletedTaskList,
  useQueryInProgressTaskList,
} from '@/shared/queries/useQueryTaskList'
import { useQueryProjectList } from '@/shared/queries/useQueryProjectList'
import UserGreeting from './UserGreeting'
import ProjectSummary from './ProjectSummary'
import TaskSection from './TaskSection'
import { useQueryUser } from '@/shared/queries/useQueryUser'

export default function TaskContainer() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const inProgressPage = Number(searchParams.get('inProgressPage')) || undefined
  const completedPage = Number(searchParams.get('completedPage')) || undefined
  const { data: userData } = useQueryUser()
  const { data: inProgressTasksData } =
    useQueryInProgressTaskList(inProgressPage)
  const { data: completedTasksData } = useQueryCompletedTaskList(completedPage)
  const { data: projectsData } = useQueryProjectList()
  const user = userData?.data
  const projects = projectsData?.data
  const inProgressTasks = inProgressTasksData?.data
  const completedTasks = completedTasksData?.data
  const totalCard =
    (inProgressTasks?.totalElements ?? 0) + (completedTasks?.totalElements ?? 0)
  const handlePageChange = (
    type: 'inProgress' | 'completed',
    value: number,
  ) => {
    const params = new URLSearchParams(searchParams)
    if (type === 'inProgress') {
      params.set('inProgressPage', value.toString())
    } else {
      params.set('completedPage', value.toString())
    }
    navigate(`?${params.toString()}`)
  }

  if (inProgressTasks && completedTasks)
    return (
      <div className="w-full bg-white rounded-l-lg">
        <div className="flex flex-col w-[290px] sm:w-full items-center py-5 gap-4 px-4 sm:px-2">
          <UserGreeting user={user?.nickname ?? ''} />
          <ProjectSummary
            projectCount={projects?.length ?? 0}
            totalCard={totalCard}
          />
          <div className="flex flex-col items-center gap-3 w-full">
            <TaskSection
              title={`${user?.nickname}의 진행중인 작업`}
              taskData={inProgressTasks}
              onPageChange={(page) => handlePageChange('inProgress', page)}
            />
            <TaskSection
              title={`${user?.nickname}의 완료된 작업`}
              taskData={completedTasks}
              onPageChange={(page) => handlePageChange('completed', page)}
            />
          </div>
        </div>
      </div>
    )
}
