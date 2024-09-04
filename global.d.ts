
interface Window {
  electronAPI: {
    getDownloadsPath: () => Promise<string>;
  };
}


