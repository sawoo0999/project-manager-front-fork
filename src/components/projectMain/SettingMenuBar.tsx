import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import { useModalStore } from '@/store/useModalStore'

interface PageProps {
  page: 'project' | 'section'
}

export default function SettingMenuBar({ page }: PageProps) {
  const { openModal } = useModalStore()

  return (
    <div className="px-3 py-2 md:py-2.5 flex justify-between border-b border-bodyBorder bg-white">
      <div
        className={`flex items-center gap-2 md:gap-3 ${page === 'project' && 'hidden'}`}
      >
        <div className="md:text-xl">Section Name</div>
        <Button>
          <Icon
            icon="Update"
            className="w-3 h-3 md:w-[14px] md:h-[14px] fill-white"
            onClick={() => openModal('update-section')}
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
          className="flex gap-0.5"
          onClick={() => openModal('create-card')}
        >
          <Icon icon="Plus" className="w-3 h-3 md:w-2.5 md:h-2.5" />
          <span className="hidden md:block">카드 추가</span>
        </Button>
        <Button className="flex gap-0.5">
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
