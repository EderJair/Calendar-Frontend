import { createRoot } from 'react-dom/client'
import './styles.css'
import { CalendarApp } from './CalendarApp.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <CalendarApp />
  // </StrictMode>,
)
