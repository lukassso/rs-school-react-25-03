import type {
  PokemonListResponse,
  PokemonSpeciesResponse,
  DisplayPokemon,
} from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchPokemonList(
  searchTerm?: string
): Promise<{ name: string; url: string }[]> {
  if (searchTerm) {
    const response = await fetch(
      `${API_BASE_URL}/pokemon/${searchTerm.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error(`Pokémon not found: ${searchTerm}`);
    }
    const data = await response.json();
    return [{ name: data.name, url: data.species.url }];
  } else {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=20&offset=0`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }
    const data: PokemonListResponse = await response.json();
    return data.results;
  }
}

async function fetchPokemonDetails(pokemonListItem: {
  name: string;
  url: string;
}): Promise<DisplayPokemon> {
  const speciesResponse = await fetch(
    pokemonListItem.url.replace('/pokemon/', '/pokemon-species/')
  );
  if (!speciesResponse.ok)
    throw new Error(`Failed to fetch details for ${pokemonListItem.name}`);
  const speciesData: PokemonSpeciesResponse = await speciesResponse.json();

  const englishDescription = speciesData.flavor_text_entries
    .find((entry) => entry.language.name === 'en')
    ?.flavor_text.replace(/[\n\f]/g, ' ');

  return {
    id: speciesData.id,
    name: pokemonListItem.name,
    description: englishDescription || 'No description available.',
  };
}

export async function getPokemons(
  searchTerm?: string
): Promise<DisplayPokemon[]> {
  const pokemonList = await fetchPokemonList(searchTerm);

  const detailedPokemonPromises = pokemonList.map((item) =>
    fetchPokemonDetails(item)
  );

  const pokemons = await Promise.all(detailedPokemonPromises);

  return pokemons;
}
