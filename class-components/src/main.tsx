import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AppErrors from './layout/AppErrors.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrors>
      <App />
    </AppErrors>
  </StrictMode>
);
