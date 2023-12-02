import 'i18n'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from 'App'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from 'providers/auth'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="990769192984-ganoa3t7bu8faalh8pb4o751v1mgi8tl.apps.googleusercontent.com">
        <BrowserRouter>
          <SnackbarProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
