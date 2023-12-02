import { buildRoute } from 'app/lazy-routing/build-route'

export const unAuthRoutes = [
  buildRoute({
    path: '/log-in',
    factory: () => import('pages/log-in'),
  }),
  buildRoute({
    path: 'items',
    factory: () => import('pages/items'),
  }),
  buildRoute({
    path: 'item/:id',
    factory: () => import('pages/items/item'),
  }),
  buildRoute({
    path: '/symbols',
    factory: () => import('pages/symbols'),
  }),
  buildRoute({
    path: 'symbol/:id',
    factory: () => import('pages/symbols/symbol'),
  }),
]
