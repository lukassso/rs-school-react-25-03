import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  PokemonListResponse,
  PokemonSpeciesResponse,
  DisplayPokemon,
  PokemonDetailsResponse,
} from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const ITEMS_PER_PAGE = 20;

const fetchPokemonDetails = async (
  nameOrId: string | number,
  fetchFn: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
): Promise<DisplayPokemon> => {
  const pokemonResponse = await fetchFn(`${API_BASE_URL}/pokemon/${nameOrId}`);
  if (!pokemonResponse.ok) {
    throw new Error(`Failed to fetch details for Pokémon: ${nameOrId}`);
  }
  const pokemonData: PokemonDetailsResponse = await pokemonResponse.json();

  const speciesResponse = await fetchFn(pokemonData.species.url);
  if (!speciesResponse.ok) {
    throw new Error(`Failed to fetch species details for ${pokemonData.name}`);
  }
  const speciesData: PokemonSpeciesResponse = await speciesResponse.json();

  const englishDescription =
    speciesData.flavor_text_entries
      .find((entry) => entry.language.name === 'en')
      ?.flavor_text.replace(/[\n\f]/g, ' ') || 'No description available.';

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    description: englishDescription,
    imageUrl: pokemonData.sprites.front_default || '',
  };
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query<
      { pokemons: DisplayPokemon[]; total: number },
      { page: number; searchTerm?: string }
    >({
      queryFn: async ({ page, searchTerm }, { signal }) => {
        const fetchWithSignal = (input: RequestInfo | URL) =>
          fetch(input, { signal });

        if (searchTerm) {
          try {
            const pokemon = await fetchPokemonDetails(
              searchTerm.toLowerCase(),
              fetchWithSignal
            );
            return { data: { pokemons: [pokemon], total: 1 } };
          } catch (error) {
            return {
              error: { status: 'FETCH_ERROR', error: (error as Error).message },
            };
          }
        }

        const offset = (page - 1) * ITEMS_PER_PAGE;
        try {
          const response = await fetchWithSignal(
            `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch Pokémon list');
          }
          const data: PokemonListResponse = await response.json();

          const detailedPokemonPromises = data.results.map((p) =>
            fetchPokemonDetails(p.name, fetchWithSignal)
          );
          const pokemons = await Promise.all(detailedPokemonPromises);

          return { data: { pokemons, total: data.count } };
        } catch (error) {
          return {
            error: { status: 'FETCH_ERROR', error: (error as Error).message },
          };
        }
      },
    }),
    getPokemonDetails: builder.query<DisplayPokemon, string>({
      queryFn: async (name, { signal }) => {
        try {
          const fetchWithSignal = (input: RequestInfo | URL) =>
            fetch(input, { signal });
          const pokemon = await fetchPokemonDetails(name, fetchWithSignal);
          return { data: pokemon };
        } catch (error) {
          return {
            error: { status: 'FETCH_ERROR', error: (error as Error).message },
          };
        }
      },
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;
