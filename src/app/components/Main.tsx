import React, { useEffect } from "react";
import { MusicProvider } from "../context/MusicContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../store";
import { TestLayout } from "./TestLayout";
import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MusicPlayer } from "./MusicPlayer";
import toast, { Toaster } from "react-hot-toast";
import { XCircle } from "@phosphor-icons/react";
import { Player } from "./screens/Player";
import { AppLoader } from "./screens/AppLoader";
import { Login } from "./screens/Login";

export const Main: React.FC = () => {
  const [downloadsPath, setDownloadsPath] = React.useState<string | null>(null);
  const [googleClientId, setGoogleClientId] = React.useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = React.useState<boolean>(true);

  useEffect(() => {
    window.electronAPI.getEnv('GOOGLE_CLIENT_ID').then((googleClientId: string) => {
      console.log(googleClientId);
      setGoogleClientId(googleClientId);
    });

    setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
  }, []);


  if (isInitialLoading) {
    return <AppLoader />;
  }


  return (
    <Provider store={store}>
      <MusicProvider>
        {googleClientId && <GoogleOAuthProvider clientId={googleClientId}>
          {/*<BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />*/}

          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Player />} />
                <Route path="/auth" element={<Login />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>

          <Toaster
            position="bottom-right"
            reverseOrder={false}
            containerClassName="notification-container"

            toastOptions={{
              className: 'notification',
              style: {
                padding: 0,
                margin: 0,
              }
            }}
          />
        </GoogleOAuthProvider>}
      </MusicProvider>
    </Provider>
  );
}   