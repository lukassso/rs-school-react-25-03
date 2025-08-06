import { screen, waitFor, userEvent, render } from '../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { useLocation } from 'react-router';
import PokemonDetails from '../pages/PokemonDetails';
import * as api from '../services/api';

vi.mock('../services/api');

const mockPikachu = {
  id: 25,
  name: 'pikachu',
  description: 'desc',
  imageUrl: 'url',
};

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
    vi.mocked(api.fetchPokemonDetails).mockResolvedValue(mockPikachu);
    render(<PokemonDetails />, {
      initialEntries: ['/?details=pikachu'],
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    expect(api.fetchPokemonDetails).toHaveBeenCalledWith('pikachu');
  });

  it('shows an error message on fetch failure', async () => {
    vi.mocked(api.fetchPokemonDetails).mockRejectedValue(
      new Error('Not Found')
    );
    render(<PokemonDetails />, {
      initialEntries: ['/?details=pikachu'],
    });

    await waitFor(() => {
      expect(screen.getByText(/error: not found/i)).toBeInTheDocument();
    });
  });

  it('clears the "details" param from URL when close button is clicked', async () => {
    vi.mocked(api.fetchPokemonDetails).mockResolvedValue(mockPikachu);
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
