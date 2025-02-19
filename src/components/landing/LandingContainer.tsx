import { Carousel } from '@/shared/ui/Carousel'
import { ArrowRight, BarChart2, CheckCircle2, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingContainer() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white px-4 pt-16 md:px-8 lg:pt-24 pb-">
        <div className="container mx-auto xl:max-w-[1080px]">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8 md:pl-20 lg:pl-0 lg:w-[3]">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  project
                  <br />
                  manager.
                  <span className="text-green-600">2025</span>
                </h1>
                <p className="text-base md:text-xl text-muted-foreground">
                  프로젝트를 생성하고
                  <br /> 멤버들과 일정을 관리해보세요!
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  로그인하러 가기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-lg border border-green-200 bg-white px-8 py-3 text-sm font-medium transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  회원가입하러 가기
                </Link>
              </div>
            </div>
            <Carousel />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="container mx-auto xl:max-w-[1080px]">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              프로젝트의 모든 순간을 함께
            </h2>
            <p className="text-lg text-muted-foreground">
              프로젝트 매니저와 함께 시작해보세요
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
            <div className="group rounded-lg border p-6 transition-all hover:border-green-200 hover:shadow-lg">
              <CheckCircle2 className="mb-4 h-8 w-8 text-green-500" />
              <h3 className="mb-2 text-xl font-semibold">
                간편한 프로젝트 관리
              </h3>
              <p className="text-muted-foreground">
                섹션과 카테고리별로 프로젝트를 쉽게 관리하세요
              </p>
            </div>
            <div className="group rounded-lg border p-6 transition-all hover:border-green-200 hover:shadow-lg">
              <BarChart2 className="mb-4 h-8 w-8 text-green-500" />
              <h3 className="mb-2 text-xl font-semibold">실시간 진행 상황</h3>
              <p className="text-muted-foreground">
                프로젝트 진행 상황을 실시간으로 확인하세요
              </p>
            </div>
            <div className="group rounded-lg border p-6 transition-all hover:border-green-200 hover:shadow-lg">
              <Users2 className="mb-4 h-8 w-8 text-green-500" />
              <h3 className="mb-2 text-xl font-semibold">팀 협업</h3>
              <p className="text-muted-foreground">
                댓글과 알림으로 언제 어디서나 팀원들과 효율적으로 소통하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 md:px-8 lg:py-24">
        <div className="container mx-auto xl:max-w-[1080px]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-xl md:text-3xl font-bold lg:text-4xl">
              미리보는 프로젝트 매니저
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* TODO: height은 width와 비율 맞추기 */}
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Feature Screenshot 1"
              className="w-full md:w-[500px] h-40 md:h-[300px] rounded-lg shadow-lg transition-transform hover:scale-105"
            />
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Feature Screenshot 2"
              className="w-full md:w-[500px] h-40 md:h-[300px] rounded-lg shadow-lg transition-transform hover:scale-105"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
