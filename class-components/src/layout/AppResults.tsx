import React from 'react';
import CardSkeleton from '../components/CardSkeleton.component';
import reactIcon from '../assets/react.svg';

interface AppResultsProps {
  isLoading: boolean;
  error: Error | null;
  pokemons?: any[];
}

class AppResults extends React.Component<AppResultsProps> {
  render() {
    const { isLoading, error, pokemons } = this.props;

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 16 }).map((_, index) => (
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

    if (pokemons.length !== 0) {
      return (
        <div className="text-center p-10 text-gray-500 h-80 flex flex-col items-center justify-center">
          No Pokémon found. Try searching for another!
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center border border-gray-200 rounded-lg shadow bg-white p-5 transition-transform transform hover:scale-105">
          <img className="w-24 h-24 mb-3" src={reactIcon} />
          <h3 className="mb-1 text-xl font-medium text-gray-900 capitalize">
            Pikachu
          </h3>
          <p className="text-sm text-gray-500 h-20 overflow-hidden">
            Pikachu is an Electric-type Pokémon.
          </p>
        </div>
        <div className="flex flex-col items-center text-center border border-gray-200 rounded-lg shadow bg-white p-5 transition-transform transform hover:scale-105">
          <img className="w-24 h-24 mb-3" src={reactIcon} />
          <h3 className="mb-1 text-xl font-medium text-gray-900 capitalize">
            Pikachu
          </h3>
          <p className="text-sm text-gray-500 h-20 overflow-hidden">
            Pikachu is an Electric-type Pokémon.
          </p>
        </div>
        <div className="flex flex-col items-center text-center border border-gray-200 rounded-lg shadow bg-white p-5 transition-transform transform hover:scale-105">
          <img className="w-24 h-24 mb-3" src={reactIcon} />
          <h3 className="mb-1 text-xl font-medium text-gray-900 capitalize">
            Pikachu
          </h3>
          <p className="text-sm text-gray-500 h-20 overflow-hidden">
            Pikachu is an Electric-type Pokémon.
          </p>
        </div>
        <div className="flex flex-col items-center text-center border border-gray-200 rounded-lg shadow bg-white p-5 transition-transform transform hover:scale-105">
          <img className="w-24 h-24 mb-3" src={reactIcon} />
          <h3 className="mb-1 text-xl font-medium text-gray-900 capitalize">
            Pikachu
          </h3>
          <p className="text-sm text-gray-500 h-20 overflow-hidden">
            Pikachu is an Electric-type Pokémon.
          </p>
        </div>
        <div className="flex flex-col items-center text-center border border-gray-200 rounded-lg shadow bg-white p-5 transition-transform transform hover:scale-105">
          <img className="w-24 h-24 mb-3" src={reactIcon} />
          <h3 className="mb-1 text-xl font-medium text-gray-900 capitalize">
            Pikachu
          </h3>
          <p className="text-sm text-gray-500 h-20 overflow-hidden">
            Pikachu is an Electric-type Pokémon.
          </p>
        </div>
      </div>
    );
  }
}
export default AppResults;
