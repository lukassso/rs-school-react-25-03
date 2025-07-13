import React from 'react';
import AppTopControls from './layout/AppTopControls';
import AppResults from './layout/AppResults';
import type { DisplayPokemon } from './types';
import { getPokemons } from './services/api';

interface AppState {
  isLoading: boolean;
  error: Error | null;
  pokemons: DisplayPokemon[];
  searchTerm: string;
}

const LS_SEARCH_KEY = 'pokemonSearchTerm';

interface AppState {
  searchTerm: string;
  pokemons: DisplayPokemon[];
  isLoading: boolean;
  error: Error | null;
  // This state is just for testing the error boundary
  shouldThrowError: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      pokemons: [],
      isLoading: false,
      error: null,
      shouldThrowError: false,
    };
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem(LS_SEARCH_KEY) || '';
    this.setState({ searchTerm: savedSearchTerm }, () => {
      this.fetchData();
    });
  }

  fetchData = () => {
    const { searchTerm } = this.state;
    this.setState({ isLoading: true, error: null });

    getPokemons(searchTerm.trim())
      .then((pokemons) => {
        this.setState({ pokemons, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error, isLoading: false, pokemons: [] });
      });
  };

  handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem(LS_SEARCH_KEY, searchTerm.trim());
    this.fetchData();
  };

  render() {
    const { isLoading, error, pokemons, searchTerm } = this.state;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(36,36,36)] text-white p-8">
        <AppTopControls
          searchTerm={searchTerm}
          onSearch={this.handleSearch}
          isLoading={isLoading}
          onSearchTermChange={this.handleSearchTermChange}
        />
        <AppResults isLoading={isLoading} error={error} pokemons={pokemons} />
        <button className="cursor-pointer mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check an error
        </button>
        {/* <AppErrors /> */}
      </div>
    );
  }
}

export default App;
