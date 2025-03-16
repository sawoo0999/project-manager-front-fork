import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/utils'

export default function Tooltip({
  className,
  children,
  content,
}: {
  className?: string
  children: ReactNode
  content: ReactNode
}) {
  const [isHover, setIsHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()

    setTooltipPosition({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    })

    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  useEffect(() => {
    if (isHover) {
      setTimeout(() => {
        setIsVisible(true)
      }, 100)
    } else {
      setIsVisible(false)
    }

    return () => {
      setIsVisible(false)
    }
  }, [isHover])

  return (
    <div
      className={cn(`relative inline-block`, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isHover &&
        createPortal(
          <div
            className={cn(
              'opacity-0 fixed transform -translate-x-1/2 -translate-y-full mb-2 border bg-white text-[#09090B] px-3 py-1.5 rounded-input shadow-md text-sm whitespace-nowrap z-50 transition-all duration-200',
              {
                'opacity-100': isVisible,
              },
            )}
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  )
}
