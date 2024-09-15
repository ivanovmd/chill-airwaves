import { config } from "dotenv";
import { Station } from "../settings/liveatc";
import fs from "fs-extra";
import fetch from "node-fetch";

config({ path: '.env' });

const ATC_BASE_URL = process.env.ATC_BASE_URL;


export function formatAirportPath(airportIcao: string, station: Station) {
  return `${airportIcao}/${station.path}`;
}


export function buildLiveATCUrl(airportUrl: string, offset = 1) {
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

  return `${ATC_BASE_URL}/${airportUrl}-${formattedDate}.mp3`;
}


export async function downloadFile(url: string, dest: string) {
  await fs.ensureDir(dest);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }

  const fileStream = fs.createWriteStream(dest);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}