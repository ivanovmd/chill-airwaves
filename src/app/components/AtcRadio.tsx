import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, nextTrack } from "../store/atc/atsSlice";
import { AtcAnimation } from "./AtcAnimation";

export const AtcRadio = () => {
  const currentTrack = useSelector(getCurrentAtcTrack);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [souerceReady, setSourceReady] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>ATC Radio</h1>
      {currentTrack &&
        <div>
          <audio controls ref={audioElementRef} autoPlay
            src={decodeURI(currentTrack)}
            onCanPlay={() => setSourceReady(true)}
            onEnded={() => dispatch(nextTrack())}>
          </audio>
          <button onClick={() => dispatch(nextTrack())}>next ATC</button>
          {souerceReady && <AtcAnimation audioElement={audioElementRef.current} />}


        </div>
      }
    </div>
  );
}