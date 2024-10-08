import { Airport, Station } from "../settings/liveatc";


export function formatAirportPath(airportIcao: string, station: Station) {
  return `${airportIcao}/${station.path}`;
}

export function buildLiveATCUrl(ATC_BASE_URL: string, airport: Airport, offset = 1) {
  if (!Number.isInteger(offset) || offset < 1) {
    throw new Error("Offset must be a positive integer");
  }

  const now = new Date();

  // Subtract (offset * 30) minutes to get the desired timeframe
  now.setUTCMinutes(now.getUTCMinutes() - (offset * 30));

  // Round down to the nearest 30-minute interval
  const minutes = now.getUTCMinutes();
  const roundedMinutes = minutes < 30 ? "00" : "30";
  now.setUTCMinutes(minutes < 30 ? 0 : 30);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);

  // Format the date and time
  const year = now.getUTCFullYear();
  const month = now.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");

  const formattedDate = `${month}-${day}-${year}-${hours}${roundedMinutes}Z`;

  return `${ATC_BASE_URL}${airport.icao}/${airport.stations[0].path}-${formattedDate}.mp3`;
}
