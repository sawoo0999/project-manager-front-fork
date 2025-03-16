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
import { useModalStore } from '@/store/useModalStore'
import { useGetUser } from '@/store/useUserStore'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface MemberListProps {
  memberList: Member[]
  projectId: number
  onClose: () => void
  toggleButtonRef: React.RefObject<HTMLElement>
}

export default function MemberList({
  memberList,
  projectId,
  onClose,
  toggleButtonRef,
}: MemberListProps) {
  const getUser = useGetUser()
  const loggedInUser = getUser()
  const modalRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { data: loggedInUserAuth } = useQueryAuthorities({ projectId })
  const { refetch } = useQueryMember({ projectId })
  const updateAuthorities = useMutationUpdateAuthorities()
  const { openModal } = useModalStore()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetElement = event.target as Node
      const isModalOutside =
        modalRef.current && !modalRef.current.contains(targetElement)
      const isToggleButton =
        toggleButtonRef.current &&
        toggleButtonRef.current.contains(targetElement)

      // 드롭다운이 열려있는 동안에는 외부 클릭 무시
      if (isDropdownOpen) {
        return
      }

      // dropdown-menu 클래스를 가진 요소가 이벤트 path에 있는지 확인
      let currentElement = targetElement as HTMLElement | null
      let isDropdownElement = false

      while (currentElement) {
        if (
          currentElement.classList &&
          (currentElement.classList.contains('dropdown-content') ||
            currentElement.getAttribute('role') === 'menuitem')
        ) {
          isDropdownElement = true
          break
        }
        currentElement = currentElement.parentElement
      }

      if (isModalOutside && !isToggleButton && !isDropdownElement) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, toggleButtonRef, isDropdownOpen])

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

  // 드롭다운 상태 관리 핸들러
  const handleDropdownOpenChange = (open: boolean) => {
    setIsDropdownOpen(open)
  }

  return (
    <div
      ref={modalRef}
      className="z-50 right-0 bg-white top-14 md:top-16 absolute border border-modalBorder rounded-input w-[282px] md:w-[352px] h-[120px] md:h-[180px] md:max-h-[180px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2"
    >
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
              ) : loggedInUserAuth?.userRole === 'ADMIN' ? (
                <DropdownMenu onOpenChange={handleDropdownOpenChange}>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dropdown-content">
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
        onClick={() => openModal('update-member', { projectId })}
      >
        <Icon icon="Plus" size={12} /> 멤버 초대
      </div>
    </div>
  )
}
