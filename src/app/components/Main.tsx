import React, { useEffect } from "react";
import { BackgroundImageOverlay } from "./BackgroundImageOverlay";
import { MusicPlayer } from "./MusicPlayer";
import { MusicProvider } from "../context/MusicContext";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Login } from "./Login";

export const Main: React.FC = () => {
  const [downloadsPath, setDownloadsPath] = React.useState<string | null>(null);


  useEffect(() => {
    window.electronAPI.getDownloadsPath().then((downloadsPath: string) => {
      setDownloadsPath(downloadsPath);
    });
  }, []);



  return (
    <MusicProvider>
      <GoogleOAuthProvider clientId="">
        <BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />
        <MusicPlayer />

        <br />

        <Login />
      </GoogleOAuthProvider>
    </MusicProvider>

  );
}   