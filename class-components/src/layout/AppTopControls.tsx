import React from 'react';
import SearchComponent from '../components/Search.component';

interface AppTopControlsProps {
  onSearch: () => void;
  isLoading?: boolean;
}

class AppTopControls extends React.Component<AppTopControlsProps> {
  render() {
    const { onSearch, isLoading } = this.props;
    return (
      <div className="flex justify-between items-center mb-4 gap-2">
        <SearchComponent onSearch={onSearch} isLoading={isLoading} />
      </div>
    );
  }
}
export default AppTopControls;
