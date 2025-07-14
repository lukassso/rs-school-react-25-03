export interface DisplayPokemon {
  id: number;
  name: string;
  description: string;
}

export interface PokemonListResponse {
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
