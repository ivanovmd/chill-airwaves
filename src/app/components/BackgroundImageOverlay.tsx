import React from "react";
import { SceneLayer } from "./Scene";

interface BackgroundImageOverlayProps {
  children?: React.ReactNode;
  backgroundImageUrl?: string;
}


export const BackgroundImageOverlay: React.FC<BackgroundImageOverlayProps> = ({ children, backgroundImageUrl }) => {
  return (
    <SceneLayer name="background-image-overlay">
      {/*<img className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" src={backgroundImageUrl} alt="" />*/}
      <div className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" style={{ backgroundImage: backgroundImageUrl }}>
        {children}
      </div>

    </SceneLayer>
  );
}