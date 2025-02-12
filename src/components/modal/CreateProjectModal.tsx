import profileIcon from '@/assets/images/profile.png'
import {
  CATEGORY_COLORS,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import { useMutationCreateProject } from '@/shared/queries/useMutationProject'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

export const COLORS = Object.keys(CATEGORY_COLORS).map((key) =>
  key.toUpperCase(),
) as [UppercaseCategoryColor, ...UppercaseCategoryColor[]]

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

  const { closeModal } = useModalStore()

  const createProject = useMutationCreateProject()
  // const inviteProject = useMutationInviteProject()

  const [memberList, setMemberList] = useState<string[]>([])
  const [memberInput, setMemberInput] = useState('')

  const isValidEmail = (email: string) => {
    return z.string().email().safeParse(email).success
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createProject.mutateAsync({
        name: values.name,
        color: values.color,
      })
      closeModal('create-project')
    } catch (error) {
      console.error(error)
    }
  }

  const addEmail = () => {
    if (
      memberInput &&
      isValidEmail(memberInput) &&
      !memberList.includes(memberInput)
    ) {
      setMemberList([...memberList, memberInput])
      setMemberInput('')
    }
  }

  const removeEmail = (memberToRemove: string) => {
    setMemberList(memberList.filter((member) => member !== memberToRemove))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal(modalId)}
      />
      <div className="relative bg-white w-[350px] md:w-[500px] h-auto rounded-modal p-6 flex flex-col gap-4">
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
                onClick={addEmail}
                disabled={!isValidEmail(memberInput)}
              >
                <Icon icon="Plus" size={10} color="white" />
              </Button>
            </div>

            <div className="border border-modalBorder rounded-input w-[302px] md:w-[352px] h-[120px] max-h-[120px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
              {memberList.map((member) => {
                return (
                  <div
                    key={member}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-1 truncate">
                      <img src={profileIcon} className="w-4 h-4 " />
                      <span className="truncate text-xs">{member}</span>
                    </div>
                    <Icon
                      icon="Close"
                      size={8}
                      className="fill-modalPlaceholder cursor-pointer"
                      onClick={() => removeEmail(member)}
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <label className="whitespace-pre">테마 색상</label>
              <div className="flex gap-1">
                {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
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
            <Button variant="modalOutline" onClick={() => closeModal(modalId)}>
              취소
            </Button>
            <Button type="submit" variant={isValid ? 'modal' : 'disabled'}>
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
