'use client';

import React from 'react';
import { useTheme, ThemeProvider } from '@/context/ThemeContext';
import SelectionFlyout from '@/components/SelectionFlyout.component';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '../global.css';

function SiteLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const activeLinkClass = 'text-primary underline';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="bg-card p-4 shadow-md sticky top-0 z-10 border-b border-border">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            PokéApp
          </a>
          <ul className="flex gap-4">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About
              </a>
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
      <main className="flex-grow container mx-auto p-4 md:p-8">{children}</main>
      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        © 2024 PokéApp
      </footer>
      <SelectionFlyout />
    </div>
  );
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <SiteLayout>{children}</SiteLayout>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
