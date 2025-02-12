import { useProjectId } from '@/shared/hooks/useProjectId'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

const formSchema = z
  .object({
    title: z.string().min(1),
    content: z.string(),
    startDate: z.date({ required_error: '시작 날짜를 선택하세요' }),
    endDate: z.date({ required_error: '종료 날짜를 선택하세요' }),
    section: z.string().min(1, '섹션 이름을 입력하세요'),
    // section: z.number({ required_error: '섹션 이름을 입력하세요' }),
    category: z.string().min(1, '카테고리를 선택하세요'),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
    path: ['endDate'],
  })

export default function CreateCardModal({ modalId }: { modalId: ModalKey }) {
  const { closeModal, getModalData } = useModalStore()
  const modalData = getModalData('create-card')

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      startDate: undefined,
      endDate: undefined,
      section: modalData?.sectionName ?? '',
      category: '',
    },
  })

  const projectId = useProjectId()
  const { data: sectionList } = useQuerySectionList(projectId)
  const { data: categoryList } = useQueryCategoryList(projectId)

  // const createCard = useMutationCreateCard()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values)
    console.log(
      sectionList?.data?.find((section) => section.name === values.section)?.id,
    )
    // try {
    //   await createCard.mutateAsync({
    //     projectId
    //     sectionId: sectionList?.data?.find((section) => section.name === values.section)?.id
    //     categoryId: categoryList?.data?.find((category) => category.name === values.category)?.id
    //     title: string
    //     content: string | undefined
    //     startDate: Date | undefined
    //     endDate: Date | undefined
    //   })
    // }
    closeModal('create-card')
  }

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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-[105px] md:w-[154px]  h-10"
                      variant="date"
                    >
                      {watch('startDate') ? (
                        format(watch('startDate'), 'PPP', { locale: ko })
                      ) : (
                        <div className="text-modalPlaceholder">시작일</div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={watch('startDate')}
                      onSelect={(date) => setValue('startDate', date as Date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className="text-lg text-modalPlaceholder">~</span>
              <div className="flex items-center gap-3 md:gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-[105px] md:w-[154px]  h-10"
                      variant="date"
                    >
                      {watch('endDate') ? (
                        format(watch('endDate'), 'PPP', { locale: ko })
                      ) : (
                        <div className="text-modalPlaceholder">마감일</div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={watch('endDate')}
                      onSelect={(date) => setValue('endDate', date as Date)}
                      disabled={(date) => date < getValues('startDate')}
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
                  value={watch('section')}
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
            <Button variant="modalOutline" onClick={() => closeModal(modalId)}>
              취소
            </Button>
            <Button variant={`${isValid ? 'modal' : 'disabled'}`}>생성</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
