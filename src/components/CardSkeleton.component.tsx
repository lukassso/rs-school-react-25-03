import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div
      className="h-45 w-67 bg-gray-300 rounded-lg animate-pulse shadow-md flex items-center justify-center"
      data-testid="card-skeleton"
    />
  );
};

export default CardSkeleton;
