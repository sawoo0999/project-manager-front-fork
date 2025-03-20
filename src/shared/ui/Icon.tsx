/**
 * 공통 아이콘 컴포넌트
 *
 * @example
 * <Icon
 *   icon="Home"             // 필수: 아이콘 이름
 *   size={24}               // 선택: 크기 (기본값: 24)
 *   className="fill-white"  // 선택: Tailwind 클래스(fill, stroke 속성 테스트 후 적용)
 * />
 */

import AngleDoubleDown from '@/assets/icons/angle-double-small-down.svg?react'
import AngleDoubleLeft from '@/assets/icons/angle-double-small-left.svg?react'
import AngleDoubleRight from '@/assets/icons/angle-double-small-right.svg?react'
import AngleDoubleUp from '@/assets/icons/angle-double-small-up.svg?react'
import AngleLeft from '@/assets/icons/angle-small-left.svg?react'
import AngleRight from '@/assets/icons/angle-small-right.svg?react'
import CrossArrow from '@/assets/icons/cross-arrow.svg?react'
import Bell from '@/assets/icons/bell.svg?react'
import Calendar from '@/assets/icons/calendar.svg?react'
import Category from '@/assets/icons/category.svg?react'
import Check from '@/assets/icons/check.svg?react'
import Close from '@/assets/icons/cross.svg?react'
import ChevronDown from '@/assets/icons/dropdown-arrow.svg?react'
import EyeClosed from '@/assets/icons/eye-crossed.svg?react'
import Eye from '@/assets/icons/eye.svg?react'
import Folder from '@/assets/icons/folder.svg?react'
import Home from '@/assets/icons/home.svg?react'
import Kakao from '@/assets/icons/icon-kakao.svg?react'
import Menu from '@/assets/icons/menu-burger.svg?react'
import Update from '@/assets/icons/pencil.svg?react'
import Plus from '@/assets/icons/plus.svg?react'
import Setting from '@/assets/icons/settings.svg?react'
import Delete from '@/assets/icons/trash.svg?react'
import Member from '@/assets/icons/users.svg?react'
import Warning from '@/assets/icons/warning.svg?react'

import { FC, SVGProps } from 'react'

export type IconName =
  | 'AngleDoubleDown'
  | 'AngleDoubleLeft'
  | 'AngleDoubleRight'
  | 'AngleDoubleUp'
  | 'AngleLeft'
  | 'AngleRight'
  | 'CrossArrow'
  | 'Bell'
  | 'Calendar' // 추가
  | 'ChevronDown' // 추가
  | 'Category'
  | 'Check'
  | 'Close'
  | 'EyeClosed'
  | 'Eye'
  | 'Folder'
  | 'Home'
  | 'Kakao'
  | 'Menu'
  | 'Update'
  | 'Plus'
  | 'Setting'
  | 'Delete'
  | 'Member'
  | 'Warning'

const ICONS: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  AngleDoubleDown,
  AngleDoubleLeft,
  AngleDoubleRight,
  AngleDoubleUp,
  AngleLeft,
  AngleRight,
  CrossArrow,
  Bell,
  Calendar, // 추가
  ChevronDown, // 추가
  Category,
  Check,
  Close,
  EyeClosed,
  Eye,
  Folder,
  Home,
  Kakao,
  Menu,
  Update,
  Plus,
  Setting,
  Delete,
  Member,
  Warning,
}
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconName
  size?: number
  className?: string
  onClick?: (() => void) | ((e: React.MouseEvent<SVGSVGElement>) => void)
}

export const Icon = ({ icon, size = 24, className, onClick }: IconProps) => {
  const SelectedIcon = ICONS[icon]
  return (
    <SelectedIcon
      width={size}
      height={size}
      className={className}
      onClick={onClick}
    />
  )
}
