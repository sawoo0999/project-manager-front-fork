import { useQuerySection } from '@/shared/queries/useQuerySection'
import { useQuerySectionList } from '@/shared/queries/useQuerySectionList'
import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'
import { useLocation, useNavigate } from 'react-router-dom'

interface PageProps {
  page: 'project' | 'section'
  projectId: number
}

export default function SettingMenuBar({ page, projectId }: PageProps) {
  const { openModal } = useModalStore()

  const navigate = useNavigate()
  const location = useLocation()
  const currentProjectPath = location.pathname.split('/').slice(0, 3).join('/')
  const sectionId = parseInt(location.pathname.split('/').slice(-1).join(''))

  const { data: sectionList } = useQuerySectionList(projectId)
  const { data: section } = useQuerySection({ projectId, sectionId })

  return (
    <div className="px-3 py-2 md:py-2.5 flex justify-between border-b border-bodyBorder bg-white">
      <div
        className={`flex items-center gap-2 md:gap-3 ${page === 'project' && 'hidden'}`}
      >
        <div className="md:text-xl">{section?.name}</div>
        <Button>
          <Icon
            icon="Update"
            className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
            onClick={() =>
              openModal('update-section', {
                sectionName: section?.name,
                sectionId: section?.id,
                projectId,
              })
            }
          />
        </Button>
        <Button>
          <Icon
            icon="Delete"
            className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
          />
        </Button>
      </div>
      <div className="flex gap-2 md:gap-3">
        <Button
          variant={sectionList?.data?.length === 0 ? 'disabled' : 'default'}
          disabled={sectionList?.data?.length === 0}
          className="flex gap-0.5 px-2"
          onClick={() => openModal('create-card')}
        >
          <Icon icon="Plus" className="w-3 h-3 md:w-2.5 md:h-2.5" />
          <span className="hidden md:block">카드 추가</span>
        </Button>
        <Button
          className="flex gap-0.5"
          onClick={() => navigate(`${currentProjectPath}/category`)}
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
