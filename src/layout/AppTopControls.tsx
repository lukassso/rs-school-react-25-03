import React from 'react';
import SearchComponent from '../components/Search.component';
import Spinner from '../components/Spinner.component';
import Button from '../components/Button.component';

interface AppTopControlsProps {
  onSearch: () => void;
  isLoading: boolean;
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  isFetching: boolean;
}

const AppTopControls: React.FC<AppTopControlsProps> = ({
  onSearch,
  isLoading,
  searchTerm,
  onSearchTermChange,
  onRefresh,
  isFetching,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 gap-2">
      <SearchComponent
        onSearch={onSearch}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
      />
      <Button onClick={onRefresh} aria-label="Refresh Pokémon list">
        {isFetching ? <Spinner /> : 'Refresh cache'}
      </Button>
    </div>
  );
};
export default AppTopControls;
