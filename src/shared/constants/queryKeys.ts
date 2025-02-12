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
    all: ['categories'] as const,
    lists: (projectId: number) =>
      [...QUERY_KEYS.categories.all, 'list', projectId] as const,
    detail: (id: number) => [...QUERY_KEYS.categories.all, id] as const,
  },
  cards: {
    all: ['cards'] as const,
    lists: () => [...QUERY_KEYS.cards.all, 'list'] as const,
    detail: (id: number) => [...QUERY_KEYS.cards.all, id] as const,
  },
} as const
