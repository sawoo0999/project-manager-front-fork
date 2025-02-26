import { useNavigate, useParams } from 'react-router-dom'
import { useQueryCardDetail } from '@/shared/queries/useQueryCardDetail'
import { useMutationUpdateCard } from '@/shared/queries/useMutationEditCard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useEffect } from 'react'
import { ActionButtons } from './ActionButtons'
import CardMetaInfo from './CardMetaInfo'
import CardHeader from './CardHeader'
import CardDescription from './CardDescription'
import { useQueryCategoryList } from '@/shared/queries/useQueryCategoryList'
import { Category } from '@/shared/types/category'
import { toast } from 'react-toastify'
import CardEditButtons from './CardEditButtons'
import CommentSection from './meta/CommentSection'

interface CardContentContainerProps {
  mode: 'view' | 'edit'
  projectId: number
}
const formSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    content: z.string().min(1, '설명을 입력해주세요'),
    startDate: z.date({ required_error: '시작 날짜를 선택하세요' }),
    endDate: z.date({ required_error: '종료 날짜를 선택하세요' }),
    categoryId: z.number(),
    categoryName: z.string().optional(),
    categoryColor: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
    path: ['endDate'],
  })

export type FormValues = z.infer<typeof formSchema>

export default function CardContentContainer({
  projectId,
  mode,
}: CardContentContainerProps) {
  const navigate = useNavigate()
  const { sectionId, cardId } = useParams<{
    sectionId: string
    cardId: string
  }>()
  const parsedSectionId = Number(sectionId)
  const parsedCardId = Number(cardId)
  const isEdit = mode === 'edit'

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })
  const { data: categoriesData } = useQueryCategoryList({ projectId })
  const {
    data: cardDetail,
    isPending,
    isError,
  } = useQueryCardDetail({
    cardId: parsedCardId,
    projectId,
    sectionId: parsedSectionId,
  })
  const updateCardMutation = useMutationUpdateCard()
  const card = cardDetail?.data
  const categories: Category[] = categoriesData?.data ?? []
  const isComplete = card?.completeDate !== null
  useEffect(() => {
    if (card) {
      reset({
        title: card.title,
        content: card.content,
        startDate: card.startDate
          ? new Date(card.startDate.split('T')[0])
          : undefined,
        endDate: card.endDate
          ? new Date(card.endDate.split('T')[0])
          : undefined,
        categoryId: undefined,
        categoryName: card.categoryName,
        categoryColor: card.categoryColor,
      })
    }
  }, [card, reset])

  const handleCategoryChange = useCallback(
    (categoryId: number, categoryName: string, categoryColor: string) => {
      setValue('categoryId', categoryId, { shouldValidate: true })
      setValue('categoryName', categoryName, { shouldValidate: true })
      setValue('categoryColor', categoryColor, { shouldValidate: true })
    },
    [setValue],
  )

  const resetForm = () => {
    if (card) {
      const selectedCategory = categories?.find(
        (cat) => cat.name === card.categoryName,
      )

      reset({
        title: card.title,
        content: card.content,
        startDate: card.startDate
          ? new Date(card.startDate.split('T')[0])
          : undefined,
        endDate: card.endDate
          ? new Date(card.endDate.split('T')[0])
          : undefined,
        categoryId: selectedCategory ? selectedCategory.id : undefined,
        categoryName: card.categoryName,
        categoryColor: card.categoryColor,
      })
    }
  }

  const onSubmit = async (values: FormValues) => {
    if (!cardId || !projectId || !sectionId) return
    try {
      await updateCardMutation.mutateAsync({
        cardId: parsedCardId,
        data: {
          title: values.title,
          content: values.content,
          startDate: values.startDate,
          endDate: values.endDate,
          categoryId: values.categoryId,
        },
      })
      toast.success('카드가 수정되었습니다')
      navigate(`/project/${projectId}/section/${sectionId}/${cardId}`)
    } catch (error) {
      console.error('Error updating card:', error)
      toast.error('오류가 발생하였습니다')
    }
  }

  if (isPending) return <div>로딩중...</div>
  if (isError || !card) return <div>카드를 불러올 수 없습니다.</div>

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-card p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6"
      >
        <ActionButtons
          isComplete={isComplete}
          cardId={parsedCardId}
          isEdit={isEdit}
        />
        <CardHeader
          register={register}
          errors={errors}
          isEdit={isEdit}
          title={card.title}
        />
        <CardMetaInfo
          watch={watch}
          setValue={setValue}
          errors={errors}
          isEdit={isEdit}
          card={card}
          sectionId={parsedSectionId}
          projectId={projectId}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
        />
        <CardDescription
          register={register}
          errors={errors}
          isEdit={isEdit}
          content={card.content}
        />
        {isEdit && (
          <CardEditButtons
            projectId={projectId}
            sectionId={parsedSectionId}
            cardId={parsedCardId}
            isValid={isValid}
            isPending={updateCardMutation.isPending}
            resetForm={resetForm}
          />
        )}
      </form>
      {!isEdit && (
        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
          <CommentSection cardId={parsedCardId} isComplete={isComplete} />
        </div>
      )}
    </>
  )
}
