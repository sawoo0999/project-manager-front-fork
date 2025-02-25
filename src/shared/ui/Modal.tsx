import { ModalKey } from '@/components/modal/ModalController'
import { useModalStore } from '@/store/useModalStore'
import { ReactNode } from 'react'

interface ModalProps {
  modalId: ModalKey
  width: string
  children: ReactNode
}

export default function Modal({ modalId, width, children }: ModalProps) {
  const { closeModal } = useModalStore()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal(modalId)}
      />
      <div
        className={`relative bg-white h-auto rounded-modal p-6 flex flex-col gap-4 ${width}`}
      >
        {children}
      </div>
    </div>
  )
}
