import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserAuthProvider } from './context/UserAuthContext.jsx'
import { MerchantAuthProvider } from './context/MerchantAuthContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserAuthProvider>
         <MerchantAuthProvider>
          <ProductsProvider>
          <App />
          </ProductsProvider>
          </MerchantAuthProvider>
        </UserAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
