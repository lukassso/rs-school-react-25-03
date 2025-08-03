import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#FFFFFF',
          text: '#111827',
          primary: '#3B82F6',
          card: '#F9FAFB',
          border: '#E5E7EB',
        },
        dark: {
          background: '#111827', // bg-gray-900
          text: '#E5E7EB', // text-gray-200
          primary: '#3B82F6', // text-blue-500
          card: '#1F2937', // bg-gray-800
          border: '#374151', // border-gray-700
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
