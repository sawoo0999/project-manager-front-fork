import { Input } from '@/shared/ui/common/input'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormValues } from './CardContentContainer'

interface CardHeaderProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  isEdit: boolean
  title?: string
}

export default function CardHeader({
  register,
  errors,
  isEdit,
  title,
}: CardHeaderProps) {
  return isEdit ? (
    <div>
      <Input
        {...register('title')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
        type="text"
        className="text-lg sm:text-xl md:text-2xl font-semibold"
      />
      {errors.title && (
        <p className="text-error text-xs mt-1">{errors.title.message}</p>
      )}
    </div>
  ) : (
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</h2>
  )
}
