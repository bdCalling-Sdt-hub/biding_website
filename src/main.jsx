import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import Providers from './lib/Providers/Providers.jsx'
import { Toaster } from 'sonner'
import SocketProviders from './Providers/SocketProviders.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SocketProviders>
          <RouterProvider router={router} />
        </SocketProviders>
        <Toaster position="top-right" richColors toastOptions={{ duration: 1500 }} />
      </GoogleOAuthProvider>
    </Providers>
  </StrictMode>,
)
