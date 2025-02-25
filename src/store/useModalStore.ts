import { ModalKey } from '@/components/modal/ModalController'
import { create } from 'zustand'

interface ModalStore {
  activeModals: Record<ModalKey, boolean>
  modalData: Record<ModalKey, ModalData>
  openModal: (key: ModalKey, data?: ModalData) => void
  closeModal: (key: ModalKey) => void
  getModalData: (key: ModalKey) => ModalData | undefined
}

interface ModalData {
  sectionName?: string
  sectionId?: number
  projectId?: number
  // 필요한 다른 props들도 여기에 추가 가능
}

export const useModalStore = create<ModalStore>((set, get) => ({
  activeModals: {
    'create-card': false,
    'create-project': false,
    'create-section': false,
    'update-section': false,
    'account-withdrawal': false,
  },
  modalData: {
    'create-card': {},
    'create-project': {},
    'create-section': {},
    'update-section': {},
    'account-withdrawal': {},
  },
  openModal: (key, data) =>
    set((state) => ({
      activeModals: { ...state.activeModals, [key]: true },
      modalData: { ...state.modalData, [key]: data },
    })),

  closeModal: (key) =>
    set((state) => ({
      activeModals: { ...state.activeModals, [key]: false },
      modalData: { ...state.modalData, [key]: undefined },
    })),
  getModalData: (key) => get().modalData[key],
}))
