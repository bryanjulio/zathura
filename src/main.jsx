import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // Importa BrowserRouter
import App from './App.jsx'
import './index.css'
import '../src/assets/styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Envolve o App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
