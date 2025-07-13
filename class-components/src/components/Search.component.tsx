import React from 'react';

interface SearchProps {
  isLoading: boolean;
  onSearch: () => void;
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchComponent extends React.Component<SearchProps> {
  render() {
    const { isLoading, onSearch, searchTerm, onSearchTermChange } = this.props;
    return (
      <div className="flex w-full relative">
        <input
          className="border h-14 md:h-18 border-gray-300 focus:outline-none rounded-l-lg md:py-6 py-3 md:px-12 px-6 text-xl md:text-2xl w-full"
          type="search"
          placeholder="Search Pikachu, Charizard..."
          disabled={isLoading}
          aria-label="Search Pokémon"
          value={searchTerm}
          onChange={onSearchTermChange}
        />
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="text-white h-14 md:h-18 cursor-pointer text-xl md:text-2xl bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-r-lg md:px-12 px-8 py-2 text-center"
        >
          Search
        </button>
      </div>
    );
  }
}
export default SearchComponent;
