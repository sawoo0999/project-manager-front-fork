import { TaskListResponse } from '@/shared/types/task'
import TaskList from './TaskList'

interface TaskSectionProps {
  title: string
  taskData: TaskListResponse
  onPageChange: (page: number) => void
}

const TaskSection = ({ title, taskData, onPageChange }: TaskSectionProps) => {
  return (
    <div className="flex flex-col w-[780px] gap-3 ">
      <h2 className="text-sm lg:text-xl font-bold">{title}</h2>
      <TaskList taskData={taskData ?? undefined} onPageChange={onPageChange} />
    </div>
  )
}

export default TaskSection
