import {
  CATEGORY_COLOR_ENTRIES,
  CATEGORY_COLORS,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import { useMutationCreateCategory } from '@/shared/queries/useMutationCategory'
import { ProjectSectionParams } from '@/shared/types/common'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { COLORS } from '../modal/CreateProjectModal'
import CategoryList from './CategoryList'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(50),
  color: z.enum(COLORS),
})

export default function Category({
  projectId,
}: Pick<ProjectSectionParams, 'projectId'>) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      color: 'BLUE',
    },
  })

  const createCategory = useMutationCreateCategory()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createCategory.mutateAsync({
        projectId,
        name: values.name,
        description: values.description,
        color: values.color,
      })
      toast.success('카테고리가 생성되었습니다')
      setValue('name', '')
      setValue('description', '')
      setValue('color', 'BLUE')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          statusCode: number
          message: string
          data: null
        }>
        if (axiosError.response?.data) {
          const errorMessage = axiosError.response.data.message
          if (
            errorMessage === '프로젝트 내에서 카테고리명이 이미 존재합니다.'
          ) {
            toast.warning('이미 존재하는 카테고리 이름입니다.')
          } else {
            toast.error(`오류: ${errorMessage}`)
          }
        } else {
          toast.error('서버 응답을 처리하는 중 오류가 발생했습니다.')
        }
      } else {
        console.error('Error creating category:', error)
        toast.error('예상치 못한 오류가 발생했습니다.')
      }
    }
  }

  const [isOpenColor, setIsOpenColor] = useState(false)

  return (
    <div className="pt-6 lg:pt-8 w-[307px] md:w-[477px] lg:w-[996px] mx-auto flex flex-col gap-6">
      <div className="font-semibold text-xl text-center">카테고리 관리</div>
      <form
        className="flex gap-2 items-end md:gap-3 lg:gap-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-20 md:w-[140px] lg:w-[200px]">
          <label className="font-semibold text-xs md:text-sm">이름</label>
          <Input
            {...register('name')}
            placeholder="카테고리 이름을 입력하세요"
            className={`h-[30px] md:h-10 placeholder:text-[10px] placeholder:md:text-xs placeholder:lg:text-sm text-[10px] md:text-xs lg:text-sm`}
          />
        </div>
        <div className="flex flex-col gap-1 w-[140px] md:w-[200px] lg:w-[350px]">
          <label className="font-semibold text-xs md:text-sm">설명</label>
          <Input
            {...register('description')}
            placeholder="카테고리 설명을 50자 이내로 입력하세요"
            className={`h-[30px] md:h-10 placeholder:text-[10px] text-[10px] md:text-xs lg:text-sm placeholder:md:text-xs placeholder:lg:text-sm`}
          />
        </div>
        <div className="relative flex flex-col gap-3 w-[30px] md:w-[34px] lg:w-[64px]">
          <label className="font-semibold text-xs md:text-sm">색상</label>
          <div
            className="flex lg:gap-1 mb-1.5 md:mb-3 "
            onClick={() => setIsOpenColor(!isOpenColor)}
          >
            <button
              type="button"
              // onClick={() => setValue('color', color, { shouldValidate: true })}
              className="w-4 h-4 md:w-5 md:h-5 lg:w-[42px] rounded-card"
              style={{
                backgroundColor:
                  CATEGORY_COLORS[
                    getValues(
                      'color',
                    ).toLowerCase() as keyof typeof CATEGORY_COLORS
                  ],
              }}
            />
            <Icon
              icon={isOpenColor ? 'AngleDoubleUp' : 'AngleDoubleDown'}
              size={14}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`${isOpenColor ? 'block' : 'hidden'} border border-modalBorder bg-white p-0.5 rounded-card absolute top-12 md:top-14 z-50 -left-1 flex flex-col gap-0.5`}
          >
            {CATEGORY_COLOR_ENTRIES.map(([key, color]) => {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setValue(
                      'color',
                      key.toUpperCase() as UppercaseCategoryColor,
                      { shouldValidate: true },
                    )
                    setIsOpenColor(false)
                  }}
                  className={`w-[30px] h-4 md:h-5 md:w-[34px] lg:w-[60px] rounded-card`}
                  style={{ backgroundColor: color }}
                />
              )
            })}
          </div>
        </div>
        <Button
          variant={isValid ? 'default' : 'disabled'}
          className="px-2 lg:px-6"
        >
          <Icon icon="Plus" size={12} className="md:w-5 md:h-5 lg:hidden" />
          <div className="hidden lg:block">생성</div>
        </Button>
      </form>
      <CategoryList projectId={projectId} />
    </div>
  )
}
