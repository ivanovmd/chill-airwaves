import React, { useEffect } from "react";
import { MusicProvider } from "../context/MusicContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Player } from "./screens/Player";
import { AppLoader } from "./screens/AppLoader";
import { Login } from "./screens/Login";
import { ModalProvider } from "../context/ModalContext";
import { openExternalLink } from "../../helpers/openExternalLink";
import { PersistGate } from "redux-persist/integration/react";

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


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MusicProvider>
          {googleClientId && <GoogleOAuthProvider clientId={googleClientId}>
            {/*<BackgroundImageOverlay backgroundImageUrl="image://alaska.png" />*/}
            <ModalProvider>
              <BrowserRouter>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Player />} />
                    <Route path="/auth" element={<Login />} />
                  </Routes>
                </AnimatePresence>
              </BrowserRouter>

              <div className="powered-by absolute bottom-2 right-2 text-white text-sm">
                <a href="https://www.liveatc.net/" onClick={(e) => openExternalLink("https://www.liveatc.net/", e)} className="flex space-x-2">
                  <span>Powered by:</span>
                  <img src="https://img.liveatc.net/LiveATC-400.gif" alt="" className="rounded-md h-5" />
                </a>
              </div>

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
            </ModalProvider>
          </GoogleOAuthProvider>}
        </MusicProvider>
      </PersistGate>
    </Provider>
  );
}   