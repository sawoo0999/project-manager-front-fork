import logoIcon from '@/assets/images/logo-text.png'
import { postLogin } from '@/services/auth.service'
import useSessionStore from '@/store/useSessionStore'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

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
import { loginSchema } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'react-toastify'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const setSessionInfo = useSessionStore((state) => state.setSessionInfo)

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // 세션 정보 저장
      setSessionInfo({
        access_token: data.token,
        isAuthenticated: true,
      })

      navigate('/home')
    },
  })

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data)
      toast.success('프로젝트 매니저에 오신 것을 환영합니다')
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        form.setError('root', {
          message:
            '아이디(로그인 전화번호, 로그인 전용 아이디) 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.',
        })
      } else {
        form.setError('root', {
          message: '로그인에 실패했습니다. 다시 시도해주세요.',
        })
      }
      toast.error('로그인에 실패했습니다')
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
          noValidate
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
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

          {form.formState.errors.root && (
            <p className="text-warning text-sm">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex justify-end items-center gap-2 sm:text-sm text-xs">
            <button type="button" className="text-modalPlaceholder">
              비밀번호 찾기
            </button>
            <span className="text-modalBorder">|</span>
            <Link to="/signup" className="text-modalPlaceholder">
              회원가입
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full disabled:opacity-50"
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
