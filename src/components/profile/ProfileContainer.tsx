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
import { useGetUser, useUpdateUser } from '@/store/useUserStore'
import { toast } from 'react-toastify'

const DEFAULT_IMAGE_URL =
  'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg'

const formSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임은 1글자 이상 입력해야 합니다.')
    .regex(/^(?![ㄱ-ㅎㅏ-ㅣ]+$).*/, '자음 또는 모음만 입력할 수 없습니다.'),
  image_url: z.string(),
})
export type FormValues = z.infer<typeof formSchema>

export default function ProfileContainer() {
  const navigate = useNavigate()
  const updateProfileMutation = useMutationUpdateProfile()
  const getUser = useGetUser()
  const updateUser = useUpdateUser()
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
      image_url: loggedInUser?.imageUrl,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateProfileMutation.mutateAsync(values)
      updateUser({
        nickName: values.nickname,
        imageUrl: values.image_url,
      })
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
      }
      toast.error('오류가 발생했습니다')
    }
  }

  return (
    <div className="flex items-center justify-center w-full mx-auto bg-white rounded-md">
      <div className="flex flex-col items-center justify-center max-w-lg">
        <h1 className="text-xl font-medium mb-8">프로필</h1>

        <ProfileImageUploader
          imageUrl={watch('image_url') ?? loggedInUser?.imageUrl}
          onChange={(newImage) =>
            setValue('image_url', newImage, { shouldDirty: true })
          }
          onRemove={() =>
            setValue('image_url', DEFAULT_IMAGE_URL, { shouldDirty: true })
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
