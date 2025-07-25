import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const activeLinkClass = 'text-blue-400 underline';

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-white">
            PokéApp
          </NavLink>
          <ul className="flex gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-400 ${isActive ? activeLinkClass : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-blue-400 ${isActive ? activeLinkClass : ''}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        © 2024 PokéApp
      </footer>
    </div>
  );
};

export default MainLayout;
