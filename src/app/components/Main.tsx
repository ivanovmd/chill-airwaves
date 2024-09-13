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
      <GoogleOAuthProvider clientId="811044986765-tgeej8rcva7l1kgjq6mqfsl6ba41khto.apps.googleusercontent.com">
        <BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />
        <MusicPlayer />

        <br />

        <Login />
      </GoogleOAuthProvider>
    </MusicProvider>

  );
}   