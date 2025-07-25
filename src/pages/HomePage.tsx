import React, { useState, useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import AppTopControls from '../layout/AppTopControls';
import AppResults from '../layout/AppResults';
import Pagination from '../components/Pagination.component';
import { useLocalStorage, useScrollToTop } from '../hooks';
import type { DisplayPokemon } from '../types';
import { getPokemons, ITEMS_PER_PAGE } from '../services/api';

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [persistedQuery, setPersistedQuery] = useLocalStorage(
    'pokemonSearchTerm',
    ''
  );

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchTerm = searchParams.get('search') || '';
  const detailsOpen = searchParams.has('details'); // **PRZYWRÓCONE I KLUCZOWE**

  const [inputValue, setInputValue] = useState(searchTerm || persistedQuery);

  const [pokemons, setPokemons] = useState<DisplayPokemon[]>([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useScrollToTop([page, searchTerm]);

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl === null && persistedQuery) {
      setSearchParams({ search: persistedQuery, page: '1' }, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!searchParams.has('search') && persistedQuery) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { pokemons: fetchedPokemons, total } = await getPokemons(
          page,
          searchTerm
        );
        setPokemons(fetchedPokemons);
        setTotalPokemons(total);
        if (total === 0 && searchTerm) {
          throw new Error(`Pokémon not found: ${searchTerm}`);
        }
      } catch (err) {
        setError(err as Error);
        setPokemons([]);
        setTotalPokemons(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setPersistedQuery(trimmedValue);
    setSearchParams({ search: trimmedValue, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const totalPages = Math.ceil(totalPokemons / ITEMS_PER_PAGE);

  return (
    <div
      className="lg:grid lg:gap-8"
      style={{ gridTemplateColumns: detailsOpen ? '3fr 1fr' : '1fr' }}
    >
      <div className="flex flex-col items-center">
        <AppTopControls
          searchTerm={inputValue}
          onSearch={handleSearch}
          isLoading={isLoading}
          onSearchTermChange={(e) => setInputValue(e.target.value)}
        />
        <AppResults isLoading={isLoading} error={error} pokemons={pokemons} />
        {!isLoading && !error && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {detailsOpen && (
        <div className="animate-fade-in mt-8 lg:mt-0">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default HomePage;
