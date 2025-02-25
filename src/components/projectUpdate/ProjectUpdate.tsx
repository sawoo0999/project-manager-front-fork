import {
  CATEGORY_COLOR_ENTRIES,
  CATEGORY_COLOR_VALUES,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import {
  useMutationDeleteMember,
  useMutationInviteProject,
} from '@/shared/queries/useMutationMember'
import {
  useMutationDeleteProject,
  useMutationUpdateProject,
} from '@/shared/queries/useMutationProject'
import { useQueryMember } from '@/shared/queries/useQueryMember'
import { TempMember } from '@/shared/types/common'
import { Member } from '@/shared/types/member'
import { Project } from '@/shared/types/project'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import { useGetUser } from '@/store/useUserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1),
  color: z.string().min(1),
})

interface DeleteMemberList {
  userId?: number
  email: string
}

export default function ProjectUpdate({ id: projectId, name, color }: Project) {
  const { data: queryMemberList } = useQueryMember({ projectId })

  const [memberList, setMemberList] = useState<TempMember[]>([])
  const [addMemberList, setAddMemberList] = useState<string[]>([])
  const [deleteMemberList, setDeleteMemberList] = useState<DeleteMemberList[]>(
    [],
  )
  console.log(deleteMemberList)
  const [memberInput, setMemberInput] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const currentProjectPath = location.pathname.split('/').slice(0, 3).join('/')

  const queryClient = useQueryClient()

  const updateProject = useMutationUpdateProject()
  const deleteProject = useMutationDeleteProject()
  const inviteMember = useMutationInviteProject()
  const deleteMember = useMutationDeleteMember()

  const getUser = useGetUser()
  const loggedInUser = getUser()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: name ?? '',
      color: color ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isDirty) {
        await updateProject.mutateAsync({
          id: projectId,
          name: values.title,
          color: values.color,
        })
      }
      if (addMemberList.length > 0) {
        await inviteMember.mutateAsync({ projectId, emailList: addMemberList })
      }
      if (deleteMemberList.length > 0) {
        for (const member of deleteMemberList) {
          if (member.userId)
            await deleteMember.mutateAsync({ projectId, userId: member.userId })
        }
      }
      navigate(`${currentProjectPath}`)
      setMemberList([])
      setDeleteMemberList([])
      toast.success('프로젝트가 수정되었습니다')
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const isValidEmail = (email: string) => {
    return z.string().email().safeParse(email).success
  }

  const addMember = () => {
    if (deleteMemberList.some((dm) => dm.email === memberInput)) {
      setDeleteMemberList(
        deleteMemberList.filter((dm) => dm.email !== memberInput),
      )
    }
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
      setAddMemberList([...addMemberList, memberInput])
      setMemberInput('')
    }
  }

  const removeEmail = (member: DeleteMemberList) => {
    setMemberList(memberList.filter((mem) => mem.email !== member.email))
    if (!deleteMemberList.some((dm) => dm.userId === member.userId)) {
      setDeleteMemberList([...deleteMemberList, member])
    }
  }

  const onDelete = async () => {
    try {
      await deleteProject.mutateAsync({ projectId })
      queryClient.removeQueries({ queryKey: ['project', projectId] })
      queryClient.removeQueries({ queryKey: ['members', projectId] })

      setTimeout(() => {
        navigate('/home')
        toast.success('프로젝트가 삭제되었습니다')
      }, 0)
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('오류가 발생하였습니다')
    }
  }

  useEffect(() => {
    if (queryMemberList) {
      const formattedMembers: TempMember[] = queryMemberList
        .filter((member: Member) => member.email !== loggedInUser.email)
        .map((member: Member) => ({
          userId: member.id,
          email: member.email,
          imageUrl: member.image_url,
          profileColor: null,
        }))

      setMemberList(formattedMembers)
    }
  }, [queryMemberList, loggedInUser])

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
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="이메일을 입력하여 프로젝트에 멤버를 추가하세요"
                className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm h-[30px] md:h-10"
              />
            </div>
            <Button
              type="button"
              className={`${isValidEmail(memberInput) ? '' : 'bg-modalBorder'} `}
              onClick={addMember}
              disabled={!isValidEmail(memberInput)}
            >
              <Icon icon="Plus" size={10} color="white" />
            </Button>
          </div>

          <div className="border border-modalBorder rounded-input w-[222px] md:w-[284px] lg:w-[384px] h-[240px] max-h-[240px] overflow-y-auto ml-auto px-4 py-3 flex flex-col gap-2">
            {memberList.map((member) => {
              return (
                <div
                  key={member.email}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-1 truncate">
                    {member.imageUrl !== undefined ? (
                      <img
                        src={member.imageUrl}
                        className="w-4 h-4 rounded-full"
                      />
                    ) : (
                      <div
                        className="w-4 h-4 rounded-full text-white font-semibold flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: member.profileColor,
                        }}
                      >
                        {member.email.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <span className="truncate text-xs">{member.email}</span>
                  </div>
                  <Icon
                    icon="Close"
                    size={8}
                    className="fill-modalPlaceholder cursor-pointer"
                    onClick={() =>
                      removeEmail({
                        userId: member.userId,
                        email: member.email,
                      })
                    }
                  />
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-2 md:gap-4 h-10">
            <label className="whitespace-pre font-semibold">테마 색상</label>
            <div className="flex gap-1">
              {CATEGORY_COLOR_ENTRIES.map(([key, color]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setValue(
                      'color',
                      key.toUpperCase() as UppercaseCategoryColor,
                      { shouldValidate: true },
                    )
                  }
                  className={`w-4 h-4 md:w-6 md:h-6 rounded-card md:rounded-input transition-all hover:opacity-80 ${
                    (getValues('color') === key.toUpperCase() ||
                      getValues('color') === color) &&
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
