import React, { useEffect } from "react";
import { airports } from "../../settings/liveatc";

export const Settings = () => {
  const [selectedAirport, setSelectedAirport] = React.useState<string | null>(null);

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
        <div key={airport.iata} onClick={() => setSelectedAirport(airport.iata)}>
          <h4>{airport.name} ({airport.iata})</h4>
        </div>
      ))}
    </div>
  );
}