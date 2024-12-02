import { createSlice } from '@reduxjs/toolkit';

const getFromLocalStorage = () => {
  try {
    const getUser = localStorage.getItem('user');
    if (getUser == null) return { user: null };
    return { user: JSON.parse(getUser) };
  } catch (error) {
    console.log(error);
    return { user: null };
  }
};
const initialState = {
  ...getFromLocalStorage(),
  isOpen: false,
};
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setUser, logout, setIsOpen } = authSlice.actions;
export default authSlice.reducer;
