import {
  useMutationDeleteSection,
  useMutationUpdateSection,
} from '@/shared/queries/useMutationSection'
import { Button } from '@/shared/ui/common/button'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

const formSchema = z.object({
  title: z.string().min(1),
})

export default function UpdateSectionModal({ modalId }: { modalId: ModalKey }) {
  const { closeModal, getModalData } = useModalStore()
  const modalData = getModalData('update-section')

  const updateSection = useMutationUpdateSection()
  const deleteSection = useMutationDeleteSection()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: modalData?.sectionName,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (modalData?.projectId && modalData?.sectionId) {
        await updateSection.mutateAsync({
          projectId: modalData?.projectId,
          sectionId: modalData?.sectionId,
          name: values.title,
        })
      }
      closeModal('update-section')
      toast.success('섹션이 수정되었습니다')
    } catch (error) {
      console.error(error)
      toast.error('오류가 발생하였습니다')
    }
  }

  const onDelete = async () => {
    if (!modalData?.sectionId || !modalData?.projectId) return
    try {
      await deleteSection.mutateAsync({
        sectionId: modalData?.sectionId,
        projectId: modalData?.projectId,
      })
      closeModal('update-section')
      navigate(`/project/${modalData?.projectId}`)
      toast.success('섹션이 삭제되었습니다')
    } catch (error) {
      console.error(error)
      toast.error('오류가 발생하였습니다')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal(modalId)}
      />
      <div className="relative bg-white w-[300px] md:w-[400px] h-auto rounded-modal p-6  flex flex-col gap-4">
        <div className="font-semibold text-base">섹션 수정</div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="제목을 입력하세요"
              {...register('title')}
              className={`${errors.title ? 'border-warning' : ''} `}
              autoFocus
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="categoryDelete"
              className="!px-6 !py-2"
              type="button"
              onClick={onDelete}
            >
              삭제
            </Button>
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="modalOutline"
                onClick={() => closeModal(modalId)}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant={`${isValid ? 'modal' : 'disabled'}`}
              >
                수정
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
