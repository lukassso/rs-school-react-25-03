import React from 'react';
import CardSkeleton from '../components/CardSkeleton.component';
import type { DisplayPokemon } from '../types';
import { Link, useSearchParams } from 'react-router';

interface AppResultsProps {
  isLoading: boolean;
  error: Error | null;
  pokemons: DisplayPokemon[];
}

const AppResults: React.FC<AppResultsProps> = ({
  isLoading,
  error,
  pokemons,
}) => {
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h3 className="font-bold text-lg">An Error Occurred</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500 h-80 flex flex-col items-center justify-center">
        No Pokémon found. Try searching for another!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {pokemons.map((pokemon) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('details', pokemon.name);
        return (
          <Link
            key={pokemon.id}
            to={`/?${newSearchParams.toString()}`}
            className="flex flex-col items-center text-center border border-gray-700 rounded-lg shadow bg-gray-800 p-5 transition-transform transform hover:scale-105 hover:border-blue-500"
          >
            {pokemon.imageUrl ? (
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                className="w-24 h-24 mb-3"
              />
            ) : (
              <div className="w-24 h-24 mb-3 bg-gray-700 rounded-full flex items-center justify-center text-gray-500">
                ?
              </div>
            )}
            <h3 className="mb-1 text-xl font-medium text-white capitalize">
              {pokemon.name}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default AppResults;
