import { app, IncomingMessage, net } from 'electron';
import fs from 'fs';

export const saveToCache = (fileName: string, baseUrl: string): Promise<{ cacheDirPath: string, fileName: string }> => {
  return new Promise((resolve, reject) => {
    console.log(`Saving ${fileName} to cache.`);
    const cachePath = app.getPath('downloads');
    const folderName = 'chill-airwaves-cache';

    // Ensure the cache directory exists
    const cacheDir = `${cachePath}/${folderName}`;
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    const request = net.request(baseUrl + fileName);

    request.on('response', (response: IncomingMessage) => {
      const filePath = `${cacheDir}/${fileName}`;
      const fileStream = fs.createWriteStream(filePath);

      response.on('data', (chunk: Buffer) => {
        fileStream.write(chunk);
      });

      response.on('end', () => {
        fileStream.end();
        console.log(`File ${fileName} saved to ${filePath}`);
        resolve({ cacheDirPath: cacheDir, fileName: fileName });
      });

      response.on('error', (error: Error) => {
        console.error(`Error saving file: ${error}`);
        fileStream.end();
        reject(error);
      });
    });

    request.on('error', (error) => {
      console.error(`Request error: ${error}`);
      reject(error);
    });

    request.end();
  });
}