import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack } from "../store/atc/atsSlice";
import { AtcAnimation } from "./AtcAnimation";
import { AirplaneTakeoff, CircleNotch } from "@phosphor-icons/react";
import { Airport, airports } from "../../settings/liveatc";
import ATCGridBackground from "./ATCGridBackground";


export const AtcRadio = () => {
  const currentAtcTrack = useSelector(getCurrentAtcTrack);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [souerceReady, setSourceReady] = useState(false);
  const dispatch = useDispatch();
  const selectedAirportIata = useSelector(getSelectedAirport);
  const [selectedAirport, setSelectedAirport] = useState<Airport>();

  useEffect(() => {
    setSourceReady(false);
  }, [currentAtcTrack])

  useEffect(() => {
    if (selectedAirportIata) {
      setSelectedAirport(airports.find(airport => airport.iata === selectedAirportIata))
    }
  }, [selectedAirportIata])

  const renderAirportName = () => {
    if (souerceReady) {
      return (
        <div className="flex space-x-2 items-center">
          <AirplaneTakeoff size={28} />
          <h2>{selectedAirport.name}</h2>
        </div>
      )
    } else {
      return (
        <div className="flex space-x-2 items-center">
          <CircleNotch className="rotating" size={28} />
          <p>Connecting...</p>
        </div>
      )
    }
  }


  return (
    <div className="p-10 absolute top-0 right-0 left-0 backdrop-blur-2 backdrop-blur-sm bg-black/50 text-white">
      {/*<h1>ATC Radio</h1>*/}


      <div className="flex space-x-2 flex-row">
        {renderAirportName()}
      </div>

      {currentAtcTrack &&
        <div>
          <audio controls ref={audioElementRef} autoPlay
            src={decodeURI(currentAtcTrack)}
            onCanPlay={() => setSourceReady(true)}
            onEnded={() => dispatch(nextTrack())} hidden
            onError={() => dispatch(nextTrack())}
          >
          </audio>
          {/*<button onClick={() => dispatch(nextTrack())}>next ATC</button>*/}


          <div className="relative" style={{ width: '300px', height: '300px' }}>
            <div className="bg-black/50 overflow-hidden rounded-full">
              <ATCGridBackground />
            </div>

            <AtcAnimation className="absolute top-0 left-0" audioElement={audioElementRef.current} />
          </div>


        </div>
      }
    </div>
  );
}