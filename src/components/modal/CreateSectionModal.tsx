import { useMutationCreateSection } from '@/shared/queries/useMutationSection'
import { Button } from '@/shared/ui/common/button'
import { useModalStore } from '@/store/useModalStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Input } from '../../shared/ui/common/input'
import { ModalKey } from './ModalController'

const formSchema = z.object({
  title: z.string().min(1),
})

export default function CreateSectionModal({ modalId }: { modalId: ModalKey }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  })

  const { projectId } = useParams()
  const { closeModal } = useModalStore()
  const createSection = useMutationCreateSection()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createSection.mutateAsync({
        projectId: projectId,
        name: values.title,
      })
      closeModal('create-section')
      toast.success('섹션이 추가되었습니다')
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
        <div className="font-semibold text-base">섹션 추가</div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="제목을 입력하세요"
              {...register('title')}
              className={`${errors.title ? 'border-warning' : ''} `}
              autoFocus
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="modalOutline"
              onClick={() => closeModal(modalId)}
            >
              취소
            </Button>
            <Button type="submit" variant={`${isValid ? 'modal' : 'disabled'}`}>
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
