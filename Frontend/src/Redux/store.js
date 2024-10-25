import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './Features/CartSlice';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
