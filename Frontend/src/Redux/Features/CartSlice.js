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
    updateQuantity: (state, action) => {
      state.cartItem = state.cartItem.map((product) => {
        if (product.id === action.payload.id) {
          let updatedQuantity;

          // Determine the new quantity based on the action type
          if (action.payload.type === 'increment') {
            updatedQuantity = product.quantity + 1;
          } else if (action.payload.type === 'decrement') {
            updatedQuantity = product.quantity > 1 ? product.quantity - 1 : 1; // Prevent quantity from going below 1
          }

          // Return a new product object with the updated quantity
          return {
            ...product,
            quantity: updatedQuantity,
          };
        }

        // Return the unchanged product
        return product;
      });
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    removeToCart: (state, action) => {
      state.cartItem = state.cartItem.filter((product) => {
        return product.id !== action.payload;
      });
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    clearCart: (state) => {
      state.cartItem = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.taxRate = 0.05;
      state.grandTotal = 0;
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

export const { addToCart, updateQuantity, removeToCart, clearCart } =
  CartSlice.actions;

export default CartSlice.reducer;
