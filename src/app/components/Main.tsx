import React, { useEffect } from "react";
import { BackgroundImageOverlay } from "./BackgroundImageOverlay";

export const Main: React.FC = () => {
  const [downloadsPath, setDownloadsPath] = React.useState<string | null>(null);

  useEffect(() => {
    window.electronAPI.getDownloadsPath().then((downloadsPath: string) => {
      setDownloadsPath(downloadsPath);
    });
  }, []);

  const getImageSrc = (path: string | null) => {
    if (!path) return '';
    const imagePath = path + '/OIG2 (1).jpeg';
    return `file://${encodeURI(imagePath)}`;
  };


  return (
    <BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />
  );
}   