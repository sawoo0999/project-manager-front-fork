import { useQueryAuthorities } from '@/shared/queries/useQueryAuthorities'

export function useUserRole(projectId: number) {
  const { data: loggedInUserAuth } = useQueryAuthorities({ projectId })
  const userRoleIsUser = loggedInUserAuth?.userRole === 'USER'

  return {
    userRole: loggedInUserAuth?.userRole,
    userRoleIsUser,
  }
}
