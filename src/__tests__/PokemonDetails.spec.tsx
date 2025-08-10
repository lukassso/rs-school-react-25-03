import { screen, waitFor, userEvent, render } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import { useLocation } from 'react-router';
import PokemonDetails from '../pages/PokemonDetails';
import { server } from '../test/server';
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const LocationTracker = () => {
  const location = useLocation();
  return (
    <div data-testid="location-tracker">
      {location.pathname + location.search}
    </div>
  );
};

describe('PokemonDetails component', () => {
  it('renders nothing if "details" param is missing', () => {
    const { container } = render(<PokemonDetails />, {
      initialEntries: ['/'],
    });
    expect(container.querySelector('.sticky')).toBeNull();
  });

  it('shows a loading spinner and then displays pokemon details', async () => {
    render(<PokemonDetails />, {
      initialEntries: ['/?details=pikachu'],
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('shows an error message on fetch failure', async () => {
    server.use(
      http.get(`${API_BASE_URL}/pokemon/pikachu`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
      http.get(`${API_BASE_URL}/pokemon-species/25`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<PokemonDetails />, {
      initialEntries: ['/?details=pikachu'],
    });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('clears the "details" param from URL when close button is clicked', async () => {
    render(
      <>
        <PokemonDetails />
        <LocationTracker />
      </>,
      { initialEntries: ['/?page=1&details=pikachu'] }
    );

    await screen.findByText('pikachu');
    const closeButton = screen.getByRole('button', { name: /close details/i });

    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByTestId('location-tracker').textContent).toBe(
        '/?page=1'
      );
    });
  });
});
