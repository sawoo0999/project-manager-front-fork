import LoginPage from '@/components/auth/Login'
import Password from '@/components/auth/Password'
import SignupPage from '@/components/auth/Signup'
import CardDetailContainer from '@/components/card/CardDetailContainer'
import CategoryContainer from '@/components/category/CategoryContainer'
import TaskContainer from '@/components/home/TaskContainer'
import LandingContainer from '@/components/landing/LandingContainer'
import ProfileContainer from '@/components/profile/ProfileContainer'
import ProjectMainContainer from '@/components/projectMain/ProjectMainContainer'
import ProjectUpdateContainer from '@/components/projectUpdate/ProjectUpdateContainer'
import SectionContainer from '@/components/section/SectionContainer'
import { AuthLayout, MainLayout } from '@/layout/index'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import NotificationContainer from '@/components/inbox/NotificationContainer'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <LandingContainer />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'home',
        element: <TaskContainer />,
      },
      {
        path: 'inbox',
        element: <NotificationContainer />,
      },
      {
        path: 'profile',
        element: <ProfileContainer />,
      },
      {
        path: 'password',
        element: <Password />,
      },

      {
        path: 'project/:projectId',
        children: [
          {
            index: true,
            element: <ProjectMainContainer />,
          },
          {
            path: 'category',
            element: <CategoryContainer />,
          },
          {
            path: 'update',
            element: <ProjectUpdateContainer />,
          },
          {
            path: 'section/:sectionId',
            children: [
              { index: true, element: <SectionContainer /> },
              {
                path: ':cardId',
                children: [
                  {
                    index: true,
                    element: <CardDetailContainer mode="view" />,
                  },
                  {
                    path: 'edit',
                    element: <CardDetailContainer mode="edit" />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])

export default router
