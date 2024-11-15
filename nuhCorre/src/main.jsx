import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { PrimeReactProvider } from 'primereact/api';
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
    <NextUIProvider>
      <App />
      </NextUIProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
