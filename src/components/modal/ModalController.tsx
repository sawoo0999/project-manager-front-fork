import { useModalStore } from '@/store/useModalStore'
import { Fragment, ReactNode } from 'react'
import AccountWithdrawal from './AccountWithdrawal'
import CreateCardModal from './CreateCardModal'
import CreateProjectModal from './CreateProjectModal'
import CreateSectionModal from './CreateSectionModal'
import DeleteModal from './DeleteModal'
import UpdateMemberModal from './UpdateMember'
import UpdateSectionModal from './UpdateSectionModal'

export type ModalKey =
  | 'create-card'
  | 'create-project'
  | 'create-section'
  | 'update-section'
  | 'account-withdrawal'
  | 'delete-alert'
  | 'update-member'

const MODALS: Record<ModalKey, ReactNode> = {
  'create-card': <CreateCardModal modalId="create-card" />,
  'create-project': <CreateProjectModal modalId="create-project" />,
  'create-section': <CreateSectionModal modalId="create-section" />,
  'update-section': <UpdateSectionModal modalId="update-section" />,
  'account-withdrawal': <AccountWithdrawal modalId="account-withdrawal" />,
  'delete-alert': <DeleteModal modalId="delete-alert" />,
  'update-member': <UpdateMemberModal modalId="update-member" />,
}

export default function ModalController() {
  const { activeModals } = useModalStore()

  return Object.entries(activeModals).map(([key, value]) => {
    if (value === true) {
      return <Fragment key={key}>{MODALS[key as ModalKey]}</Fragment>
    }
  })
}
