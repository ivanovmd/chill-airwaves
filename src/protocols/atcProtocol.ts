import { app, net } from "electron"
import path from "path"
import fs from "fs-extra"
import { saveToCache } from "../helpers/cacheFile"
import { config } from "dotenv";


const ATC_PROTOCOL = 'atc'

config({ path: '.env' });


export const atcProtocolHandler = async (request: GlobalRequest) => {
  const fileUrl = request.url.substr(ATC_PROTOCOL.length + 3)
  const fileName = encodeURIComponent(fileUrl)
  const ATC_BASE_URL = process.env.ATC_BASE_URL;

  const filePath = await saveToCache(fileName, ATC_BASE_URL)

  try {
    // Ensure the file exists and read it into a buffer
    const fileBuffer = await fs.promises.readFile(filePath);
    const fileStats = await fs.promises.stat(filePath);

    // Set headers like 'Content-Type' and 'Content-Length'
    const headers = {
      'Content-Type': 'audio/mpeg', // Or 'audio/wav' for WAV files
      'Content-Length': fileStats.size.toString(),
    };

    // Return the file buffer in the response
    return new Response(fileBuffer, {
      status: 200,
      headers: headers
    });
  } catch (error) {
    // Return a 404 if the file does not exist or any other error occurs
    return new Response('File not found', { status: 404 });
  }
}