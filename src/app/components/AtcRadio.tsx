import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack } from "../store/atc/atsSlice";
import { AtcAnimation } from "./AtcAnimation";
import { AirplaneTakeoff, CircleNotch } from "@phosphor-icons/react";
import { SoundWaves } from './SoundWaves';
import DancingBars from "./DancingBars";

export const AtcRadio = () => {
  const currentAtcTrack = useSelector(getCurrentAtcTrack);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [souerceReady, setSourceReady] = useState(false);
  const dispatch = useDispatch();
  const selectedAirport = useSelector(getSelectedAirport);

  return (
    <div className="p-10 absolute top-0 left-0 backdrop-blur-2 backdrop-blur-sm bg-black/50 text-white">
      <h1>ATC Radio</h1>

      <div className="flex space-x-2 flex-row items-center">
        {/*<AirplaneTakeoff size={28} />*/}
        <CircleNotch className="rotating" size={28} />
        <p>Connecting...</p>
        {/*<h2>{selectedAirport}</h2>*/}
      </div>

      {currentAtcTrack &&
        <div>
          <audio controls ref={audioElementRef} autoPlay
            src={decodeURI(currentAtcTrack)}
            onCanPlay={() => setSourceReady(true)}
            onEnded={() => dispatch(nextTrack())} hidden>
          </audio>
          <button onClick={() => dispatch(nextTrack())}>next ATC</button>

          {souerceReady &&
            <div style={{ width: '400px', height: '200px' }}>
              <AtcAnimation audioElement={audioElementRef.current} />
            </div>
          }
        </div>
      }
    </div>
  );
}