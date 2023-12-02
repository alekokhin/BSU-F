import { buildRoute } from 'app/lazy-routing/build-route'

export const authRoutes = [
  buildRoute({
    path: 'home',
    factory: () => import('pages/home'),
  }),
  buildRoute({
    path: '/items',
    factory: () => import('pages/items'),
    children: [],
  }),
  buildRoute({
    path: 'edit-item/:id',
    factory: () => import('pages/items/edit-item'),
  }),
  buildRoute({
    path: 'new-item',
    factory: () => import('pages/items/new-item'),
  }),
  buildRoute({
    path: '/symbols',
    factory: () => import('pages/symbols'),
  }),
  buildRoute({
    path: 'edit-symbol',
    factory: () => import('pages/symbols/edit-symbol'),
  }),
  buildRoute({
    path: 'new-symbol',
    factory: () => import('pages/symbols/new-symbol'),
  }),
]
