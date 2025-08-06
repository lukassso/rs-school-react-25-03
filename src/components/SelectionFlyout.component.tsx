import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  clearSelection,
  selectSelectedIds,
  selectSelectedPokemons,
} from '../store/selectionSlice';
import type { DisplayPokemon } from '../types';

const SelectionFlyout: React.FC = () => {
  const selectedPokemons = useAppSelector(selectSelectedPokemons);
  const selectedIds = useAppSelector(selectSelectedIds);
  const dispatch = useAppDispatch();

  const handleDownload = () => {
    const headers = ['id', 'name', 'description', 'imageUrl'];
    const rows = selectedPokemons.map((p: DisplayPokemon) =>
      [
        p.id,
        `"${p.name}"`, // Handle names with commas
        `"${p.description.replace(/"/g, '""')}"`, // Handle quotes in description
        `"${p.imageUrl}"`,
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedPokemons.length}_pokemons.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };
  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-foreground">
          {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleClearSelection}
            className="px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Unselect all
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-primary text-foreground rounded-md hover:opacity-90"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionFlyout;
