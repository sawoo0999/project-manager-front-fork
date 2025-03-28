import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSessionStore from '@/store/useSessionStore'
import { toast } from 'react-toastify'
import axiosApi from '@/helper/api_helper'

const KakaoCallbackPage = () => {
  const hasFetchedRef = useRef(false)
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const navigate = useNavigate()
  const setSessionInfo = useSessionStore((state) => state.setSessionInfo)

  useEffect(() => {
    if (!code || hasFetchedRef.current) return
    hasFetchedRef.current = true
    const kakaoLogin = async () => {
      try {
        const res = await axiosApi.get(`users/oauth/kakao`, {
          params: { code },
        })
        const token = res.data.data.token
        console.log(res.data)
        setSessionInfo({
          access_token: token,
          isAuthenticated: true,
        })

        toast.success('프로젝트 매니저에 오신 것을 환영합니다')
        navigate('/home')
      } catch (err) {
        console.log(err)
        toast.error('로그인에 실패했습니다')
        navigate('/login')
      }
    }

    kakaoLogin()
  }, [code, navigate, setSessionInfo])

  return <p className="text-center mt-20">카카오 로그인 처리 중입니다...</p>
}

export default KakaoCallbackPage
