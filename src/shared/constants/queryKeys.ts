export const QUERY_KEYS = {
  members: {
    all: ['members'] as const,
    lists: (projectId: number) =>
      [...QUERY_KEYS.members.all, 'list', projectId] as const,
    detail: (id: number) => [...QUERY_KEYS.members.all, id] as const,
  },
  projects: {
    all: ['projects'] as const,
    lists: (projectId: number) =>
      [...QUERY_KEYS.projects.all, 'list', projectId] as const,
    detail: (id: number) => [...QUERY_KEYS.projects.all, id] as const,
  },
  sections: {
    all: ['sections'] as const,
    lists: (projectId: number) =>
      [...QUERY_KEYS.sections.all, projectId, 'list'] as const,
    detail: (projectId: number, sectionId: number) =>
      [...QUERY_KEYS.sections.all, projectId, sectionId] as const,
  },
  categories: {
    all: (projectId: number) => ['projects', projectId, 'categories'] as const,
    lists: (projectId: number) =>
      [...QUERY_KEYS.categories.all(projectId), 'list'] as const,
    detail: (projectId: number, categoryId: number) =>
      [...QUERY_KEYS.categories.all(projectId), categoryId] as const,
  },
  card: {
    all: ['card'] as const,
    detail: (cardId: number) => [...QUERY_KEYS.cards.all, cardId] as const,
  },
  cards: {
    all: ['cards'] as const,
    lists: (projectId?: number) =>
      [...QUERY_KEYS.cards.all, 'list', projectId] as const,
    detail: (projectId: number, sectionId?: number) =>
      [...QUERY_KEYS.cards.all, projectId, sectionId] as const,
  },
  comments: {
    all: ['comments'] as const,
    lists: (cardId?: number) =>
      [...QUERY_KEYS.comments.all, 'list', cardId] as const,
    detail: (commentId: number) =>
      [...QUERY_KEYS.comments.all, 'detail', commentId] as const,
  },
  password: {
    all: ['password'] as const,
    lists: (id: number) => [...QUERY_KEYS.password.all, 'list', id] as const,
    detail: (id: number) => [...QUERY_KEYS.password.all, id] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    commentList: () =>
      [...QUERY_KEYS.notifications.all, 'comments', 'list'] as const,
    inviteList: () =>
      [...QUERY_KEYS.notifications.all, 'invites', 'list'] as const,
    count: () => [...QUERY_KEYS.notifications.all, 'count'] as const,
    read: (notificationId: number) =>
      [...QUERY_KEYS.notifications.all, 'comments', notificationId] as const,
  },
  authorities: {
    all: ['authorities'] as const,
    lists: (projectId: number) =>
      [...QUERY_KEYS.authorities.all, 'list', projectId] as const,
  },
} as const
