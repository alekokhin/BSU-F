import { buildRoute } from 'app/lazy-routing/build-route'

export const unAuthRoutes = [
  buildRoute({
    path: '/log-in',
    factory: () => import('pages/log-in'),
  }),
  buildRoute({
    path: 'home',
    factory: () => import('pages/home'),
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
  buildRoute({
    path: '/words',
    factory: () => import('pages/words'),
  }),
  buildRoute({
    path: 'word/:id',
    factory: () => import('pages/words/word'),
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
    path: '/analyzed-texts',
    factory: () => import('pages/analyzed-texts'),
  }),
  buildRoute({
    path: 'analyzed-text/:id',
    factory: () => import('pages/analyzed-texts/analyzed-text'),
  }),
]
