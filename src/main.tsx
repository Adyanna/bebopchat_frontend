import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Router } from '@core/router/router';
// import { Spinner } from '@core/components/spinner/spinner'
import './index.css'
// import App from './core/components/app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Suspense fallback={<div>TODO: agregar Spinner</div>}>
      { /* <React.Suspense fallback={<Spinner/>}> */}
      <RouterProvider router={Router} />
    </React.Suspense>
  </StrictMode>,
)
