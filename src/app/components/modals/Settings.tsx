import React, { useEffect } from "react";
import { airports } from "../../../settings/liveatc";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, setSelectedAirportIata } from "../../store/atc/atsSlice";
import { useModal } from "../../../app/hooks/useModal";

export const Settings = () => {
  const dispatch = useDispatch();
  const selectedAirport = useSelector(getSelectedAirport)
  const { hideModal } = useModal();

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-xl">Settings</h1>

      <h3>Airpots:</h3>
      <button onClick={hideModal}>Hide</button>
      <p>{selectedAirport}</p>
      {airports.map((airport) => (
        <div key={airport.iata} onClick={() => dispatch(setSelectedAirportIata(airport.iata))}>
          <h4>{airport.name} ({airport.iata})</h4>
        </div>
      ))}
    </div>
  );
}