import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Vite + React + TS',
  description: 'Migrated to Next.js',
};

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  return (
    <html lang={locale} data-theme="dark">
      <body>
        {/* Providers will be configured here later */}
        {children}
      </body>
    </html>
  );
}