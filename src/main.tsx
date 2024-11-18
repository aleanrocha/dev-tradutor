import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DevTradutor } from './screens/DevTradutor'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevTradutor />
  </StrictMode>,
)
