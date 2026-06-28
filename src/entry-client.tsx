import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/app/AppRoutes'
import '@/app/styles/global.css'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
