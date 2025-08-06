import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Route, Routes } from 'react-router';
import MainLayout from '../layout/MainLayout';
import { renderWithProviders } from '../test/test-utils';
import { mockBulbasaur } from '../test/handlers';

describe('MainLayout with renderWithProviders', () => {
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
});
