import React, { useEffect } from "react";
import { BackgroundImageOverlay } from "./BackgroundImageOverlay";
import { MusicPlayer } from "./MusicPlayer";

export const Main: React.FC = () => {
  const [downloadsPath, setDownloadsPath] = React.useState<string | null>(null);

  useEffect(() => {
    window.electronAPI.getDownloadsPath().then((downloadsPath: string) => {
      setDownloadsPath(downloadsPath);
    });
  }, []);

  return (
    <div>

      <BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />
      <MusicPlayer />
    </div>

  );
}   