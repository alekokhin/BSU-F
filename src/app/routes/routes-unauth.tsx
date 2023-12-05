import { unAuthRoutes } from 'app/routes/un-auth-routes'
import NotFound from 'pages/not-found'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

export const RoutesUnAuth = () => {
  return useRoutes([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="home" replace />,
        },
        ...unAuthRoutes,
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ])
}
