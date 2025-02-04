import { ReactElement } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { IconName } from '@/shared/ui/Icon'

interface EmptyStateProps {
  iconName: IconName
  message: string
}

export default function EmptyState({
  iconName,
  message,
}: EmptyStateProps): ReactElement {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="w-9 h-9 text-gray-400">
        <Icon icon={iconName} size={36} className="text-gray-400" />
      </div>
      <p className="text-base font-semibold text-gray-400 text-center">
        {message}
      </p>
    </div>
  )
}
