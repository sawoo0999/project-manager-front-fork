import { Member } from '@/shared/types/member'
import { Icon } from '@/shared/ui/Icon'
import { useGetUser } from '@/store/useUserStore'
import { useNavigate } from 'react-router-dom'

export default function MemberList({
  currentProjectPath,
  memberList,
}: {
  currentProjectPath: string
  memberList: Member[]
}) {
  const navigate = useNavigate()

  const getUser = useGetUser()
  const loggedInUser = getUser()

  return (
    <div className="z-50 right-0 bg-white top-14 md:top-16  absolute border border-modalBorder rounded-input w-[282px] md:w-[352px] h-[120px] md:h-[180px] md:max-h-[180px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
      {memberList.map((member) => {
        return (
          <div
            key={member.email}
            className="flex items-center justify-between gap-2"
          >
            <div className="w-full flex justify-between gap-2">
              <div className="flex items-center gap-1 truncate">
                <img
                  src={member.image_url}
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full"
                />
                <span className="truncate text-xs md:text-sm">
                  {member.email}
                </span>
              </div>
              {loggedInUser.email === member.email && <span>나</span>}
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
