import { http, HttpResponse, delay } from 'msw';
import type { PokemonListResponse, PokemonSpeciesResponse } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const mockPokemonList: PokemonListResponse = {
  results: [
    { name: 'bulbasaur', url: `${API_BASE_URL}/pokemon/1/` },
    { name: 'ivysaur', url: `${API_BASE_URL}/pokemon/2/` },
  ],
};

const mockBulbasaurData = {
  name: 'bulbasaur',
  species: { url: `${API_BASE_URL}/pokemon-species/1/` },
};

const mockBulbasaurSpecies: PokemonSpeciesResponse = {
  id: 1,
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was\nplanted on its back at birth.',
      language: { name: 'en' },
    },
  ],
};

const mockIvysaurData = {
  name: 'ivysaur',
  species: { url: `${API_BASE_URL}/pokemon-species/2/` },
};

const mockIvysaurSpecies: PokemonSpeciesResponse = {
  id: 2,
  flavor_text_entries: [
    {
      flavor_text:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      language: { name: 'en' },
    },
  ],
};

const mockPikachuData = {
  name: 'pikachu',
  species: { url: `${API_BASE_URL}/pokemon-species/25/` },
};

const mockPikachuSpecies: PokemonSpeciesResponse = {
  id: 25,
  flavor_text_entries: [
    {
      flavor_text: 'It has small electric sacs on both its cheeks.',
      language: { name: 'en' },
    },
  ],
};

export const handlers = [
  // List pokemons
  http.get(`${API_BASE_URL}/pokemon`, async () => {
    await delay(150); // Simulate network delay
    return HttpResponse.json(mockPokemonList);
  }),

  // Search for a specific pokemon
  http.get(`${API_BASE_URL}/pokemon/:name`, async ({ params }) => {
    await delay(150);
    const { name } = params;
    if (name === 'pikachu') {
      return HttpResponse.json(mockPikachuData);
    }
    if (name === 'bulbasaur') {
      return HttpResponse.json(mockBulbasaurData);
    }
    if (name === 'ivysaur') {
      return HttpResponse.json(mockIvysaurData);
    }
    if (name === 'notfound') {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }
    return HttpResponse.json(mockPokemonList);
  }),

  // Get species details
  http.get(`${API_BASE_URL}/pokemon-species/:id`, async ({ params }) => {
    await delay(150);
    const { id } = params;
    if (id === '1') return HttpResponse.json(mockBulbasaurSpecies);
    if (id === '2') return HttpResponse.json(mockIvysaurSpecies);
    if (id === '25') return HttpResponse.json(mockPikachuSpecies);

    // Fallback for any other ID
    return new HttpResponse(null, { status: 404 });
  }),
];
