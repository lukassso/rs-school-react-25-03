import React from 'react';
import SearchComponent from '../components/Search.component';

interface AppTopControlsProps {
  onSearch: () => void;
  isLoading: boolean;
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AppTopControls: React.FC<AppTopControlsProps> = ({
  onSearch,
  isLoading,
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 gap-2">
      <SearchComponent
        onSearch={onSearch}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
      />
    </div>
  );
};
export default AppTopControls;
