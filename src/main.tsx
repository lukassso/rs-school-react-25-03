import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

import AppErrors from './layout/AppErrors.tsx';
import MainLayout from './layout/MainLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import PokemonDetails from './pages/PokemonDetails.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <PokemonDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppErrors>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </AppErrors>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element. The app cannot be mounted.');
}
