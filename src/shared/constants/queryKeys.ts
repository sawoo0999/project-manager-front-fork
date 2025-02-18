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
  cards: {
    all: ['cards'] as const,
    lists: () => [...QUERY_KEYS.cards.all, 'list'] as const,
    detail: (projectId: number, sectionId?: number) =>
      [...QUERY_KEYS.cards.all, projectId, sectionId] as const,
  },
} as const
