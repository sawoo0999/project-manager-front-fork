import { useQuerySection } from '@/shared/queries/useQuerySection'
import { ProjectSectionParams } from '@/shared/types/common'
import MetaInfoField from './MetaInfo'

export function SectionField({ projectId, sectionId }: ProjectSectionParams) {
  const { data: section } = useQuerySection({ projectId, sectionId })
  return (
    <MetaInfoField label="섹션">
      <span className="text-xs sm:text-sm text-cardDate whitespace-nowrap overflow-hidden">
        {section?.name}
      </span>
    </MetaInfoField>
  )
}
