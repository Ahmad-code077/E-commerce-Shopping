import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './Features/CartSlice';
import authApi from './Features/auth/authapi';
import AuthReducer from './Features/auth/authSlice';
import productApi from './Features/products/productApi';
export const store = configureStore({
  reducer: {
    cart: CartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: AuthReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});
