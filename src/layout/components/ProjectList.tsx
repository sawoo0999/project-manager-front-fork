import { Link } from 'react-router-dom'
import { Icon } from '@/shared/ui/Icon'
import { useQueryProjectList } from '@/shared/queries/useQueryProjectList'

interface ProjectListProps {
  isOpen: boolean
}

export const ProjectList = ({ isOpen }: ProjectListProps) => {
  const { data: projectsData, isPending } = useQueryProjectList()
  const projects = projectsData?.data
  return (
    <div
      className={`mt-1 px-3 transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
    >
      <div
        className={`flex items-center p-2 ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
      >
        <Icon icon="Folder" size={14} className="min-w-[14px]" />
        <span
          className={`transition-all duration-300 whitespace-nowrap overflow-hidden 
          ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
        >
          프로젝트
        </span>
      </div>
      <div className="space-y-2">
        {isPending ? (
          <div className="p-2 text-gray-500 text-sm">로딩중...</div>
        ) : projects?.length ? (
          projects?.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${isOpen ? 'gap-2' : ''}`}
            >
              <div
                className="w-3.5 h-3.5 rounded-sm min-w-[8px]"
                style={{ backgroundColor: project.color }}
              ></div>
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden 
                ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
              >
                {project.name}
              </span>
            </Link>
          ))
        ) : (
          <div
            className={`p-2 text-gray-300 text-sm transition-all duration-300 whitespace-nowrap overflow-hidden  ${isOpen ? 'block ' : 'hidden '}`}
          >
            <div className="flex items-center gap-2">
              <Icon icon="Folder" size={14} />
              생성된 프로젝트가 없습니다
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
