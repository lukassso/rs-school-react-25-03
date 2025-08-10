import { describe, it, expect, beforeEach } from 'vitest';
import HomePage from '../pages/HomePage';
import { render, screen, waitFor, userEvent } from '../test/test-utils';
import { server } from '../test/server';
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

describe('HomePage component with RTK Query', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders loading skeletons and then fetches the initial pokemon list', async () => {
    render(<HomePage />);
    expect(screen.getAllByTestId('card-skeleton').length).toBeGreaterThan(0);
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    expect(screen.queryAllByTestId('card-skeleton')).toHaveLength(0);
  });

  it('allows user to search for a pokemon', async () => {
    render(<HomePage />);
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

  it('displays an error message if a search fails', async () => {
    server.use(
      http.get(`${API_BASE_URL}/pokemon/nonexistent`, () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    render(<HomePage />);
    await screen.findByText('bulbasaur');

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'nonexistent');
    await userEvent.click(button);

    expect(await screen.findByText(/An Error Occurred/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Failed to fetch details for Pokémon: nonexistent/i)
    ).toBeInTheDocument();
  });

  it('displays pagination and handles page changes', async () => {
    render(<HomePage />, { initialEntries: ['/?page=1'] });
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
