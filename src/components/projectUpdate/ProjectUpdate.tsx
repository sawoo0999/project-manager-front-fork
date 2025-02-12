import profileIcon from '@/assets/images/profile.png'
import { CATEGORY_COLORS } from '@/shared/constants/color'
import {
  useMutationDeleteProject,
  useMutationUpdateProject,
} from '@/shared/queries/useMutationProject'
import { useQueryProject } from '@/shared/queries/useQueryProject'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1),
  color: z.string().min(1),
})

export default function ProjectUpdate({ projectId }: { projectId: number }) {
  const [memberList, setMemberList] = useState<string[]>([])
  const [memberInput, setMemberInput] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const currentProjectPath = location.pathname.split('/').slice(0, 3).join('/')

  const { data } = useQueryProject(projectId)
  const updateProject = useMutationUpdateProject()
  const deleteProject = useMutationDeleteProject()
  const project = data?.data

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
      title: project?.name ?? '',
      color: project?.color ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      await updateProject.mutateAsync({
        id: projectId,
        name: getValues('title'),
        // color: getValues('color'),
      })
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const isValidEmail = (email: string) => {
    return z.string().email().safeParse(email).success
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

  const onDelete = async () => {
    try {
      await deleteProject.mutateAsync({ projectId })
      navigate(`${currentProjectPath}`)
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="relative bg-white w-[307px] md:w-[400px] lg:w-[500px] h-auto rounded-modal pt-6 px-4 md:px-6 flex flex-col gap-4 mx-auto">
      <div className="font-semibold text-sm md:text-base text-center">
        프로젝트 수정
      </div>
      <form
        className="flex flex-col gap-4 text-xs md:text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <label className="font-semibold">프로젝트 이름</label>
            <Input
              {...register('title')}
              placeholder="프로젝트의 이름을 입력하세요"
              className={`flex-1 ${errors.title ? 'border-warning' : ''} text-xs md:text-sm h-[30px] md:h-10`}
            />
          </div>

          <div className="flex gap-1">
            <div className="w-full flex items-center gap-2 md:gap-4">
              <label className="whitespace-pre font-semibold">멤버 초대</label>
              <Input
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="이메일을 입력하여 프로젝트에 멤버를 추가하세요"
                className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm h-[30px] md:h-10"
              />
            </div>
            <Button
              type="button"
              className={`${isValidEmail(memberInput) ? '' : 'bg-modalBorder'} `}
              onClick={addEmail}
              disabled={!isValidEmail(memberInput)}
            >
              <Icon icon="Plus" size={10} color="white" />
            </Button>
          </div>

          <div className="border border-modalBorder rounded-input w-[222px] md:w-[284px] lg:w-[384px] h-[240px] max-h-[240px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
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

          <div className="flex items-center gap-2 md:gap-4 h-10">
            <label className="whitespace-pre font-semibold">테마 색상</label>
            <div className="flex gap-1">
              {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setValue('color', color, { shouldValidate: true })
                  }
                  className={`w-4 h-4 md:w-6 md:h-6 rounded-card md:rounded-input transition-all hover:opacity-80 ${
                    getValues('color') === color && 'border-2 border-black'
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
        <div className="flex justify-between">
          <Button
            type="button"
            variant="categoryDelete"
            className="!py-2 !px-6"
            onClick={onDelete}
          >
            삭제
          </Button>
          <div className="flex gap-3 justify-center">
            <Button
              type="button"
              variant="modalOutline"
              onClick={() => navigate(`${currentProjectPath}`)}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant={isValid ? 'modal' : 'disabled'}
              onClick={() => navigate(`${currentProjectPath}`)}
            >
              수정
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
