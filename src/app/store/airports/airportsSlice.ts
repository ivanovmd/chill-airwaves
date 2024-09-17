import { createSelector, createSlice } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../middlewares/listener";
import { buildLiveATCUrl } from "../../../services/atcService";
import { RootState } from "..";
import { airports } from "../../../settings/liveatc";


export const startAppListening = listenerMiddleware.startListening

export interface AirportsState {
  selectedAirportIata: string | null;
  atcPlaylist: {
    tracks: string[];
    currentTrackIndex: number;
  };
}

export const airportsSlice = createSlice({
  name: 'airports',
  initialState: {
    selectedAirportIata: null,
    atcPlaylist: {
      tracks: [],
      currentTrackIndex: 0,
    },
  } as AirportsState,
  reducers: {
    setSelectedAirportIata(state, action) {
      state.selectedAirportIata = action.payload;
    },
    setAtcPlaylist(state, action) {
      state.atcPlaylist.tracks = action.payload.tracks;
      state.atcPlaylist.currentTrackIndex = 0;
    },
    nextTrack(state) {
      const nextIndex = state.atcPlaylist.currentTrackIndex + 1;
      if (nextIndex < state.atcPlaylist.tracks.length) {
        state.atcPlaylist.currentTrackIndex = nextIndex;
      } else {
        state.atcPlaylist.currentTrackIndex = 0; // Loop back to the start
      }
    },
  },
  selectors: {
    getSelectedAirport: (state: AirportsState) => state.selectedAirportIata,
  },
});


export const getCurrentAtcTrack = createSelector(
  (state: RootState) => state.airports.atcPlaylist.tracks,
  (state: RootState) => state.airports.atcPlaylist.currentTrackIndex,
  (tracks, currentTrackIndex) => tracks[currentTrackIndex]
)

export const { setSelectedAirportIata, setAtcPlaylist } = airportsSlice.actions;
export const { getSelectedAirport } = airportsSlice.selectors;


startAppListening({
  actionCreator: setSelectedAirportIata,
  effect: async (action, { dispatch, getState }) => {
    const state = getState() as RootState;
    // build atc files urls based on the selected airport
    const ATC_BASE_URL = await window.electronAPI.getEnv('ATC_BASE_URL')
    const numberOfAtcRecords = 24;
    const atcFilesUrls = [];
    const selectedAirportIata = state.airports.selectedAirportIata;
    const selectedAirport = airports.find(airport => airport.iata === selectedAirportIata);

    for (let i = numberOfAtcRecords; i > 0; i--) {
      const atcUrl = buildLiveATCUrl(ATC_BASE_URL, selectedAirport, i);
      atcFilesUrls.push(atcUrl);
    }

    dispatch(setAtcPlaylist({ tracks: atcFilesUrls }));
  }
});

