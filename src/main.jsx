import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserAuthProvider } from './context/UserAuthContext.jsx'
import { MerchantAuthProvider } from './context/MerchantAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserAuthProvider>
         <MerchantAuthProvider>
          <App />
          </MerchantAuthProvider>
        </UserAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
