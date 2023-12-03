/* eslint-disable unicorn/filename-case */
import { RoutesAuth } from 'app/routes/routes-auth'
import { RoutesUnAuth } from 'app/routes/routes-unauth'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { Suspense } from 'react'

const App = () => {
  const { isAuthenticated } = useAuthContext()

  if (isAuthenticated) {
    return (
      <Suspense fallback={<Loader />}>
        <RoutesAuth />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <RoutesUnAuth />
    </Suspense>
  )
}

export default App
