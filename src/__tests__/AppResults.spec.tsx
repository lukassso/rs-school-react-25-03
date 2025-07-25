import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppResults from '../layout/AppResults';
import type { DisplayPokemon } from '../types';

describe.skip('AppResults component', () => {
  it('displays loading skeletons when isLoading is true', () => {
    render(<AppResults isLoading={true} error={null} pokemons={[]} />);
    const skeletons = screen.getAllByTestId('card-skeleton');
    expect(skeletons.length).toBe(20);
    expect(screen.queryByText('An Error Occurred')).not.toBeInTheDocument();
    expect(
      screen.queryByText('No Pokémon found. Try searching for another!')
    ).not.toBeInTheDocument();
  });

  it('displays an error message when an error is provided', () => {
    const error = new Error('Failed to fetch data');
    render(<AppResults isLoading={false} error={error} pokemons={[]} />);
    expect(screen.getByText('An Error Occurred')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  it('displays a "no results" message when pokemons array is empty and not loading', () => {
    render(<AppResults isLoading={false} error={null} pokemons={[]} />);
    expect(
      screen.getByText('No Pokémon found. Try searching for another!')
    ).toBeInTheDocument();
  });

  it('renders a list of pokemons when data is provided', () => {
    const mockPokemons: DisplayPokemon[] = [
      { id: 1, name: 'Bulbasaur', imageUrl: 'bulbasaur.png' },
      { id: 4, name: 'Charmander', imageUrl: 'charmander.png' },
    ];
    render(
      <AppResults isLoading={false} error={null} pokemons={mockPokemons} />
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByTestId('card-skeleton')).not.toBeInTheDocument();
  });
});
