import { Card as SectionCardProps } from '@/services/card.service'
import { APIResponse } from '@/shared/types/response'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function CompletedCardList({
  projectId,
  sectionCardList,
}: {
  projectId: number
  sectionCardList: APIResponse<SectionCardProps[]>
}) {
  return (
    <div className="flex flex-col gap-2 lg:min-w-[704px] ">
      <div className="font-semibold text-sm md:text-base pt-2">완료</div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="text-xs font-normal flex bg-white rounded-sm py-1 items-center text-center">
            <div className="hidden lg:block lg:w-[104px]">카테고리</div>
            <div className="w-[180px] md:w-[233px] lg:w-[230px]">제목</div>
            <div className="hidden lg:block lg:w-[170px]">기간</div>
            <div className="w-[103px] md:w-[130px] lg:w-[130px]">완료 날짜</div>
            <div className="hidden md:block md:w-[90px] lg:w-[70px]">
              담당자
            </div>
          </div>
        </div>
        {sectionCardList?.data
          ?.filter((card) => card.completeDate !== null)
          .map((card) => {
            return (
              <Link
                to={`/project/${projectId}/section/${card.sectionId}/${card.cardId}`}
                key={card.title}
                className="text-xs flex bg-white rounded-sm py-1.5 items-center text-center"
              >
                <div className="hidden lg:block lg:w-[104px]">
                  {card.categoryName}
                </div>
                <div className="w-[180px] md:w-[233px] lg:w-[230px] text-sm truncate">
                  {card.title}
                </div>
                <div className="hidden lg:block lg:w-[170px] text-cardDate font-normal">
                  {format(card.startDate, 'yy.MM.dd.')} ~&nbsp;
                  {format(card.endDate, 'yy.MM.dd.')}
                </div>
                <div className="w-[103px] md:w-[130px] lg:w-[130px] lg:text-sm font-semibold">
                  {card.completeDate && format(card.completeDate, 'yyyy-MM-dd')}
                </div>
                <div className="hidden md:block md:w-[90px] lg:w-[70px] font-normal">
                  {card.nickName}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
