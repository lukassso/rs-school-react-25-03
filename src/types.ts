export interface DisplayPokemon {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
}

export interface PokemonListResponse {
  count?: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonSpeciesResponse {
  id: number;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  species: {
    url: string;
  };
}
