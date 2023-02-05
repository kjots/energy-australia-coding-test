import { configureStore } from '@reduxjs/toolkit';

import { festivalsSlice } from '../state/slices/festivals.slice';

export const store = configureStore({
  reducer: {
    [festivalsSlice.name]: festivalsSlice.reducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
