import { App, Net, IncomingMessage } from "electron";
import { PlatformPath } from "path";

type Fs = typeof import('fs');


interface CachedFileDownloadResponse {
  cacheDirPath: string;
  fileName: string;
  cacheFilePath: string;
}


export class CacheService {
  defaultLocation: string;
  fs: Fs;
  app: App;
  path: PlatformPath;
  net: Net

  constructor(defaultLocation: string, fs: Fs, app: App, path: PlatformPath, net: Net) {
    this.fs = fs;
    this.app = app;
    this.path = path;
    this.net = net;

    if (!this.fs.existsSync(defaultLocation)) {
      this.fs.mkdirSync(defaultLocation);
    }

    this.defaultLocation = defaultLocation;
  }

  isAvailable(assetName: string): boolean {
    const filePath = this.buildFilePath(assetName);
    return this.fs.existsSync(filePath);
  }

  async download(remoteUrl: string, assetName?: string): Promise<CachedFileDownloadResponse> {
    const request = this.net.request(remoteUrl);

    if (!assetName) {
      assetName = remoteUrl.split('/').pop();
    }

    const cachedFilePath = await this.buildFilePath(assetName);

    return new Promise((resolve, reject) => {
      request.on('response', (response: IncomingMessage) => {
        const fileStream = this.fs.createWriteStream(cachedFilePath);

        response.on('data', (chunk: Buffer) => {
          fileStream.write(chunk);
        });

        response.on('end', () => {
          fileStream.end();
          console.log(`File ${assetName} saved to ${cachedFilePath}`);
          resolve({
            cacheDirPath: this.defaultLocation,
            fileName: assetName,
            cacheFilePath: cachedFilePath
          });
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
    })
  }

  get(assetName: string): string {
    return this.buildFilePath(assetName);
  }

  async set(assetName: string): Promise<void> {
    console.log(assetName);
  }

  async remove(assetName: string): Promise<void> {
    const filePath = this.buildFilePath(assetName);
    this.fs.unlinkSync(filePath);
  }

  buildFilePath(assetName: string): string {
    return this.path.join(this.defaultLocation, assetName);
  }
}