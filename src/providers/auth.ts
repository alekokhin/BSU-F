import { useQuery } from '@tanstack/react-query'
import { reissueToken } from 'api/auth/api'
import { keys } from 'api/keys'
import constate from 'constate'
import jwtDecode from 'jwt-decode'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

import { useLogoutAcrossTabs } from './logout-across-tabs'

type NotAuthUser = {
  state: 'initial' | 'unauthenticated'
}

export type AuthUserResponse = {
  name: string
  accessToken: string
  refreshToken: string
}

type AuthUser = {
  state: 'authenticated'
} & AuthUserResponse

type User = NotAuthUser | AuthUser

export let globalAccessToken: string | null = null
export let authUserName: string | null = null

export const setGlobalAccessToken = (accessToken: string | null) => {
  globalAccessToken = accessToken
}
export const setAuthUserName = (name: string | null) => {
  authUserName = name
}

const cookies = new Cookies()

const useAuth = () => {
  const [user, setUser] = useState<User>({ state: 'initial' })

  const refreshTimeoutRef = useRef<number | null>(null)
  const navigate = useNavigate()
  useQuery(keys.reissueToken.token(), reissueToken, {
    enabled: Boolean(cookies.get('refreshToken')),
    staleTime: Number.POSITIVE_INFINITY,
    onSuccess: user => {
      authorize(user)
    },
    onError: () => {
      unauthorize()
      navigate('/log-in')
    },
  })

  const authorize = useCallback((user: AuthUserResponse) => {
    if (user) {
      const decodedJWT: { exp: number } = jwtDecode(user.accessToken)
      const expiresIn = decodedJWT.exp * 1000 - Date.now()

      const expires = new Date()
      expires.setTime(expiresIn)

      setGlobalAccessToken(user.accessToken)
      setAuthUserName(user.name)

      cookies.set('refreshToken', user.refreshToken, {
        path: '/',
        expires: new Date(2_147_483_647 * 1000),
      })

      const newUser: AuthUser = {
        state: 'authenticated',
        ...user,
      }

      setUser(newUser)
      // refreshTimeoutRef.current = window.setTimeout(() => {
      //   refreshTimeoutRef.current = null
      //   refetchRefreshToken()
      // }, expiresIn)
    } else {
      setUser({ state: 'unauthenticated' })
    }
  }, [])
  const initialize = useCallback((user: boolean) => {
    if (user) {
      const newUser: NotAuthUser = {
        state: 'initial',
      }

      setUser(newUser)
    } else {
      setUser({ state: 'unauthenticated' })
    }
  }, [])

  const unauthorize = useLogoutAcrossTabs(
    useCallback(() => {
      setGlobalAccessToken(null)
      cookies.remove('refreshToken')
      setUser({ state: 'unauthenticated' })
      // navigate('/log-in')
      if (refreshTimeoutRef.current !== null) {
        window.clearTimeout(refreshTimeoutRef.current)
      }
    }, []),
  )

  return {
    user,
    setUser,
    authorize,
    initialize,
    unauthorize,
    isInitial: user.state === 'initial',
    isAuthenticated: user.state === 'authenticated',
  } as const
}

export const [AuthProvider, useAuthContext] = constate(useAuth)
