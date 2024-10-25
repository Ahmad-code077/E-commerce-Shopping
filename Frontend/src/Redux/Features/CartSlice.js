import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItem: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};
export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: () => {},
  },
});
