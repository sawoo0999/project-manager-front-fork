import { AssigneeField } from './meta/AssigneeField'
import { DateField } from './meta/DateField'
import MetaInfoField from './meta/MetaInfo'
import { CategorySelect } from './meta/CategorySelect'
import { UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form'
import { FormValues } from './CardContentContainer'
import { format } from 'date-fns'
import { SectionField } from './meta/SectionField'
import { Category } from '@/shared/types/category'
import { CardData } from '@/shared/types/card'

interface CardMetaProps {
  watch: UseFormWatch<FormValues>
  setValue: UseFormSetValue<FormValues>
  errors: FieldErrors<FormValues>
  isEdit: boolean
  card: CardData
  projectId: number
  sectionId: number
  handleCategoryChange: (
    categoryId: number,
    categoryName: string,
    categoryColor: string,
  ) => void
  categories: Category[]
}

export default function CardMetaInfo({
  watch,
  setValue,
  errors,
  isEdit,
  card,
  projectId,
  sectionId,
  handleCategoryChange,
  categories,
}: CardMetaProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-[280px] md:w-[390px]">
      <AssigneeField name={card.nickName} photoUrl={card?.photoUrl} />
      {isEdit ? (
        <DateField
          isEdit={true}
          startDate={watch('startDate')}
          endDate={watch('endDate')}
          displayEndDate={
            watch('endDate') ? format(watch('endDate'), 'M월 d일') : ''
          }
          onRangeSelect={(range) => {
            setValue('startDate', range?.from ?? new Date(), {
              shouldValidate: true,
            })
            setValue('endDate', range?.to ?? new Date(), {
              shouldValidate: true,
            })
          }}
        />
      ) : (
        <DateField isEdit={false} displayEndDate={card.endDate} />
      )}
      <SectionField projectId={projectId} sectionId={sectionId} />
      <MetaInfoField label="카테고리" showDropdown={isEdit}>
        <CategorySelect
          value={watch('categoryName') || card.categoryName}
          color={watch('categoryColor') || card.categoryColor}
          onChange={handleCategoryChange}
          isEdit={isEdit}
          projectId={projectId}
          categories={categories}
        />
        {errors.categoryId && (
          <p className="text-error text-xs mt-1">{errors.categoryId.message}</p>
        )}
      </MetaInfoField>
    </div>
  )
}
