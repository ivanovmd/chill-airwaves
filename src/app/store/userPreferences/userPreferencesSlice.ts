import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { get } from "http";


export interface UserPreferencesState {
  selectedTheme: string,
  likedAirportsIata: string[],
  musicVolume: number,
  atcVolume: number,
}


export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    selectedTheme: '',
    likedAirportsIata: [],
    musicVolume: 50,
    atcVolume: 25,
  } as UserPreferencesState,
  reducers: {
    setSelectedTheme(state, action) {
      state.selectedTheme = action.payload;
    },
    setLikedAirports(state, action) {
      state.likedAirportsIata = action.payload;
    },
    setMusicVolume(state, action) {
      state.musicVolume = action.payload;
    },
    setAtcVolume(state, action) {
      state.atcVolume = action.payload;
    },
    addLikedAirport(state, action) {
      state.likedAirportsIata.push(action.payload);
    }
  },
  selectors: {
    getSelectedTheme: (state: UserPreferencesState) => state.selectedTheme,
    getLikedAirports: (state: UserPreferencesState) => state.likedAirportsIata,
    getMusicVolume: (state: UserPreferencesState) => state.musicVolume,
    getAtcVolume: (state: UserPreferencesState) => state.atcVolume,
  }
})


export const { getSelectedTheme, getAtcVolume, getLikedAirports, getMusicVolume } = userPreferencesSlice.selectors;
export const { setSelectedTheme, setLikedAirports, setMusicVolume, setAtcVolume, addLikedAirport } = userPreferencesSlice.actions;