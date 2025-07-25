import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div
      className="w-full h-48 bg-gray-700 rounded-lg animate-pulse"
      data-testid="card-skeleton"
    />
  );
};

export default CardSkeleton;
