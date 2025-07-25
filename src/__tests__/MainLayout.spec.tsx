import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

describe('MainLayout component', () => {
  it('renders header, footer, and outlet content', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Outlet Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();

    expect(screen.getByText('Outlet Content')).toBeInTheDocument();

    expect(screen.getByText(/© 2024 PokéApp/i)).toBeInTheDocument();
  });
});
