import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MainLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const activeLinkClass = 'text-blue-300 underline underline';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="bg-card p-4 shadow-md sticky top-0 z-10 border-b border-border">
        <nav className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-primary">
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
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
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
