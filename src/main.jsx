import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppointmentProvider } from './contexts/AppointmentContext'
import App from './App'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppointmentProvider>
          <App />
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
