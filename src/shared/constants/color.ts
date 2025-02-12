export type CategoryColor =
  | 'blue'
  | 'red'
  | 'yellow'
  | 'green'
  | 'purple'
  | 'cyan'
  | 'orange'
  | 'khaki'
  | 'indigo'
  | 'pink'

export type UppercaseCategoryColor = Uppercase<CategoryColor>

export const CATEGORY_COLORS = {
  blue: '#4285F4',
  red: '#DB4437',
  yellow: '#F4B400',
  green: '#0D9D58',
  purple: '#AB47BC',
  cyan: '#02ACC1',
  orange: '#FF7043',
  khaki: '#9E9D24',
  indigo: '#5C6BC0',
  pink: '#F06292',
} as const
