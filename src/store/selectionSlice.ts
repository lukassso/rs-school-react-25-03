import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';
import type { DisplayPokemon } from '../types.ts';

interface SelectionState {
  selectedPokemons: DisplayPokemon[];
}

const initialState: SelectionState = {
  selectedPokemons: [],
};

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<DisplayPokemon>) => {
      const existingIndex = state.selectedPokemons.findIndex(
        (p) => p.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.selectedPokemons.splice(existingIndex, 1);
      } else {
        state.selectedPokemons.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedPokemons = [];
    },
  },
});

export const { toggleSelected, clearSelection } = selectionSlice.actions;

export const selectSelectedPokemons = (state: RootState) =>
  state.selection.selectedPokemons;
export const selectSelectedIds = (state: RootState) =>
  state.selection.selectedPokemons.map((p) => p.id);

export default selectionSlice.reducer;
