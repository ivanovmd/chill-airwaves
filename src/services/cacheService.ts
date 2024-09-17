export class CacheService {
  defaultLocation: string;
  constructor(defaultLocation: string) {
    this.defaultLocation = defaultLocation;
  }

  isAvailable(assetName: string) {
    return assetName;
  }
  download(url: string) {
    return url;
  }
  get(assetName: string) {
    return assetName;
  }
  set(assetName: string) {
    return assetName;
  }
}