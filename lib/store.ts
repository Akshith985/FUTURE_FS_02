import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types for TypeScript usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;