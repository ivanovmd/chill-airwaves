import React, { useEffect } from "react";

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
    <div>
      <h1>React App</h1>

      <img src="image://alaska.png" alt="" />
    </div>
  );
}   