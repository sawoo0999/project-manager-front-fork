import { ReactNode } from 'react'
import Tooltip from './Tooltip'

export default function ConditionalTooltip({
  className,
  children,
  condition,
  content,
}: {
  className?: string
  children: ReactNode
  condition: boolean
  content: ReactNode
}) {
  if (condition) {
    return (
      <Tooltip content={content} className={className}>
        {children}
      </Tooltip>
    )
  }
  return <>{children}</>
}
