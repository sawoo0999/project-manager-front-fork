import { useForm } from 'react-hook-form'
import { useQueryUser } from '@/shared/queries/useQueryUser'
import { useMutationUpdateProfile } from '@/shared/queries/useMutationProfile'
import { useNavigate } from 'react-router-dom'
import ProfileImageUploader from './ProfileImageUploader'
import ProfileForm from './ProfileForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

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
  const { data: profileData, isPending } = useQueryUser()
  const updateProfileMutation = useMutationUpdateProfile()
  const profile = profileData?.data

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
      nickname: profile?.nickname,
      image_url: profile?.image_url,
    },
  })

  if (isPending) return <div>Loading...</div>

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateProfileMutation.mutateAsync(values)
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
    }
  }

  return (
    <div className="flex items-center justify-center w-full mx-auto bg-white rounded-md">
      <div className="flex flex-col items-center justify-center max-w-lg">
        <h1 className="text-xl font-medium mb-8">프로필</h1>

        <ProfileImageUploader
          imageUrl={watch('image_url') ?? profile?.image_url}
          onChange={(newImage) =>
            setValue('image_url', newImage, { shouldDirty: true })
          }
          onRemove={() =>
            setValue('image_url', DEFAULT_IMAGE_URL, { shouldDirty: true })
          }
        />

        <ProfileForm
          email={profile?.email}
          nickname={profile?.nickname}
          register={register}
          errors={errors}
          isDirty={isDirty}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={updateProfileMutation.isPending}
        />
      </div>
    </div>
  )
}
