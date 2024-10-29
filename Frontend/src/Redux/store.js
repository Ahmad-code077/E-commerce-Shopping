import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './Features/CartSlice';
import authApi from './Features/auth/authapi';
import AuthReducer from './Features/auth/authSlice';
export const store = configureStore({
  reducer: {
    cart: CartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
