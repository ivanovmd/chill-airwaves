import { createSlice } from "@reduxjs/toolkit";

export interface AirportsState {
  selectedAirport: string | null;
}

export const airportsSlice = createSlice({
  name: 'airports',
  initialState: {
    selectedAirport: null,
  },
  reducers: {
    setSelectedAirport(state, action) {
      state.selectedAirport = action.payload;
    },
  },
  selectors: {
    getSelectedAirport: (state: AirportsState) => state.selectedAirport,
  },
});

export const { setSelectedAirport } = airportsSlice.actions;

export const { getSelectedAirport } = airportsSlice.selectors;