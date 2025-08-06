import React from 'react';
import { Link } from 'react-router';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full bg-background text-foreground min-h-screen">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="text-2xl md:text-3xl font-light text-foreground mb-8">
        Sorry, the page you are looking for cannot be found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-lg font-semibold text-white bg-primary rounded-md hover:opacity-90"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
