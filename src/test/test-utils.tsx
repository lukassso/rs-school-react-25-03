import React, { type JSX, type PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { setupStore, type AppStore, type RootState } from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    initialEntries = ['/'],
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
