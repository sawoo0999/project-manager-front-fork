import {
  CATEGORY_COLORS,
  UppercaseCategoryColor,
} from '@/shared/constants/color'
import { useQueryCategoryList } from '@/shared/queries/useQueryCategoryList'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { COLORS } from '../modal/CreateProjectModal'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(50),
  color: z.enum(COLORS),
})

export default function CategoryList({ projectId }: { projectId: number }) {
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

  const { data: categoryList } = useQueryCategoryList(projectId)
  console.log('categoryList', projectId)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    setEditingId(null)
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
        const isEditing = editingId === (category.id as unknown as number)
        return (
          <form
            key={category.id}
            className="h-10 md:h-[45px] border-b border-bodyBorder flex items-center w-fit mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-[38px] md:w-[46px] lg:w-[92px] flex items-center lg:gap-1">
              {isEditing ? (
                <div className="flex items-center relative">
                  <button
                    type="button"
                    className="w-4 h-4 md:w-5 md:h-5 rounded-card ml-1.5 lg:ml-8"
                    style={{ backgroundColor: getValues('color') }}
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
                    {Object.entries(CATEGORY_COLORS).map(([key, color]) => {
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
                    setValue('color', category.color as UppercaseCategoryColor)
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
