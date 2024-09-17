import React, { useEffect } from "react";
import { airports } from "../../settings/liveatc";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, setSelectedAirportIata } from "../store/airports/airportsSlice";

export const Settings = () => {
  const dispatch = useDispatch();
  const selectedAirport = useSelector(getSelectedAirport)

  useEffect(() => {
    // Fetch user settings or preferences here
    console.log("Fetching user settings...");
  }, []);

  return (
    <div>
      <h1>Settings</h1>
      <p>Adjust your preferences here.</p>

      <h3>Airpots:</h3>
      <p>{selectedAirport}</p>
      {airports.map((airport) => (
        <div key={airport.iata} onClick={() => dispatch(setSelectedAirportIata(airport.iata))}>
          <h4>{airport.name} ({airport.iata})</h4>
        </div>
      ))}
    </div>
  );
}