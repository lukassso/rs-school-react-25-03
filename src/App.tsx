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

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pokemons, setPokemons] = React.useState<DisplayPokemon[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [shouldThrowError, setShouldThrowError] = React.useState(false);

  React.useEffect(() => {
    const savedSearchTerm = localStorage.getItem(LS_SEARCH_KEY) || '';
    setSearchTerm(savedSearchTerm);
  }, []);

  const handleThrowError = () => {
    setShouldThrowError(true);
  };

  const fetchData = () => {
    setIsLoading(true);
    setError(null);

    getPokemons(searchTerm.trim())
      .then((data) => {
        setPokemons(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem(LS_SEARCH_KEY, searchTerm.trim());
    fetchData();
  };

  if (shouldThrowError) {
    throw new Error('You clicked the button to test the Error Boundary!');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(36,36,36)] text-white p-8">
      <AppTopControls
        searchTerm={searchTerm}
        onSearch={handleSearch}
        isLoading={isLoading}
        onSearchTermChange={handleSearchTermChange}
      />
      <AppResults isLoading={isLoading} error={error} pokemons={pokemons} />
      <button
        onClick={handleThrowError}
        className="cursor-pointer mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Check an error
      </button>
    </div>
  );
};

export default App;
