import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchPokemonDetails } from '../services/api';
import type { DisplayPokemon } from '../types';
import Spinner from '../components/Spinner.component';

const PokemonDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pokemonName = searchParams.get('details');

  const [pokemon, setPokemon] = useState<DisplayPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (pokemonName) {
      const loadDetails = async () => {
        setIsLoading(true);
        setError(null);
        setPokemon(null);
        try {
          const data = await fetchPokemonDetails(pokemonName);
          setPokemon(data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      };
      loadDetails();
    }
  }, [pokemonName]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    navigate(`/?${params.toString()}`, { replace: true });
  };

  if (!pokemonName) {
    return null;
  }

  return (
    <div className="sticky top-[100px] p-5 border border-gray-700 rounded-lg bg-gray-800 h-[calc(100vh-140px)] overflow-y-auto">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-3xl text-gray-400 hover:text-white z-10"
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
        <p className="text-red-400 text-center">Error: {error.message}</p>
      )}
      {pokemon && !isLoading && (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-48 h-48 p-13 m-4 bg-gray-700 rounded-full border border-gray-600 shadow-lg"
          />
          <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>
          <span className="text-sm text-gray-400 mb-4">ID: {pokemon.id}</span>
          <p className="text-gray-300 text-lg">{pokemon.description}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
