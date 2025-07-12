import 'i18n'
import 'styles/fonts.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from 'App'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from 'providers/auth'
import { LocalesProvider } from 'providers/locales'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)

const queryClient = new QueryClient({})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SnackbarProvider>
          <LocalesProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LocalesProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
