import React from 'react';
import AppTopControls from './layout/AppTopControls';
import AppResults from './layout/AppResults';
import type { DisplayPokemon } from './types';
import { getPokemons } from './services/api';

const LS_SEARCH_KEY = 'pokemonSearchTerm';

interface AppState {
  searchTerm: string;
  pokemons: DisplayPokemon[];
  isLoading: boolean;
  error: Error | null;
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

  handleThrowError = () => {
    this.setState({ shouldThrowError: true });
  };

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
    const { isLoading, error, pokemons, searchTerm, shouldThrowError } =
      this.state;

    if (shouldThrowError) {
      throw new Error('You clicked the button to test the Error Boundary!');
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(36,36,36)] text-white p-8">
        <AppTopControls
          searchTerm={searchTerm}
          onSearch={this.handleSearch}
          isLoading={isLoading}
          onSearchTermChange={this.handleSearchTermChange}
        />
        <AppResults isLoading={isLoading} error={error} pokemons={pokemons} />
        <button
          onClick={this.handleThrowError}
          className="cursor-pointer mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check an error
        </button>
      </div>
    );
  }
}

export default App;
