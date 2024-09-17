import React from "react";
import { useSelector } from "react-redux";
import { getCurrentAtcTrack } from "../store/airports/airportsSlice";

export const AtcRadio = () => {
  const currentTrack = useSelector(getCurrentAtcTrack);

  return (
    <div>
      <h1>ATC Radio</h1>
      {currentTrack &&

        <audio controls autoPlay>
          <source src={currentTrack} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>}
    </div>
  );
}