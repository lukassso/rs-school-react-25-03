import type {
  PokemonListResponse,
  PokemonSpeciesResponse,
  DisplayPokemon,
  PokemonDetailsResponse,
} from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const ITEMS_PER_PAGE = 20;

export async function fetchPokemonDetails(
  nameOrId: string | number
): Promise<DisplayPokemon> {
  const pokemonResponse = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
  if (!pokemonResponse.ok) {
    throw new Error(`Failed to fetch details for Pokémon: ${nameOrId}`);
  }
  const pokemonData: PokemonDetailsResponse = await pokemonResponse.json();

  const speciesResponse = await fetch(pokemonData.species.url);
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
    imageUrl: pokemonData.sprites.front_default,
  };
}

export async function getPokemons(
  page: number,
  searchTerm?: string
): Promise<{ pokemons: DisplayPokemon[]; total: number | undefined }> {
  if (searchTerm) {
    try {
      const pokemon = await fetchPokemonDetails(searchTerm.toLowerCase());
      return { pokemons: [pokemon], total: 1 };
    } catch (error) {
      console.error(`Failed to fetch Pokémon "${searchTerm}":`, error);
      return { pokemons: [], total: 0 };
    }
  }

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }

  const data: PokemonListResponse = await response.json();

  const detailedPokemonPromises = data.results.map((p) =>
    fetchPokemonDetails(p.name)
  );

  const pokemons = await Promise.all(detailedPokemonPromises);

  return { pokemons, total: data.count };
}
