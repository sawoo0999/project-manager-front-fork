import { useMutationWithdrawal } from '@/shared/queries/useMutationWithdrawal'
import { Button } from '@/shared/ui/common/button'
import { Input } from '@/shared/ui/common/input'
import { Icon } from '@/shared/ui/Icon'
import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/store/useModalStore'
import useSessionStore from '@/store/useSessionStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { ModalKey } from './ModalController'

const formSchema = z.object({
  password: z.string().min(1),
})

export default function AccountWithdrawal({ modalId }: { modalId: ModalKey }) {
  const navigate = useNavigate()
  const { closeModal } = useModalStore()
  const { logout } = useSessionStore()

  const withdrawal = useMutationWithdrawal()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      await withdrawal.mutateAsync({ password: values.password })
      logout()
      closeModal('account-withdrawal')
      navigate('/')
      toast.success('회원 탈퇴가 완료되었습니다')
    } catch (error) {
      console.error('error with withdrawal', error)
      toast.error('회원 탈퇴에 실패하였습니다')
    }
  }
  return (
    <Modal modalId={modalId} width="w-[300px] md:w-[400px]">
      <div className="font-semibold text-base">회원 탈퇴</div>
      <div className="text-sm">
        <div className="flex gap-4">
          <Icon
            icon="Warning"
            size={24}
            className="text-[#F4B400] flex-shrink-0 mt-1"
          />
          탈퇴하시면 진행 중인 모든 프로젝트와 칸반보드 데이터가 즉시
          삭제됩니다. 정말 탈퇴하시려면 비밀번호를 입력해주세요.
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="비밀번호를 입력하세요"
            {...register('password')}
            className={`${errors.password ? 'border-warning' : ''} `}
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
          <Button
            type="submit"
            variant={`${isValid ? 'categoryDelete' : 'disabled'}`}
            className="!px-6"
          >
            탈퇴
          </Button>
        </div>
      </form>
    </Modal>
  )
}
