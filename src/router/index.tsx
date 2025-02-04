import { createBrowserRouter } from 'react-router-dom'

import ProjectMainSection from '@/components/projectMain/ProjectMainSection'
import RootLayout from '@/layout'
import LoginPage from '@/components/auth/Login'
import SignupPage from '@/components/auth/Signup'
import HomePage from '@/components/home/Home'
import CardDetail from '@/components/card/CardDetail'
import NotificationPage from '@/components/inbox/NotificationPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>랜딩 페이지지</div>,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'inbox',
        element: <NotificationPage />,
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <ProjectMainSection />,
          },
          {
            path: ':cardId', // 중첩 라우팅 유지
            children: [
              {
                index: true,
                element: <CardDetail />,
              },
              {
                path: 'edit',
                element: <CardDetail mode="edit" />,
              },
              {
                path: 'complete',
                element: <CardDetail mode="complete" />,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default router
