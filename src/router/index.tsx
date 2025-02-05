import { createBrowserRouter } from 'react-router-dom'

import LoginPage from '@/components/auth/Login'
import SignupPage from '@/components/auth/Signup'
import CardDetail from '@/components/card/CardDetail'
import HomePage from '@/components/home/Home'
import NotificationPage from '@/components/inbox/NotificationPage'
import ProjectMainContainer from '@/components/projectMain/ProjectMainContainer'
import SectionContainer from '@/components/section/SectionContainer'
import { AuthLayout, MainLayout, LandingLayout } from '@/layout/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <div>랜딩 페이지</div>,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
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
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'inbox',
        element: <NotificationPage />,
      },
      {
        path: 'project',
        children: [
          {
            path: ':projectId',
            element: <ProjectMainContainer />,
          },
          {
            path: ':projectId/section/:sectionId',
            element: <SectionContainer />,
          },
          {
            path: ':projectId/card/:cardId',
            element: <CardDetail />,
          },
          {
            path: ':projectId/card/:cardId/edit',
            element: <CardDetail mode="edit" />,
          },
          {
            path: ':projectId/card/:cardId/complete',
            element: <CardDetail mode="complete" />,
          },
        ],
      },
    ],
  },
])

export default router
