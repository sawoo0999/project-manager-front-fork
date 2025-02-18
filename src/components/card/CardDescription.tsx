import { Textarea } from '@/shared/ui/common/textarea'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormValues } from './CardContentContainer'

interface CardDescriptionProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  isEdit: boolean
  content?: string
}

export default function CardDescription({
  register,
  errors,
  isEdit,
  content,
}: CardDescriptionProps) {
  return (
    <div className="w-full space-y-2 sm:space-y-3">
      <h3 className="text-xs sm:text-sm font-semibold text-cardDate">설명</h3>
      {isEdit ? (
        <div>
          <Textarea
            {...register('content')}
            className="w-full p-2 sm:p-3 border border-bodyBorder rounded-input text-xs sm:text-sm"
          />
          {errors.content && (
            <p className="text-error text-xs mt-1">{errors.content.message}</p>
          )}
        </div>
      ) : (
        <div className="w-full p-3 sm:p-4 bg-bodyBg rounded-card">
          <p className="text-xs sm:text-sm whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  )
}
