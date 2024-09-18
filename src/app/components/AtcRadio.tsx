import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentAtcTrack } from "../store/atc/atsSlice";
import { AtcAnimation } from "./AtcAnimation";

export const AtcRadio = () => {
  const currentTrack = useSelector(getCurrentAtcTrack);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [souerceReady, setSourceReady] = useState(false);

  return (
    <div>
      <h1>ATC Radio</h1>
      {currentTrack &&
        <div>
          <audio controls ref={audioElementRef} autoPlay src={decodeURI(currentTrack)} onCanPlay={() => setSourceReady(true)}></audio>

          {souerceReady && <AtcAnimation audioElement={audioElementRef.current} />}
        </div>
      }
    </div>
  );
}