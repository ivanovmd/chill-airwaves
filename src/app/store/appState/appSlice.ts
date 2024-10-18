import { createSlice } from "@reduxjs/toolkit";


export interface AppState {
  userEmail: string;
  isUnlocked: boolean;
}


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userEmail: '',
    isUnlocked: false,
  } as AppState,
  reducers: {
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
    setIsUnlocked(state, action) {
      state.isUnlocked = action.payload;
    }
  },
  selectors: {
    userEmail: (state: AppState) => state.userEmail,
    isUnlocked: (state: AppState) => state.isUnlocked,
  }
})

export const { setUserEmail, setIsUnlocked } = appSlice.actions;
export const { userEmail, isUnlocked } = appSlice.selectors;