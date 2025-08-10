import React from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import Spinner from '../components/Spinner.component';
import { useGetPokemonDetailsQuery } from '../services/pokemonApi';

const PokemonDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pokemonName = searchParams.get('details');

  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonDetailsQuery(pokemonName!, {
    skip: !pokemonName,
  });

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    navigate(`/?${params.toString()}`, { replace: true });
  };

  if (!pokemonName) {
    return null;
  }

  return (
    <div className="sticky top-[100px] p-5 border border-border rounded-lg bg-card h-[calc(100vh-140px)] overflow-y-auto">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-3xl text-foreground hover:text-primary z-10"
        aria-label="Close details"
      >
        ×
      </button>
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-full">
          <Spinner size="lg" />
        </div>
      )}
      {error && (
        <p className="text-red-400 text-center">
          Error:{' '}
          {(error as { error: string }).error || 'An unknown error occurred'}
        </p>
      )}
      {pokemon && !isLoading && (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-48 h-48 p-13 m-4 bg-card rounded-full border border-border shadow-lg"
          />
          <h2 className="text-3xl font-bold capitalize mb-2 text-foreground">
            {pokemon.name}
          </h2>
          <span className="text-sm text-foreground mb-4">ID: {pokemon.id}</span>
          <p className="text-foreground text-lg">{pokemon.description}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
