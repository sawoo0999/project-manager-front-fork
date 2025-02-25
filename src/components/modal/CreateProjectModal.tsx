import {
  CATEGORY_COLOR_ENTRIES,
  CATEGORY_COLOR_KEYS,
  CATEGORY_COLOR_VALUES,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import { useMutationInviteProject } from '@/shared/queries/useMutationMember'
import { useMutationCreateProject } from '@/shared/queries/useMutationProject'
import { TempMember } from '@/shared/types/common'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

export const COLORS = CATEGORY_COLOR_KEYS.map((key) => key.toUpperCase()) as [
  UppercaseCategoryColor,
  ...UppercaseCategoryColor[],
]

const formSchema = z.object({
  name: z.string().min(1),
  color: z.enum(COLORS),
})

export default function CreateProjectModal({ modalId }: { modalId: ModalKey }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      color: 'BLUE',
    },
  })
  const [memberList, setMemberList] = useState<TempMember[]>([])
  const [memberInput, setMemberInput] = useState('')

  const { closeModal } = useModalStore()

  const createProject = useMutationCreateProject()
  const inviteMember = useMutationInviteProject()

  const isValidEmail = (email: string) => {
    return z.string().email().safeParse(email).success
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const emailList = memberList.map((member) => member.email)
      const result = await createProject.mutateAsync({
        name: values.name,
        color: values.color,
      })
      console.log(result)
      if (memberList.length > 0 && result.data?.id) {
        await inviteMember.mutateAsync({
          projectId: result.data?.id,
          emailList,
        })
      }
      setMemberList([])
      closeModal('create-project')
      toast.success('프로젝트가 생성되었습니다')
    } catch (error) {
      console.error(error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const addMember = () => {
    if (memberList.some((member) => member.email === memberInput)) {
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
      setMemberList([...memberList, newMember])
      setMemberInput('')
    }
  }

  const removeEmail = (memberToRemove: string) => {
    setMemberList(
      memberList.filter((member) => member.email !== memberToRemove),
    )
  }

  return (
    <Modal modalId={modalId} width="w-[350px] md:w-[500px]">
      <div className="font-semibold text-base">새 프로젝트</div>
      <form
        className="flex flex-col gap-4 text-xs md:text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="md:px-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <label>프로젝트 이름</label>
            <Input
              {...register('name')}
              placeholder="프로젝트의 이름을 입력하세요"
              className={`flex-1 ${errors.name ? 'border-warning' : ''} text-xs md:text-sm h-10`}
              autoFocus
            />
          </div>

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
            {memberList.map((member) => {
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

          <div className="flex items-center gap-2 md:gap-4">
            <label className="whitespace-pre">테마 색상</label>
            <div className="flex gap-1">
              {CATEGORY_COLOR_ENTRIES.map(([key, color]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setValue(
                      'color',
                      key.toUpperCase() as UppercaseCategoryColor,
                      {
                        shouldValidate: true,
                      },
                    )
                  }
                  className={`w-5 h-5 md:w-6 md:h-6 rounded-input transition-all hover:opacity-80 ${
                    getValues('color') === key.toUpperCase() &&
                    'border-2 border-black'
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="modalOutline"
            onClick={() => closeModal(modalId)}
          >
            취소
          </Button>
          <Button type="submit" variant={isValid ? 'modal' : 'disabled'}>
            생성
          </Button>
        </div>
      </form>
    </Modal>
  )
}
