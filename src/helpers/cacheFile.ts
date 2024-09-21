import { app, IncomingMessage, net } from 'electron';
import fs from 'fs';
import path from 'path';

export const saveToCache = (fileName: string, destinationFolderPath: string, remoteFileUrl: string): Promise<{ cacheDirPath: string, fileName: string }> => {
  return new Promise((resolve, reject) => {
    console.log(`Saving ${fileName} to cache.`);
    const cachedFilePath = path.join(destinationFolderPath, fileName)

    const request = net.request(remoteFileUrl);

    request.on('response', (response: IncomingMessage) => {
      const fileStream = fs.createWriteStream(cachedFilePath);

      response.on('data', (chunk: Buffer) => {
        fileStream.write(chunk);
      });

      response.on('end', () => {
        fileStream.end();
        console.log(`File ${fileName} saved to ${cachedFilePath}`);
        resolve({ cacheDirPath: destinationFolderPath, fileName: fileName });
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