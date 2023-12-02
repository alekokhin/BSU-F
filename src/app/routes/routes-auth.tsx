import { authRoutes } from 'app/routes/auth-routes'
import NotFound from 'pages/not-found'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

export const RoutesAuth = () => {
  return useRoutes([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="home" replace />,
        },
        ...authRoutes,
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ])
}
