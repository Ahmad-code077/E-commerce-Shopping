import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
    addToCart: (state, action) => {
      const isExist = state.cartItem.find(
        (item) => item.id === action.payload.id
      );

      if (!isExist) {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      } else {
        toast('Item already Exist');
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = calculateTax(state); // Calculate tax
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// utils function
export const setSelectedItems = (state) =>
  state.cartItem.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
export const setTotalPrice = (state) => {
  return state.cartItem.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0); // Initializing `total` to 0
};

export const calculateTax = (state) => {
  const totalPrice = setTotalPrice(state); // Get the current total price
  return totalPrice * state.taxRate; // Calculate the tax
};

export const setGrandTotal = (state) => {
  return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};

export const { addToCart } = CartSlice.actions;

export default CartSlice.reducer;
