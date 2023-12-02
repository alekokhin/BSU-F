import { importWithRetry } from 'app/lazy-routing/import-with-retry'
import { ComponentType } from 'react'
import { lazyWithPreload } from 'react-lazy-with-preload'
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

type RouteWithPreload =
  | (Omit<IndexRouteObject, 'children'> & { children?: undefined })
  | (Omit<NonIndexRouteObject, 'children'> & {
      children?: Array<RouteWithPreload>
    })

export type BuildRouteInput = {
  path: string
  children?: Array<RouteWithPreload>
  factory: () => Promise<{ default: ComponentType<any> }>
  scopes?: Array<string>
}

export const buildRoute = ({
  path,
  children,
  factory,
  scopes,
}: BuildRouteInput): RouteWithPreload => {
  const Component = lazyWithPreload(() => importWithRetry(factory))

  return {
    path,
    children,
    element: <Component />,
  }
}
