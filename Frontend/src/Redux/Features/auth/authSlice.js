import { createSlice } from '@reduxjs/toolkit';

const getFromLocalStorage = () => {
  try {
    const getUser = localStorage.getItem('user');
    console.log('getsuere', getUser);
    if (getUser == null) return { user: null };
    return { user: JSON.parse(getUser) };
  } catch (error) {
    return { user: null };
  }
};
const initialState = getFromLocalStorage();

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
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
