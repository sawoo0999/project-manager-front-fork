import { useQuerySection } from '@/shared/queries/useQuerySection'
import MetaInfoField from './MetaInfo'

interface SectionFieldProps {
  projectId: number
  sectionId: number
}

export function SectionField({ projectId, sectionId }: SectionFieldProps) {
  const { data: section } = useQuerySection({ projectId, sectionId })
  return (
    <MetaInfoField label="섹션">
      <span className="text-xs sm:text-sm text-cardDate whitespace-nowrap overflow-hidden">
        {section?.name}
      </span>
    </MetaInfoField>
  )
}
