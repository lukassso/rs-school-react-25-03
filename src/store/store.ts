import {
  combineReducers,
  configureStore as rtkConfigureStore,
} from '@reduxjs/toolkit';
import selectionReducer from './selectionSlice';

const rootReducer = combineReducers({
  selection: selectionReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return rtkConfigureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
