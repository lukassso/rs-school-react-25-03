import React from 'react';

class CardSkeleton extends React.Component {
  render() {
    return (
      <div
        className="h-38 w-67 bg-gray-300 rounded"
        data-testid="card-skeleton"
      />
    );
  }
}

export default CardSkeleton;
