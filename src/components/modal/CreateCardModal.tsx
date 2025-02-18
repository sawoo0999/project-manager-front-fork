import { useProjectId } from '@/shared/hooks/useProjectId'
import { useMutationCreateCard } from '@/shared/queries/useMutationCreateCard'
import { useQueryCategoryList } from '@/shared/queries/useQueryCategoryList'
import { useQuerySectionList } from '@/shared/queries/useQuerySectionList'
import { Button } from '@/shared/ui/common/button'
import { Calendar } from '@/shared/ui/common/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/common/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/common/select'
import { Textarea } from '@/shared/ui/common/textarea'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

const formSchema = z
  .object({
    title: z.string().min(1),
    content: z.string(),
    startDate: z.string({ required_error: '시작 날짜를 선택하세요' }),
    endDate: z.string({ required_error: '종료 날짜를 선택하세요' }),
    section: z.string().min(1, '섹션 이름을 입력하세요'),
    category: z.string().min(1, '카테고리를 선택하세요'),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
    path: ['endDate'],
  })

export default function CreateCardModal({ modalId }: { modalId: ModalKey }) {
  const { closeModal, getModalData } = useModalStore()
  const modalData = getModalData('create-card')
  const [isOpenStartDateCalendar, setIsOpenStartDateCalendar] = useState(false)
  const [isOpenEndDateCalendar, setIsOpenEndDateCalendar] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      startDate: '',
      endDate: '',
      section: modalData?.sectionName ?? '',
      category: '',
    },
  })

  const projectId = useProjectId()
  const { data: sectionList } = useQuerySectionList(projectId)
  const { data: categoryList } = useQueryCategoryList(projectId)

  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const sectionName = watch('section')

  const createCard = useMutationCreateCard()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (sectionList && categoryList) {
        await createCard.mutateAsync({
          projectId,
          sectionId: sectionList?.data?.find(
            (section) => section.name === values.section,
          )?.id as number,
          categoryId: categoryList?.data?.find(
            (category) => category.name === values.category,
          )?.id as number,
          title: values.title,
          content: values.content,
          startDate: values.startDate,
          endDate: values.endDate,
        })
      }
    } catch (error) {
      console.error(error)
    }
    closeModal('create-card')
  }

  useEffect(() => {
    trigger(['startDate', 'endDate', 'section'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, sectionName])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal(modalId)}
      />
      <div className="relative bg-white w-[350px] md:w-[500px] h-auto rounded-modal p-6 flex flex-col gap-4">
        <div className="font-semibold text-base">카드 추가</div>
        <form
          className="flex flex-col gap-4 text-xs md:text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:px-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <label>제목</label>
              <Input
                placeholder="제목을 입력하세요"
                {...register('title')}
                className={`flex-1 ${errors.title ? 'border-warning' : ''}  text-xs md:text-sm h-10`}
                autoFocus
              />
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <label className="whitespace-pre">상세{'\n'}정보</label>
              <Textarea
                {...register('content')}
                placeholder="상세 정보를 입력하세요"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 md:gap-4">
                <label>기간</label>
                <Popover
                  open={isOpenStartDateCalendar}
                  onOpenChange={setIsOpenStartDateCalendar}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className="w-[105px] md:w-[154px]  h-10"
                      variant="date"
                    >
                      {startDate ? (
                        format(startDate, 'PPP', { locale: ko })
                      ) : (
                        <div className="text-modalPlaceholder">시작일</div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={new Date(startDate)}
                      onSelect={(date) => {
                        if (date)
                          setValue('startDate', format(date, 'yyyy-MM-dd'))
                        setIsOpenStartDateCalendar(false)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className="text-lg text-modalPlaceholder">~</span>
              <div className="flex items-center gap-3 md:gap-4">
                <Popover
                  open={isOpenEndDateCalendar}
                  onOpenChange={setIsOpenEndDateCalendar}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className="w-[105px] md:w-[154px]  h-10"
                      variant="date"
                    >
                      {endDate ? (
                        format(endDate, 'PPP', { locale: ko })
                      ) : (
                        <div className="text-modalPlaceholder">마감일</div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={new Date(endDate)}
                      onSelect={(date) => {
                        if (date)
                          setValue('endDate', format(date, 'yyyy-MM-dd'))
                        setIsOpenEndDateCalendar(false)
                      }}
                      disabled={(date) => date < new Date(startDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <label className="whitespace-pre">섹션</label>
              <div className="[&_[data-placeholder]]:text-modalPlaceholder w-full">
                <Select
                  onValueChange={(value) =>
                    setValue('section', value, { shouldValidate: true })
                  }
                  value={sectionName}
                >
                  <div>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="섹션을 선택하세요"
                        className="placeholder:text-modalPlaceholder"
                      />
                    </SelectTrigger>
                  </div>
                  <SelectContent>
                    {sectionList?.data?.map((section) => (
                      <SelectItem key={section.id} value={section.name}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <label className="whitespace-pre">카테고리</label>
              <div className="[&_[data-placeholder]]:text-modalPlaceholder w-full">
                <Select
                  onValueChange={(value) =>
                    setValue('category', value, { shouldValidate: true })
                  }
                  value={watch('category')}
                >
                  <div>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="카테고리를 선택하세요"
                        className="placeholder:text-modalPlaceholder"
                      />
                    </SelectTrigger>
                  </div>
                  <SelectContent>
                    {categoryList?.data?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="modalOutline"
              onClick={() => closeModal(modalId)}
            >
              취소
            </Button>
            <Button type="submit" variant={isValid ? 'modal' : 'disabled'}>
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
