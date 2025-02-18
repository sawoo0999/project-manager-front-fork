import logoImage from '@/assets/images/logo-text.png'
import { Button } from '@/shared/ui/common/button'
import { useNavigate } from 'react-router-dom'

export default function LandingContainer() {
  const navigate = useNavigate()
  return (
    <section className="pt-20 md:pt-40 w-full h-[calc(100vh-56px)] md:h-[calc(100vh-70px)] bg-gradient-to-b from-screenBg to-white text-sm md:text-base px-10 md:px-0 text-center space-y-8">
      <img src={logoImage} className="w-[300px] mx-auto" />
      <div className="font-normal">
        프로젝트를 생성하고 멤버들과 일정을 관리해보세요!
      </div>
      <Button
        className="font-semibold min-w-[295px] md:w-[440px] h-[50px]"
        onClick={() => navigate('/login')}
      >
        로그인하러 가기
      </Button>
      <div className="flex justify-between mx-auto w-[295px] md:w-[440px]">
        <div className="h-[1.5px] w-[68px] md:w-[140px] bg-modalPlaceholder mt-2.5" />
        <div className="text-sm text-modalPlaceholder">
          또는 아직 계정이 없다면
        </div>
        <div className="h-[1.5px] w-[68px] md:w-[140px] bg-modalPlaceholder mt-2.5" />
      </div>
      <Button
        className="font-semibold min-w-[295px] md:w-[440px] h-[50px]"
        onClick={() => navigate('/signup')}
      >
        회원가입하러 가기
      </Button>
    </section>
  )
}
