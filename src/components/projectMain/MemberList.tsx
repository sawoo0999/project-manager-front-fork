import { useMutationUpdateAuthorities } from '@/shared/queries/useMutationAuthorities'
import { useQueryAuthorities } from '@/shared/queries/useQueryAuthorities'
import { useQueryMember } from '@/shared/queries/useQueryMember'
import { Member } from '@/shared/types/member'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/common/dropdown-menu'
import { Icon } from '@/shared/ui/Icon'
import { useGetUser } from '@/store/useUserStore'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface MemberListProps {
  currentProjectPath: string
  memberList: Member[]
  projectId: number
}

export default function MemberList({
  currentProjectPath,
  memberList,
  projectId,
}: MemberListProps) {
  const navigate = useNavigate()

  const getUser = useGetUser()
  const loggedInUser = getUser()

  const { data } = useQueryAuthorities({ projectId })
  const { refetch } = useQueryMember({ projectId })
  const updateAuthorities = useMutationUpdateAuthorities()

  const onCheckedChange = async (email: string, role: string) => {
    try {
      await updateAuthorities.mutateAsync({ projectId, role, email })
      if (role === 'USER') toast.success('일반 멤버로 권한이 변경되었습니다')
      if (role === 'ADMIN') toast.success('관리자로 권한이 변경되었습니다')
      refetch()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="z-50 right-0 bg-white top-14 md:top-16  absolute border border-modalBorder rounded-input w-[282px] md:w-[352px] h-[120px] md:h-[180px] md:max-h-[180px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
      {memberList.map((member) => {
        return (
          <div
            key={member.id}
            className="flex items-center justify-between gap-2"
          >
            <div className="w-full flex justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <img
                  src={member.image_url}
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full"
                />
                <span className="truncate text-xs md:text-sm">
                  {member.email}
                </span>
              </div>
              {loggedInUser.email === member.email ? (
                <span className="text-sm pr-0.5">나</span>
              ) : data?.userRole === 'ADMIN' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuLabel>권한</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={member.role === 'USER'}
                      onCheckedChange={() => {
                        if (member.role === 'ADMIN')
                          onCheckedChange(member.email, 'USER')
                      }}
                    >
                      일반
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={member.role === 'ADMIN'}
                      onCheckedChange={() => {
                        if (member.role === 'USER')
                          onCheckedChange(member.email, 'ADMIN')
                      }}
                    >
                      관리자
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <></>
              )}
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
