'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
// import { Outlet } from 'react-router';
import AppTopControls from '@/layout/AppTopControls';
import AppResults from '@/layout/AppResults';
import Pagination from '@/components/Pagination.component';
import { useLocalStorage, useScrollToTop } from '@/hooks';
import { ITEMS_PER_PAGE, useGetPokemonsQuery } from '@/services/pokemonApi';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [persistedQuery, setPersistedQuery] = useLocalStorage(
    'pokemonSearchTerm',
    ''
  );

  const page = parseInt(searchParams?.get('page') || '1', 10);
  const searchTerm = searchParams?.get('search') || '';
  const detailsOpen = searchParams?.has('details');

  const [inputValue, setInputValue] = useState(searchTerm || persistedQuery);

  const { data, error, isLoading, isFetching, refetch } = useGetPokemonsQuery({
    page,
    searchTerm,
  });

  const pokemons = data?.pokemons || [];
  const totalPokemons = data?.total || 0;

  useScrollToTop([page, searchTerm]);

  const updateSearchParams = (params: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/${query}`);
  };

  useEffect(() => {
    const searchFromUrl = searchParams?.get('search');
    if (searchFromUrl === null && persistedQuery) {
      updateSearchParams({ search: persistedQuery, page: '1' });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setPersistedQuery(trimmedValue);
    updateSearchParams({ search: trimmedValue, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage.toString() });
  };

  const totalPages = Math.ceil(totalPokemons / ITEMS_PER_PAGE);
  const showLoading = isLoading || isFetching;

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
          onRefresh={refetch}
          isFetching={isFetching}
        />
        <AppResults
          isLoading={showLoading}
          error={(error as Error) || null}
          pokemons={pokemons}
        />
        {!showLoading && !error && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {detailsOpen && (
        <div className="animate-fade-in mt-8 lg:mt-0">{/* <Outlet /> */}</div>
      )}
    </div>
  );
}
