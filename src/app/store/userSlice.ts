import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.username = null;
      state.email = null;
    },
  },
});