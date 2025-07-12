import React from 'react';
import AppTopControls from './layout/AppTopControls';
import AppResults from './layout/AppResults';

interface AppState {
  count: number;
}
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(36,36,36)] text-white p-8">
        <AppTopControls onSearch={() => {}} />
        <AppResults isLoading={false} error={null} pokemons={[]} />
        <button className="cursor-pointer mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check an error
        </button>
        {/* <AppErrors /> */}
      </div>
    );
  }
}

export default App;
