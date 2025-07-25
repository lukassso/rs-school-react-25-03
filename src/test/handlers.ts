import { http, HttpResponse, delay } from 'msw';
import type {
  PokemonListResponse,
  PokemonSpeciesResponse,
  PokemonDetailsResponse,
  DisplayPokemon,
} from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const mockBulbasaur: DisplayPokemon = {
  id: 1,
  name: 'bulbasaur',
  description: 'A strange seed was planted on its back at birth.',
  imageUrl:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
};

export const mockIvysaur: DisplayPokemon = {
  id: 2,
  name: 'ivysaur',
  description: 'When the bulb on its back grows large...',
  imageUrl:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
};

export const mockPikachu: DisplayPokemon = {
  id: 25,
  name: 'pikachu',
  description: 'It has small electric sacs on both its cheeks.',
  imageUrl:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
};

export const mockCharmander: DisplayPokemon = {
  id: 4,
  name: 'charmander',
  description: 'It has a preference for hot things.',
  imageUrl:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
};

const mockPokemonListPage1: PokemonListResponse = {
  count: 151,
  results: [
    { name: mockBulbasaur.name, url: `${API_BASE_URL}/pokemon/1/` },
    { name: mockIvysaur.name, url: `${API_BASE_URL}/pokemon/2/` },
  ],
};

const mockPokemonListPage2: PokemonListResponse = {
  count: 151,
  results: [{ name: mockCharmander.name, url: `${API_BASE_URL}/pokemon/4/` }],
};

const mockBulbasaurData: PokemonDetailsResponse = {
  id: mockBulbasaur.id,
  name: mockBulbasaur.name,
  sprites: { front_default: mockBulbasaur.imageUrl },
  species: { url: `${API_BASE_URL}/pokemon-species/1/` },
};

const mockIvysaurData: PokemonDetailsResponse = {
  id: mockIvysaur.id,
  name: mockIvysaur.name,
  sprites: { front_default: mockIvysaur.imageUrl },
  species: { url: `${API_BASE_URL}/pokemon-species/2/` },
};

const mockPikachuData: PokemonDetailsResponse = {
  id: mockPikachu.id,
  name: mockPikachu.name,
  sprites: { front_default: mockPikachu.imageUrl },
  species: { url: `${API_BASE_URL}/pokemon-species/25/` },
};

const mockCharmanderData: PokemonDetailsResponse = {
  id: mockCharmander.id,
  name: mockCharmander.name,
  sprites: { front_default: mockCharmander.imageUrl },
  species: { url: `${API_BASE_URL}/pokemon-species/4/` },
};

const mockBulbasaurSpecies: PokemonSpeciesResponse = {
  id: 1,
  flavor_text_entries: [
    { flavor_text: mockBulbasaur.description, language: { name: 'en' } },
  ],
};

const mockIvysaurSpecies: PokemonSpeciesResponse = {
  id: 2,
  flavor_text_entries: [
    { flavor_text: mockIvysaur.description, language: { name: 'en' } },
  ],
};

const mockPikachuSpecies: PokemonSpeciesResponse = {
  id: 25,
  flavor_text_entries: [
    { flavor_text: mockPikachu.description, language: { name: 'en' } },
  ],
};

const mockCharmanderSpecies: PokemonSpeciesResponse = {
  id: 4,
  flavor_text_entries: [
    { flavor_text: mockCharmander.description, language: { name: 'en' } },
  ],
};

export const handlers = [
  http.get(`${API_BASE_URL}/pokemon`, async ({ request }) => {
    const url = new URL(request.url);
    const offset = url.searchParams.get('offset');

    await delay(10);

    if (offset === '20') {
      return HttpResponse.json(mockPokemonListPage2);
    }

    return HttpResponse.json(mockPokemonListPage1);
  }),

  http.get(`${API_BASE_URL}/pokemon/:name`, async ({ params }) => {
    await delay(10);
    const { name } = params;

    switch (name) {
      case 'pikachu':
        return HttpResponse.json(mockPikachuData);
      case 'bulbasaur':
        return HttpResponse.json(mockBulbasaurData);
      case 'ivysaur':
        return HttpResponse.json(mockIvysaurData);
      case 'charmander':
        return HttpResponse.json(mockCharmanderData);
      default:
        return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }
  }),

  http.get(`${API_BASE_URL}/pokemon-species/:id`, async ({ params }) => {
    await delay(10);
    const { id } = params;

    switch (id) {
      case '1':
        return HttpResponse.json(mockBulbasaurSpecies);
      case '2':
        return HttpResponse.json(mockIvysaurSpecies);
      case '4':
        return HttpResponse.json(mockCharmanderSpecies);
      case '25':
        return HttpResponse.json(mockPikachuSpecies);
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
];
