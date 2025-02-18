import { useIsAuthenticated } from '@/store/useSessionStore'
import { Navigate } from 'react-router-dom'
import { ProtectedRouteProps } from './ProtectedRoute'

const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}

export default PublicRoute
