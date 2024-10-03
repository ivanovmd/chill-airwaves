import React, { useEffect } from "react";
import { BackgroundImageOverlay } from "./BackgroundImageOverlay";
import { MusicPlayer } from "./MusicPlayer";
import { MusicProvider } from "../context/MusicContext";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Login } from "./Login";
import { Settings } from "./Settings";
import { Provider } from "react-redux";
import { store } from "../store";
import { AtcRadio } from "./AtcRadio";

export const Main: React.FC = () => {
  const [downloadsPath, setDownloadsPath] = React.useState<string | null>(null);
  const [googleClientId, setGoogleClientId] = React.useState<string | null>(null);


  useEffect(() => {
    window.electronAPI.getEnv('GOOGLE_CLIENT_ID').then((googleClientId: string) => {
      console.log(googleClientId);

      setGoogleClientId(googleClientId);
    });
  }, []);



  return (
    <Provider store={store}>
      <MusicProvider>
        {googleClientId && <GoogleOAuthProvider clientId={googleClientId}>
          {/*<BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />*/}
          <MusicPlayer />
          {/*<AtcRadio />*/}
          {/*<Settings />*/}
        </GoogleOAuthProvider>}
      </MusicProvider>
    </Provider>
  );
}   