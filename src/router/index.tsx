import { createBrowserRouter } from 'react-router-dom'

import LoginPage from '@/components/auth/Login'
import SignupPage from '@/components/auth/Signup'

import CategoryContainer from '@/components/category/CategoryContainer'
import HomePage from '@/components/home/Home'
import NotificationPage from '@/components/inbox/NotificationPage'
import ProjectMainContainer from '@/components/projectMain/ProjectMainContainer'
import ProjectUpdateContainer from '@/components/projectUpdate/ProjectUpdateContainer'
import SectionContainer from '@/components/section/SectionContainer'
import { AuthLayout, LandingLayout, MainLayout } from '@/layout/index'
import CardDetailContainer from '@/components/card/CardDetailContainer'

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
                path: ':cardId', // 중첩 라우팅 유지
                children: [
                  {
                    index: true,
                    element: <CardDetailContainer />,
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
