import fs from "fs-extra"
import { config } from "dotenv";
import { removeSilence } from "../helpers/silenceRemover";
import { removeFromCache } from "../helpers/removeCacheFile";
import { app, net } from "electron";
import path from "path";
import { CacheService } from "../services/cacheService";


const ATC_PROTOCOL = 'atc'

config({ path: '.env' });


export async function fileResponse(filePath: string): Promise<Response> {
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

function cleanUpCache(cacheDirPath: string, fileName: string) {
  console.log(`Cleaning up cache for ${fileName}`);
  removeFromCache(path.join(cacheDirPath, fileName))
}

export const atcProtocolHandler = async (request: GlobalRequest) => {
  const ATC_BASE_URL = process.env.ATC_BASE_URL;
  const remoteFilePath = request.url.substr(ATC_PROTOCOL.length + 3)
  const remoteFileUrl = `${ATC_BASE_URL}${remoteFilePath}`

  const fileName = remoteFilePath.split('/').pop();
  const cacheFolderPath = path.join(app.getPath('downloads'), 'chill-airwaves-cache');

  const cacheService = new CacheService(cacheFolderPath, fs, app, path, net);

  const fileExtension = path.extname(fileName);
  const baseName = path.basename(fileName, fileExtension);
  const reducedSilenceFileName = `${baseName}-reduced-silence${fileExtension}`;
  const reducedSilenceFilePath = path.join(cacheFolderPath, reducedSilenceFileName);

  // Check if the file is already cached
  if (cacheService.isAvailable(reducedSilenceFilePath)) {
    return fileResponse(reducedSilenceFilePath);
  }

  try {
    const { cacheFilePath } = await cacheService.download(remoteFileUrl);
    await removeSilence(cacheFilePath, reducedSilenceFilePath)
    removeFromCache(cacheFilePath);
  } catch (error) {
    return new Response('Error saving file to cache', { status: 500 });
  }



  return fileResponse(reducedSilenceFilePath);
}