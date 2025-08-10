import {
  combineReducers,
  configureStore as rtkConfigureStore,
} from '@reduxjs/toolkit';
import selectionReducer from './selectionSlice';
import { pokemonApi } from '../services/pokemonApi';

const rootReducer = combineReducers({
  selection: selectionReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return rtkConfigureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
