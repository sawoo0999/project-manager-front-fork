import {
  CATEGORY_COLOR_KEYS,
  CATEGORY_COLOR_VALUES,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import { useMutationInviteProject } from '@/shared/queries/useMutationMember'
import { TempMember } from '@/shared/types/common'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/store/useModalStore'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

export const COLORS = CATEGORY_COLOR_KEYS.map((key) => key.toUpperCase()) as [
  UppercaseCategoryColor,
  ...UppercaseCategoryColor[],
]

export default function UpdateMemberModal({ modalId }: { modalId: ModalKey }) {
  const [inviteList, setInviteList] = useState<TempMember[]>([])
  const [memberInput, setMemberInput] = useState('')

  const { closeModal, getModalData } = useModalStore()
  const modalData = getModalData('update-member')

  const inviteMember = useMutationInviteProject()

  const isValidEmail = (email: string) => {
    return z.string().email().safeParse(email).success
  }

  const onSubmit = async () => {
    try {
      const emailList = inviteList.map((member) => member.email)
      if (inviteList.length > 0 && modalData?.projectId) {
        await inviteMember.mutateAsync({
          projectId: modalData?.projectId,
          emailList,
        })
      }
      closeModal(modalId)
      setInviteList([])
      toast.success('멤버 초대 요청을 보냈습니다')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          statusCode: number
          message: string
          data: null
        }>
        if (axiosError.response?.data) {
          const errorMessage = axiosError.response.data.message
          if (errorMessage === '존재하지 않는 유저 입니다.') {
            if (inviteList.length === 1) {
              toast.warning('존재하지 않는 유저는 초대할 수 없습니다')
            } else {
              toast.warning(
                '존재하지 않는 유저가 포함되어 있어\n초대할 수 없습니다',
              )
            }
          } else if (errorMessage === '이미 초대된 유저입니다.') {
            if (inviteList.length === 1) {
              toast.warning('이미 초대된 유저입니다')
            } else {
              toast.warning('이미 초대된 유저가 포함되어 있습니다')
            }
          } else {
            toast.error(`오류: ${errorMessage}`)
          }
        } else {
          toast.error('서버 응답을 처리하는 중 오류가 발생했습니다.')
        }
      } else {
        console.error('Error updating member:', error)
        toast.error('예상치 못한 오류가 발생했습니다.')
      }
    }
  }

  const addMember = () => {
    if (inviteList.some((member) => member.email === memberInput)) {
      toast.warning('이미 초대된 멤버입니다')
      return
    } else if (memberInput && isValidEmail(memberInput)) {
      const newMember: TempMember = {
        email: memberInput,
        profileColor:
          CATEGORY_COLOR_VALUES[
            Math.floor(Math.random() * CATEGORY_COLOR_VALUES.length)
          ],
      }
      setInviteList([...inviteList, newMember])
      setMemberInput('')
    }
  }

  const removeEmail = (memberToRemove: string) => {
    setInviteList(
      inviteList.filter((member) => member.email !== memberToRemove),
    )
  }

  return (
    <Modal modalId={modalId} width="w-[350px] md:w-[500px]">
      <div className="font-semibold text-base">멤버 초대</div>
      <div className="flex flex-col gap-4 text-xs md:text-sm">
        <div className="md:px-4 flex flex-col gap-4">
          <div className="flex gap-1">
            <div className="w-full flex items-center gap-2 md:gap-4">
              <label className="whitespace-pre">멤버 초대</label>
              <Input
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="이메일을 입력하여 프로젝트에 멤버를 추가하세요"
                className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm h-10"
              />
            </div>
            <Button
              className={`${isValidEmail(memberInput) ? '' : 'bg-modalBorder'} `}
              type="button"
              onClick={addMember}
              disabled={!isValidEmail(memberInput)}
            >
              <Icon icon="Plus" size={10} color="white" />
            </Button>
          </div>

          <div className="border border-modalBorder rounded-input w-[302px] md:w-[352px] h-[120px] max-h-[120px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
            {inviteList.map((member) => {
              return (
                <div
                  key={member.email}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-1 truncate">
                    <div
                      className="w-4 h-4 rounded-full text-white font-semibold flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: member.profileColor,
                      }}
                    >
                      {member.email.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="truncate text-xs">{member.email}</span>
                  </div>
                  <Icon
                    icon="Close"
                    size={8}
                    className="fill-modalPlaceholder cursor-pointer"
                    onClick={() => removeEmail(member.email)}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="modalOutline"
            onClick={() => closeModal(modalId)}
          >
            닫기
          </Button>
          <Button
            onClick={onSubmit}
            type="button"
            variant={inviteList.length > 0 ? 'modal' : 'disabled'}
            disabled={inviteList.length === 0}
          >
            초대
          </Button>
        </div>
      </div>
    </Modal>
  )
}
