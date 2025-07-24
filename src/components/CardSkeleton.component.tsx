import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div
      className="h-38 w-67 bg-gray-300 rounded"
      data-testid="card-skeleton"
    />
  );
};

export default CardSkeleton;
