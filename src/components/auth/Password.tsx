import {
  useMutationConfirmPassword,
  useMutationUpdatePassword,
} from '@/shared/queries/useMutationPassword'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 최소 8글자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/,
        '대소문자 포함 영문 + 숫자 + 특수문자를 최소 1글자씩 포함합니다',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

export default function Password() {
  const navigate = useNavigate()

  const [currentPw, setCurrentPw] = useState<string>('')
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  const confirmPassword = useMutationConfirmPassword()
  const updatePassword = useMutationUpdatePassword()

  const onConfirmPassword = async () => {
    try {
      await confirmPassword.mutateAsync({ password: currentPw })
      setShowUpdatePasswordForm(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          statusCode: number
          message: string
          data: null
        }>
        if (axiosError.response?.data) {
          const errorMessage = axiosError.response.data.message
          if (errorMessage === '패스워드가 일치하지 않습니다.') {
            toast.error('비밀번호가 일치하지 않습니다')
          } else {
            toast.error(`오류: ${errorMessage}`)
          }
        } else {
          console.error('Error creating category:', error)
          toast.error('예상치 못한 오류가 발생했습니다.')
        }
      }
    }
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updatePassword.mutateAsync({ password: values.passwordConfirm })
      navigate('/profile')
    } catch (error) {
      console.error(error)
      toast.error('예상치 못한 오류가 발생하였습니다')
    }
  }
  const handleError = () => {
    if (errors.password?.message) {
      toast.error(errors.password.message)
    }
    if (errors.passwordConfirm?.message) {
      toast.error(errors.passwordConfirm.message)
    }
  }
  return (
    <div className="flex items-center justify-center w-full mx-auto bg-white rounded-md">
      <div className="flex flex-col items-center justify-center w-[280px] md:w-[350px]">
        <h1 className="text-xl font-medium mb-8">비밀번호 변경하기</h1>
        <div className="w-full flex flex-col gap-4">
          <div className="relative">
            <Input
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              type={showCurrentPw ? 'text' : 'password'}
              placeholder="현재 비밀번호를 입력하세요"
              disabled={showUpdatePasswordForm}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPw(!showCurrentPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              aria-label={showCurrentPw ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              <Icon
                icon={showCurrentPw ? 'Eye' : 'EyeClosed'}
                size={20}
                className="opacity-20 sm:w-5 sm:h-5 w-4 h-4"
              />
            </button>
          </div>
          <Button
            type="button"
            disabled={currentPw === '' || showUpdatePasswordForm}
            onClick={onConfirmPassword}
            className="w-full disabled:opacity-50"
          >
            비밀번호 확인
          </Button>
        </div>
        {showUpdatePasswordForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[280px] md:w-[350px] gap-2 flex flex-col mt-8"
          >
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                className={
                  errors.password && 'border-warning focus:border-warning'
                }
                placeholder="새로운 비밀번호를 입력하세요"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                <Icon
                  icon={showPassword ? 'Eye' : 'EyeClosed'}
                  size={20}
                  className="opacity-20 sm:w-5 sm:h-5 w-4 h-4"
                />
              </button>
            </div>
            <div className="relative">
              <Input
                type={showPasswordConfirm ? 'text' : 'password'}
                className={
                  errors.passwordConfirm &&
                  'border-warning focus:border-warning'
                }
                placeholder="새로운 비밀번호를 다시 입력하세요"
                {...register('passwordConfirm')}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={
                  showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'
                }
              >
                <Icon
                  icon={showPasswordConfirm ? 'Eye' : 'EyeClosed'}
                  size={20}
                  className="opacity-20 sm:w-5 sm:h-5 w-4 h-4"
                />
              </button>
            </div>

            <Button
              onClick={handleError}
              type="submit"
              // disabled={{updatePasswordMutation.isPending}
              className="w-full disabled:opacity-50 mt-2"
            >
              {/* {updatePasswordMutation.isPending ? '변경 중...' : '변경하기'} */}
              변경하기
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
