import { app, net } from "electron";
import fs from "fs";

export const saveToCache = (fileName: string, baseUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(`Saving ${fileName} to cache.`);
    const cachePath = app.getPath('downloads');
    const request = net.request(baseUrl + fileName);

    request.on("response", (response) => {
      const filePath = `${cachePath}/${encodeURIComponent(fileName)}`;
      const fileStream = fs.createWriteStream(filePath);

      response.on('data', (chunk) => {
        fileStream.write(chunk);
      });

      response.on('end', () => {
        fileStream.end();
        console.log(`File ${fileName} saved to cache.`);
        resolve();
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