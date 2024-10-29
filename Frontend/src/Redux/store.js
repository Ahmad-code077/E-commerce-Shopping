import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './Features/CartSlice';
import authApi from './Features/auth/authapi';
// import reducer from './Features/CartSlice';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
