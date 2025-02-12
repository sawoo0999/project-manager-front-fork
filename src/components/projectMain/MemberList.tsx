import profileIcon from '@/assets/images/profile.png'
import { MOCK_MEMBER_LIST } from '@/shared/mock/memberList'
import { Icon } from '@/shared/ui/Icon'
import { useNavigate } from 'react-router-dom'

export default function MemberList({
  currentProjectPath,
}: {
  currentProjectPath: string
}) {
  const navigate = useNavigate()

  return (
    <div className="z-50 right-0 bg-white top-14 md:top-16  absolute border border-modalBorder rounded-input w-[282px] md:w-[352px] h-[120px] md:h-[180px] md:max-h-[180px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
      {MOCK_MEMBER_LIST.map((member) => {
        return (
          <div key={member} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 truncate">
              <img src={profileIcon} className="w-4 h-4 md:w-6 md:h-6" />
              <span className="truncate text-xs md:text-sm">{member}</span>
            </div>
          </div>
        )
      })}
      <div
        className=" text-sm md:text-base flex gap-1 pt-2 items-center cursor-pointer whitespace-nowrap mx-auto px-3   "
        onClick={() => navigate(`${currentProjectPath}/update`)}
      >
        <Icon icon="Plus" size={12} /> 멤버 추가
      </div>
    </div>
  )
}
