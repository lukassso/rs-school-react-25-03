import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts'; // Za chwilę stworzymy ten plik

interface SelectionState {
  selectedIds: number[];
}

const initialState: SelectionState = {
  selectedIds: [],
};

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    addSelected: (state, action: PayloadAction<number>) => {
      state.selectedIds.push(action.payload);
    },
    removeSelected: (state, action: PayloadAction<number>) => {
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload
      );
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { addSelected, removeSelected, clearSelection } =
  selectionSlice.actions;

export const selectSelectedIds = (state: RootState) =>
  state.selection.selectedIds;

export default selectionSlice.reducer;
