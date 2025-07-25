import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const renderHomePage = (initialEntries = ['/']) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('HomePage component with MSW', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders and fetches initial pokemon list on mount', async () => {
    renderHomePage();
    expect(screen.getAllByTestId('card-skeleton').length).toBeGreaterThan(0);
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
  });

  it('allows user to search for a pokemon', async () => {
    renderHomePage();
    await screen.findByText('bulbasaur');

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('displays pagination and handles page changes', async () => {
    renderHomePage(['/?page=1']);

    await screen.findByText('bulbasaur');

    const paginationInfo = await screen.findByText(/Page 1 of/);
    expect(paginationInfo).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /next/i });

    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('charmander')).toBeInTheDocument();
    });

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.getByText(/Page 2 of/)).toBeInTheDocument();
  });
});
