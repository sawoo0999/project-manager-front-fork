import { useMutationUpdateProfile } from '@/shared/queries/useMutationProfile'
import { Button } from '@/shared/ui/common/button'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import ProfileForm from './ProfileForm'
import ProfileImageUploader from './ProfileImageUploader'
import { useGetUser } from '@/store/useUserStore'
import { toast } from 'react-toastify'
import { useCallback, useMemo } from 'react'

const DEFAULT_IMAGE_URL =
  'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg'

const formSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임은 1글자 이상 입력해야 합니다.')
    .regex(/^(?![ㄱ-ㅎㅏ-ㅣ]+$).*/, '자음 또는 모음만 입력할 수 없습니다.'),
  image: z.union([z.string(), z.instanceof(File).nullable()]),
})
export type FormValues = z.infer<typeof formSchema>

export default function ProfileContainer() {
  const navigate = useNavigate()
  const updateProfileMutation = useMutationUpdateProfile()
  const getUser = useGetUser()
  const loggedInUser = getUser()
  const { openModal } = useModalStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: loggedInUser?.nickName,
      image: loggedInUser?.imageUrl,
    },
  })

  const imageWatch = watch('image')

  const imagePreviewUrl = useMemo(
    () =>
      imageWatch instanceof File
        ? URL.createObjectURL(imageWatch)
        : (imageWatch as string) || DEFAULT_IMAGE_URL,
    [imageWatch],
  )

  const onSubmit = useCallback(
    async (values: FormValues) => {
      const formData = new FormData()
      formData.append('nickname', values.nickname)
      if (values.image instanceof File) {
        formData.append('image', values.image)
      } else if (values.image === DEFAULT_IMAGE_URL) {
        const res = await fetch(DEFAULT_IMAGE_URL)
        const blob = await res.blob()
        const defaultFile = new File([blob], 'default.jpg', {
          type: blob.type || 'image/jpeg',
        })
        formData.append('image', defaultFile)
      }

      try {
        await updateProfileMutation.mutateAsync(formData)
        toast.success('프로필이 수정되었습니다')
        navigate('/home')
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
          setError('nickname', {
            type: 'server',
            message:
              error.response.data?.message ||
              '닉네임 변경 중 오류가 발생했습니다.',
          })
        } else {
          toast.error('오류가 발생했습니다')
        }
      }
    },
    [updateProfileMutation, navigate, setError],
  )

  return (
    <div className="flex items-center justify-center w-[300px] sm:w-full p-10 bg-white rounded-md">
      <div className="flex flex-col items-center max-w-lg">
        <h1 className="text-xl font-medium mb-8">프로필</h1>
        <ProfileImageUploader
          imageUrl={imagePreviewUrl}
          onChange={(file) => setValue('image', file, { shouldDirty: true })}
          onRemove={() =>
            setValue('image', DEFAULT_IMAGE_URL, { shouldDirty: true })
          }
        />
        <ProfileForm
          email={loggedInUser?.email}
          nickname={loggedInUser?.nickName}
          register={register}
          errors={errors}
          isDirty={isDirty}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={updateProfileMutation.isPending}
        />
        <Button
          variant="categoryDelete"
          className="w-full !px-6 !py-2 mt-4"
          onClick={() => openModal('account-withdrawal')}
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  )
}
