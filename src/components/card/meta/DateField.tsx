import { type DateRange } from 'react-day-picker'
import { Icon } from '@/shared/ui/Icon'
import { format } from 'date-fns'

import MetaInfoField from './MetaInfo'
import DateRangePicker from './CardCalendar'

interface DateFieldProps {
  isEdit: boolean
  displayEndDate: string
  startDate?: Date
  endDate?: Date
  onRangeSelect?: (range: DateRange | undefined) => void
}

export function DateField({
  isEdit,
  displayEndDate,
  startDate,
  endDate,
  onRangeSelect,
}: DateFieldProps) {
  const safeStartDate = startDate
    ? new Date(startDate.toISOString().split('T')[0])
    : new Date()
  const safeEndDate = endDate
    ? new Date(endDate.toISOString().split('T')[0])
    : new Date()

  return (
    <MetaInfoField label="마감일">
      {isEdit ? (
        <DateRangePicker
          startDate={safeStartDate}
          endDate={safeEndDate}
          onRangeSelect={onRangeSelect ?? (() => {})}
        />
      ) : (
        <div className="flex gap-4 px-1">
          <Icon icon="Calendar" size={20} />
          <span className="text-xs text-cardDate">
            {displayEndDate
              ? format(new Date(displayEndDate), 'M월 d일')
              : '날짜 없음'}
          </span>
        </div>
      )}
    </MetaInfoField>
  )
}
