import { createSlice } from "@reduxjs/toolkit";
import { AppTheme } from "../userPreferences/userPreferencesSlice";

export interface AppState {
  userEmail: string;
  isUnlocked: boolean;
  themes: AppTheme[];
}


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userEmail: '',
    isUnlocked: false,
    themes: [],
  } as AppState,
  reducers: {
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
    setIsUnlocked(state, action) {
      state.isUnlocked = action.payload;
    },
    setThemes(state, action) {
      state.themes = action.payload;
    }
  },
  selectors: {
    getUserEmail: (state: AppState) => state.userEmail,
    getIsUnlocked: (state: AppState) => state.isUnlocked,
    getThemes: (state: AppState) => state.themes,
  }
})

export const { setUserEmail, setIsUnlocked, setThemes } = appSlice.actions;
export const { getUserEmail, getIsUnlocked, getThemes } = appSlice.selectors;