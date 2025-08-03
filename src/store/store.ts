import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from './selectionSlice';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
  },
});

// Types for RootState and AppDispatch
// These types are used to type the useSelector and useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
