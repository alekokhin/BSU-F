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
  buildRoute({
    path: '/words',
    factory: () => import('pages/words'),
  }),
  buildRoute({
    path: 'edit-word',
    factory: () => import('pages/words/edit-word'),
  }),
  buildRoute({
    path: 'new-word',
    factory: () => import('pages/words/new-word'),
  }),
  buildRoute({
    path: '/strings',
    factory: () => import('pages/strings'),
  }),
  buildRoute({
    path: 'edit-string',
    factory: () => import('pages/strings/edit-string'),
  }),
  buildRoute({
    path: 'new-string',
    factory: () => import('pages/strings/new-string'),
  }),
  buildRoute({
    path: '/analyzed-texts',
    factory: () => import('pages/analyzed-texts'),
  }),
  buildRoute({
    path: 'edit-analyzed-text',
    factory: () => import('pages/analyzed-texts/edit-analyzed-text'),
  }),
  buildRoute({
    path: 'new-analyzed-text',
    factory: () => import('pages/analyzed-texts/new-analyzed-text'),
  }),
]
