import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


export interface UserPreferencesState {
  selectedTheme: string,
  likedAirports: string[],
  musicVolume: number,
  atcVolume: number,
}


export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    selectedTheme: '',
    likedAirports: [],
    musicVolume: 50,
    atcVolume: 25,
  } as UserPreferencesState,
  reducers: {
    setSelectedTheme(state, action) {
      state.selectedTheme = action.payload;
    },
    setLikedAirports(state, action) {
      state.likedAirports = action.payload;
    },
    setMusicVolume(state, action) {
      state.musicVolume = action.payload;
    },
    setAtcVolume(state, action) {
      state.atcVolume = action.payload;
    },
    addLikedAirport(state, action) {
      state.likedAirports.push(action.payload);
    }
  },
  selectors: {
    getSelectedTheme: (state: UserPreferencesState) => state.selectedTheme,
  }
})


export const { getSelectedTheme } = userPreferencesSlice.selectors;
export const { setSelectedTheme, setLikedAirports, setMusicVolume, setAtcVolume, addLikedAirport } = userPreferencesSlice.actions;