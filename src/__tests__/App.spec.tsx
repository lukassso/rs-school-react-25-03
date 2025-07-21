import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import AppErrors from '../layout/AppErrors';

const LS_SEARCH_KEY = 'pokemonSearchTerm';

// Mock localStorage for consistent testing
const localStorageMock = (() => {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, value: string) => {
      store.set(key, value.toString());
    },
    clear: () => {
      store.clear();
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders and fetches initial pokemon list on mount', async () => {
    render(<App />);
    expect(await screen.findAllByTestId('card-skeleton')).toHaveLength(20);
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    expect(await screen.findByText('ivysaur')).toBeInTheDocument();
  });

  it('loads search term from localStorage and fetches data on mount', async () => {
    window.localStorage.setItem(LS_SEARCH_KEY, 'pikachu');
    render(<App />);

    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('allows user to search for a pokemon and updates localStorage', async () => {
    render(<App />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    expect(await screen.findAllByTestId('card-skeleton')).toHaveLength(20);
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(window.localStorage.getItem(LS_SEARCH_KEY)).toBe('pikachu');
  });

  it('shows an error message if the pokemon is not found', async () => {
    render(<App />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, 'notfound');
    await userEvent.click(button);

    expect(await screen.findByText('An Error Occurred')).toBeInTheDocument();
    expect(
      screen.getByText(/Pokémon not found: notfound/i)
    ).toBeInTheDocument();
  });

  it('triggers the error boundary when "Check an error" button is clicked', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <AppErrors>
        <App />
      </AppErrors>
    );

    const errorButton = screen.getByRole('button', { name: /check an error/i });
    await userEvent.click(errorButton);

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
