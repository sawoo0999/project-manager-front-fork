export interface NotificationComment {
  notificationId: string
  projectName: string
  cardName: string
  nickName: string
  content: string
  createAt: string
  status: 'check' | 'uncheck'
}

export interface NotificationInvites {
  id: string
  name: string
  color: string
}

export interface NotificationItem {
  notificationId?: string
  projectId?: string
  projectName?: string
  cardName?: string
  nickName?: string
  content?: string
  createAt?: string
  status?: 'check' | 'uncheck'
  type: 'comment' | 'invite'
  inviterName?: string
}
