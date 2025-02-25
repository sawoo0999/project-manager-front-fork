import {
  CATEGORY_COLOR_ENTRIES,
  CATEGORY_COLOR_KEYS,
  CATEGORY_COLORS,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import {
  useMutationDeleteCategory,
  useMutationUpdateCategory,
} from '@/shared/queries/useMutationCategory'
import { useQueryCategoryList } from '@/shared/queries/useQueryCategoryList'
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

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(50),
  color: z.enum(COLORS),
})

export default function CategoryList({
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

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editColor, setEditColor] = useState(false)

  const { data: categoryList } = useQueryCategoryList({ projectId })
  const updateCategory = useMutationUpdateCategory()
  const deleteCategory = useMutationDeleteCategory()

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCategory.mutateAsync({
        projectId,
        categoryId: editingId as number,
        name: values.name,
        description: values.description,
        color: values.color,
      })
      setEditingId(null)
      toast.success('카테고리가 수정되었습니다')
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

  const onDelete = async () => {
    try {
      await deleteCategory.mutateAsync({
        projectId,
        categoryId: editingId as number,
      })
      toast.success('카테고리가 삭제되었습니다')
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
            errorMessage ===
            '관련 된 카드를 제거해야 카테고리를 지울 수 있습니다.'
          ) {
            toast.warning('해당 카테고리에 카드가 존재합니다')
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

  return (
    <div>
      <div className="border-b border-bodyBorder flex py-1.5 md:py-1 px-1 lg:px-0 lg:w-[740px] mx-auto">
        <div className="font-normal text-xs md:text-sm w-8 md:w-[46px] md:pl-1 lg:w-[92px] lg:pl-[30px]">
          색상
        </div>
        <div className="font-normal text-xs md:text-sm w-[78px] md:w-[135px] lg:w-[185px]">
          이름
        </div>
        <div className="font-normal text-xs md:text-sm w-[149px] md:w-[222px] lg:w-[309px]">
          설명
        </div>
      </div>
      {categoryList?.data?.map((category) => {
        const isEditing = editingId === Number(category.id)
        return (
          <form
            key={category.id}
            className="h-10 md:h-[45px] border-b border-bodyBorder flex items-center w-fit mx-auto"
            onSubmit={handleSubmit(onUpdate)}
          >
            <div className="w-[38px] md:w-[46px] lg:w-[92px] flex items-center lg:gap-1">
              {isEditing ? (
                <div className="flex items-center relative">
                  <button
                    type="button"
                    className="w-4 h-4 md:w-5 md:h-5 rounded-card ml-1.5 lg:ml-8"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[
                          getValues(
                            'color',
                          ).toLowerCase() as keyof typeof CATEGORY_COLORS
                        ],
                    }}
                    onClick={() => {
                      setEditColor(!editColor)
                    }}
                  />
                  <Icon
                    icon={editColor ? 'AngleDoubleUp' : 'AngleDoubleDown'}
                    size={14}
                    className="cursor-pointer"
                    onClick={() => {
                      setEditColor(!editColor)
                    }}
                  />
                  <div
                    className={`${editColor ? 'block' : 'hidden'} border border-modalBorder bg-white p-0.5 rounded-card absolute top-5 md:top-6 z-50 left-1 lg:left-8 flex flex-col gap-0.5`}
                  >
                    {CATEGORY_COLOR_ENTRIES.map(([key, color]) => {
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => {
                            setValue(
                              'color',
                              key.toUpperCase() as UppercaseCategoryColor,
                              { shouldValidate: true },
                            )
                            setEditColor(false)
                          }}
                          className={`w-4 h-4 md:h-5 md:w-5 rounded-card`}
                          style={{ backgroundColor: color }}
                        />
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-card ml-1.5 lg:ml-8"
                  style={{ backgroundColor: category.color }}
                />
              )}
            </div>
            <div className="w-[78px] md:w-[135px] lg:w-[185px]">
              {isEditing ? (
                <Input
                  {...register('name')}
                  className="w-[70px] md:w-[110px] lg:w-[150px] text-xs md:text-sm"
                />
              ) : (
                <div className="text-xs md:text-sm truncate">
                  {category.name}
                </div>
              )}
            </div>
            <div className="w-[149px] md:w-[222px] lg:w-[309px]">
              {isEditing ? (
                <Input
                  {...register('description')}
                  className="w-[140px] md:w-[200px] lg:w-[250px] text-xs md:text-sm"
                />
              ) : (
                <div className="text-xs md:text-sm truncate">
                  {category.description}
                </div>
              )}
            </div>
            <div className="flex gap-0.5 md:gap-1 lg:gap-2 justify-end w-[42px] md:w-[60px] lg:w-[122px] md:ml-2 lg:ml-0 lg:mr-8">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="categoryDelete"
                    className="p-1 md:p-2 group"
                    onClick={onDelete}
                  >
                    <Icon
                      icon="Delete"
                      size={12}
                      className={`fill-warning lg:hidden group-hover:fill-white`}
                    />
                    <span className="hidden lg:block">삭제</span>
                  </Button>
                  <Button
                    type="submit"
                    variant={isValid ? 'category' : 'disabled'}
                    className="p-1 md:p-2 lg:px-4 lg:py-1"
                  >
                    <Icon
                      icon="Check"
                      size={12}
                      className={`fill-white lg:hidden`}
                    />
                    <span className="hidden lg:block">완료</span>
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="category"
                  className={`p-1 md:p-2`}
                  onClick={() => {
                    setEditingId(category.id as unknown as number)
                    setValue('name', category.name)
                    setValue('description', category.description)
                    setValue(
                      'color',
                      (CATEGORY_COLOR_KEYS.find(
                        (key) =>
                          CATEGORY_COLORS[
                            key as keyof typeof CATEGORY_COLORS
                          ] === category.color,
                      )?.toUpperCase() as UppercaseCategoryColor) ?? 'BLUE',
                    )
                  }}
                >
                  <Icon
                    icon="Update"
                    size={12}
                    className={`fill-white lg:hidden `}
                  />
                  <span className="hidden lg:block">수정</span>
                </Button>
              )}
            </div>
          </form>
        )
      })}
    </div>
  )
}
