import React, { useEffect } from "react";
import { BackgroundImageOverlay } from "./BackgroundImageOverlay";
import { MusicPlayer } from "./MusicPlayer";
import { MusicProvider } from "../context/MusicContext";

export const Main: React.FC = () => {
  const [downloadsPath, setDownloadsPath] = React.useState<string | null>(null);

  useEffect(() => {
    window.electronAPI.getDownloadsPath().then((downloadsPath: string) => {
      setDownloadsPath(downloadsPath);
    });
  }, []);

  return (
    <MusicProvider>
      <BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />
      <MusicPlayer />
    </MusicProvider>

  );
}   