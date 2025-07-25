import React, { useState, useEffect, useCallback } from 'react';
import AppTopControls from './layout/AppTopControls';
import AppResults from './layout/AppResults';
import type { DisplayPokemon } from './types';
import { getPokemons } from './services/api';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [persistedQuery, setPersistedQuery] = useLocalStorage(
    'pokemonSearchTerm',
    ''
  );
  const [inputValue, setInputValue] = useState(persistedQuery);
  const [pokemons, setPokemons] = useState<DisplayPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    getPokemons(persistedQuery)
      .then((pokemons) => {
        setPokemons(pokemons);
      })
      .catch((err) => {
        setError(err as Error);
        setPokemons([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [persistedQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    setPersistedQuery(inputValue.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <AppTopControls
        searchTerm={inputValue}
        onSearch={handleSearch}
        isLoading={isLoading}
        onSearchTermChange={(e) => setInputValue(e.target.value)}
      />
      <AppResults isLoading={isLoading} error={error} pokemons={pokemons} />
    </div>
  );
};

export default App;
