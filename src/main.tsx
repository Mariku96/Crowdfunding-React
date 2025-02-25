
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThirdwebProvider } from 'thirdweb/react'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
)
