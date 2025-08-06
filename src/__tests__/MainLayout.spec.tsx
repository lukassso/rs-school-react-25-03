import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Route, Routes } from 'react-router';
import MainLayout from '../layout/MainLayout';
import { renderWithProviders } from '../test/test-utils';
import { mockBulbasaur } from '../test/handlers';
import userEvent from '@testing-library/user-event';

describe('MainLayout component', () => {
  it('renders header, footer, and outlet content', () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<div>Outlet Content</div>} />
        </Route>
      </Routes>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
    expect(screen.getByText(/© 2024 PokéApp/i)).toBeInTheDocument();
  });

  it('correctly renders with initial state from Redux and Context', () => {
    const preloadedState = {
      selection: {
        selectedPokemons: [mockBulbasaur],
      },
    };

    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>,
      { preloadedState }
    );

    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
  });

  it('toggles the theme when the theme button is clicked', async () => {
    renderWithProviders(<MainLayout />);

    const themeButton = screen.getByRole('button', { name: /toggle theme/i });

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(themeButton).toHaveTextContent('🌙');

    await userEvent.click(themeButton);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(themeButton).toHaveTextContent('☀️');

    await userEvent.click(themeButton);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(themeButton).toHaveTextContent('🌙');
  });
});
