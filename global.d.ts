
interface Window {
  electronAPI: {
    getDownloadsPath: () => Promise<string>;
  };
  YT: any;
  onYouTubeIframeAPIReady: () => void;
}


