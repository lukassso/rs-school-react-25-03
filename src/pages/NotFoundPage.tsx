import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full bg-gray-900 text-white min-h-screen">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <p className="text-2xl md:text-3xl font-light text-gray-300 mb-8">
        Sorry, the page you are looking for cannot be found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
