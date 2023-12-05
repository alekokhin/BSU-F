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
    path: 'item/:id',
    factory: () => import('pages/items/item'),
  }),
  buildRoute({
    path: 'symbol/:id',
    factory: () => import('pages/symbols/symbol'),
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
    path: 'word/:id',
    factory: () => import('pages/words/word'),
  }),
  buildRoute({
    path: 'edit-word/:id',
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
    path: 'string/:id',
    factory: () => import('pages/strings/string'),
  }),
  buildRoute({
    path: 'edit-string/:id',
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
    path: 'analyzed-text/:id',
    factory: () => import('pages/analyzed-texts/analyzed-text'),
  }),
  buildRoute({
    path: 'edit-analyzed-text/:id',
    factory: () => import('pages/analyzed-texts/edit-analyzed-text'),
  }),
  buildRoute({
    path: 'new-analyzed-text',
    factory: () => import('pages/analyzed-texts/new-analyzed-text'),
  }),
]
