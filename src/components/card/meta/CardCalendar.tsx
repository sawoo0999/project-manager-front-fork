import { format, set } from 'date-fns'
import { Calendar } from '@/shared/ui/common/calendar'
import { Icon } from '@/shared/ui/Icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/common/popover'
import { Button } from '@/shared/ui/common/button'
import { DateRange } from 'react-day-picker'
import { ChevronDown } from 'lucide-react'

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onRangeSelect: (range: DateRange | undefined) => void
}

export default function DateRangePicker({
  startDate,
  endDate,
  onRangeSelect,
}: DateRangePickerProps) {
  const safeStartDate = startDate ?? new Date()
  const safeEndDate = endDate ?? new Date()

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="p-0">
            <div className="flex items-center gap-2">
              <Icon icon="Calendar" size={20} />
              <span className="text-xs text-cardDate">
                {safeEndDate ? format(safeEndDate, 'M월 d일') : '마감일 선택'}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" stroke="#82CD47" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="range"
            defaultMonth={safeStartDate}
            selected={{ from: safeStartDate, to: safeEndDate }}
            onSelect={(range) => {
              if (!range) return
              onRangeSelect({
                from: set(range.from ?? safeStartDate, {
                  hours: 12,
                  minutes: 0,
                  seconds: 0,
                }), // 정오 기준
                to: set(range.to ?? safeEndDate, {
                  hours: 12,
                  minutes: 0,
                  seconds: 0,
                }), // 정오 기준
              })
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
