import { useQuerySectionList } from '@/shared/queries/useQuerySectionList'
import { ProjectSectionParams } from '@/shared/types/common'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { useNavigate } from 'react-router-dom'
import SectionNameBlock from '../section/SectionNameBlock'

interface PageProps extends Pick<ProjectSectionParams, 'projectId'> {
  page: 'project' | 'section'
}

export default function SettingMenuBar({ page, projectId }: PageProps) {
  const navigate = useNavigate()

  const { openModal } = useModalStore()
  const { data: sectionList } = useQuerySectionList(projectId)

  return (
    <div className="px-3 py-2 md:py-2.5 flex justify-between border-b border-bodyBorder bg-white">
      {page === 'section' && <SectionNameBlock projectId={projectId} />}
      <div className="flex gap-2 md:gap-3">
        {page === 'project' && (
          <Button
            variant={sectionList?.data?.length === 0 ? 'disabled' : 'default'}
            disabled={sectionList?.data?.length === 0}
            className="flex gap-0.5 px-2"
            onClick={() => openModal('create-card')}
          >
            <Icon icon="Plus" className="w-3 h-3 md:w-2.5 md:h-2.5" />
            <span className="hidden md:block">카드 추가</span>
          </Button>
        )}

        <Button
          className="flex gap-0.5"
          onClick={() => navigate(`/project/${projectId}/category`)}
        >
          <Icon
            icon="Category"
            className="w-3 h-3 md:w-3.5 md:h-3.5 fill-white"
          />
          <span className="hidden md:block">카테고리</span>
        </Button>
      </div>
    </div>
  )
}
