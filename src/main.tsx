import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AppErrors from './layout/AppErrors.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppErrors>
        <App />
      </AppErrors>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element. The app cannot be mounted.');
}
