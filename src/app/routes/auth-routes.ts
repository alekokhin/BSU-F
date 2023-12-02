import { buildRoute } from 'app/lazy-routing/build-route'

export const authRoutes = [
  buildRoute({
    path: 'home',
    factory: () => import('pages/home'),
    children: [],
  }),
  buildRoute({
    path: 'items',
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
]
