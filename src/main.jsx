import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/custom.css"
import "./assets/css/discord.css"
import "./assets/css/main.css"
import "./assets/css/noscript.css"
import "./assets/css/questy.css"
import "./assets/css/ranking.css"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
