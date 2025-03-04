import logoIcon from '@/assets/images/logo-text.png'
import { postLogin, postSignup } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/shared/lib/utils'
import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/common/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/common/form'
import { Input } from '@/shared/ui/common/input'
import useSessionStore from '@/store/useSessionStore'
import { signUpSchema } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

interface SignUpFormData {
  email: string
  password: string
  passwordConfirm: string
  nickname: string
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const setSessionInfo = useSessionStore((state) => state.setSessionInfo)

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setSessionInfo({
        access_token: data.token,
        isAuthenticated: true,
      })

      navigate('/home')
    },
  })

  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      // navigate('/login', {
      //   state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' },
      // })
    },
  })

  const form = useForm<SignUpFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signupMutation.mutateAsync({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      })
      toast.success('회원가입이 완료되었습니다')
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : '회원가입에 실패했습니다. 다시 시도해주세요.'

      form.setError('root', { message })
      toast.error(`${message}`)
    }
  }

  return (
    <div className="flex flex-col items-center sm:p-10 p-6 gap-4 sm:w-[520px] w-[300px] bg-white border sm:border-modalBorder sm:rounded-modal">
      <img
        src={logoIcon}
        alt="Project Manager 2025"
        className="sm:w-[300px] w-[200px] h-auto"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className={cn(
                      form.formState.errors.email &&
                        'border-warning focus:border-warning',
                    )}
                    placeholder="이메일을 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    className={cn(
                      form.formState.errors.nickname &&
                        'border-warning focus:border-warning',
                    )}
                    placeholder="닉네임을 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      className={cn(
                        form.formState.errors.password &&
                          'border-warning focus:border-warning',
                      )}
                      placeholder="비밀번호를 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    aria-label={
                      showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                    }
                  >
                    <Icon
                      icon={showPassword ? 'Eye' : 'EyeClosed'}
                      size={20}
                      className="opacity-20 sm:w-5 sm:h-5 w-4 h-4"
                    />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      className={cn(
                        form.formState.errors.passwordConfirm &&
                          'border-warning focus:border-warning',
                      )}
                      placeholder="비밀번호를 다시 입력하세요"
                      {...field}
                    />
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-warning border-warning text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="flex justify-end items-center mt-4">
            <span className="text-sm text-modalPlaceholder">
              이미 계정이 있습니다{' '}
              <Link to="/login" className="text-primary font-medium">
                로그인하기
              </Link>
            </span>
          </div>
          <Button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full disabled:opacity-50"
          >
            {signupMutation.isPending ? '가입 중...' : '회원가입'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
