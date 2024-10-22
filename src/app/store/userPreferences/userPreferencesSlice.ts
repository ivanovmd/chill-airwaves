import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../middlewares/listener";


export interface AppTheme {
  name: string,
  colors: {
    primary: string,
    secondary: string,
    background: string,
    text: string,
  }
  backgroundImageURL: string,
}


export interface UserPreferencesState {
  selectedTheme: AppTheme,
  likedAirportsIata: string[],
  musicVolume: number,
  atcVolume: number,
}


export const defaultTheme: AppTheme = {
  name: 'default',
  colors: {
    primary: '#12bedd',
    secondary: '#00ff00',
    background: '#0000ff',
    text: '#ffffff',
  },
  backgroundImageURL: 'https://cdn.midjourney.com/aeb9cae2-47e3-4edf-97b1-5170e511429f/0_0.png'
}


export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    selectedTheme: defaultTheme,
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

export const startAppListening = listenerMiddleware.startListening

startAppListening({
  actionCreator: setSelectedTheme,
  effect: async ({ payload }: PayloadAction<AppTheme>) => {
    console.log('Setting theme', payload);
    Object.entries(payload.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }
})