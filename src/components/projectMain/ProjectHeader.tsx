import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MemberList from './MemberList'

export interface ProjectProps {
  id: number
  name: string
  color: string
}

export default function ProjectHeader({
  id: projectId,
  name,
  color,
}: ProjectProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentProjectPath = location.pathname.split('/').slice(0, 3).join('/')

  const [memberListOpen, setMemberListOpen] = useState(false)

  return (
    <div className="relative flex justify-between p-3 border-b border-bodyBorder bg-white rounded-tl-lg">
      <div className="flex items-center gap-3">
        <div
          className="w-5 h-5 md:w-10 md:h-10 rounded-button"
          style={{ backgroundColor: color }}
        ></div>
        <Link to={`/project/${projectId}`} className="text-base md:text-xl">
          {name}
        </Link>
        <Icon
          icon="Setting"
          className="w-[14px] h-[14px] md:w-5 md:h-5 cursor-pointer"
          onClick={() => {
            navigate(`${currentProjectPath}/update`)
          }}
        />
      </div>
      <Button
        variant="member"
        onClick={() => setMemberListOpen(!memberListOpen)}
      >
        <Icon icon="Member" size={10} />
        멤버
      </Button>
      {memberListOpen && <MemberList currentProjectPath={currentProjectPath} />}
    </div>
  )
}
