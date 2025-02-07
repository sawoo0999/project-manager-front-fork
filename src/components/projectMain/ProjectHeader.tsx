import { MOCK_PROJECT_LIST } from '@/shared/mock/projectList'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function ProjectHeader() {
  const { projectId } = useParams()
  const project = MOCK_PROJECT_LIST.find(
    (project) => project.id === Number(projectId),
  )

  const navigate = useNavigate()
  const location = useLocation()
  const currentProjectPath = location.pathname.split('/').slice(0, 3).join('/')

  return (
    <div className="flex justify-between p-3 border-b border-bodyBorder bg-white rounded-tl-lg">
      <div className="flex items-center gap-3">
        <div className="bg-category-red w-5 h-5 md:w-10 md:h-10 rounded-button"></div>
        <div className="text-base md:text-xl">{project?.name}</div>
        <Icon
          icon="Setting"
          className="w-[14px] h-[14px] md:w-5 md:h-5 cursor-pointer"
          onClick={() => {
            navigate(`${currentProjectPath}/update`)
          }}
        />
      </div>
      <Button variant="member">
        <Icon icon="Member" size={10} />
        멤버
      </Button>
    </div>
  )
}
