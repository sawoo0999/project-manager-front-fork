import { useQueryCategoryList } from '@/shared/queries/useQueryCategoryList'
import { Category } from '@/services/category.service'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/common/select'
import { useEffect, useMemo } from 'react'

interface CategorySelectProps {
  value: string
  color: string
  onChange: (
    categoryId: number,
    categoryName: string,
    categoryColor: string,
  ) => void
  isEdit?: boolean
  projectId: number
}

export function CategorySelect({
  value,
  color,
  onChange,
  isEdit,
  projectId,
}: CategorySelectProps) {
  const { data } = useQueryCategoryList(projectId)
  const categories = useMemo(() => data?.data ?? [], [data])

  useEffect(() => {
    if (isEdit && value) {
      const selectedCategory = categories.find((cat) => cat.name === value)
      if (selectedCategory) {
        onChange(
          selectedCategory.id,
          selectedCategory.name,
          selectedCategory.color,
        )
      }
    }
  }, [categories, value, isEdit, onChange])

  if (isEdit) {
    return (
      <div>
        <Select
          defaultValue={value}
          onValueChange={(name) => {
            const selectedCategory = categories.find((cat) => cat.name === name)
            if (selectedCategory) {
              onChange(
                selectedCategory.id,
                selectedCategory.name,
                selectedCategory.color,
              )
            }
          }}
        >
          <SelectTrigger className="flex items-center justify-start gap-3 p-0 h-auto text-xs text-cardDate border-none min-w-[100px]  ">
            <div
              className={`w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full`}
              style={{ backgroundColor: color }}
            />
            <SelectValue>{value}</SelectValue>
          </SelectTrigger>

          <SelectContent className="w-auto min-w-[100px] ">
            {categories.map((category: Category) => (
              <SelectItem key={category.id} value={category.name}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <>
      <div
        className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-cardDate">{value}</span>
    </>
  )
}
