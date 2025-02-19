import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/shared/ui/common/input'
import { Button } from '@/shared/ui/common/button'
import { FormValues } from './ProfileContainer'

interface ProfileFormProps {
  email?: string
  nickname?: string
  register: UseFormRegister<FormValues>
  errors: FieldErrors<{ nickname: string }>
  isDirty: boolean
  onSubmit: () => void
  isSubmitting: boolean
}

const ProfileForm = ({
  email,
  nickname,
  register,
  errors,
  isDirty,
  onSubmit,
  isSubmitting,
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-6">
      <div>
        <label className="text-sm">닉네임</label>
        <Input
          placeholder="닉네임을 입력하세요"
          {...register('nickname')}
          defaultValue={nickname}
        />
        {errors.nickname && (
          <p className="text-red-500 text-xs mt-1">{errors.nickname.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm">이메일</label>
        <Input value={email} disabled className="bg-gray-50" />
      </div>
      <Button
        type="submit"
        variant={!isDirty ? 'disabled' : 'default'}
        className="w-full"
        disabled={!isDirty || isSubmitting}
      >
        {isSubmitting ? '처리중...' : '수정하기'}
      </Button>
    </form>
  )
}

export default ProfileForm
