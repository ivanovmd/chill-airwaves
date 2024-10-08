import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack } from "../store/atc/atsSlice";
import { AtcAnimation } from "./AtcAnimation";
import { AirplaneTakeoff, CircleNotch } from "@phosphor-icons/react";
import { Airport, airports } from "../../settings/liveatc";
import ATCGridSquare from "./ATCGridSquare";
import LiveUTCClock from "./LiveUTCClock";
import { VolumeSlider } from "./VolumeSlider";


export const AtcRadio = () => {
  const currentAtcTrack = useSelector(getCurrentAtcTrack);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [souerceReady, setSourceReady] = useState(false);
  const dispatch = useDispatch();
  const selectedAirportIata = useSelector(getSelectedAirport);
  const [selectedAirport, setSelectedAirport] = useState<Airport>();
  const [volume, setVolume] = useState(50);

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
          <AirplaneTakeoff size={28} className="icon-shadow" />
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

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioElementRef.current) {
      audioElementRef.current.volume = value / 100;
    }
  }

  return (
    <div className="p-10 space-x-10 items-center 
                    flex absolute rounded-3xl top-1/2 left-1/2 
                    transform -translate-x-1/2 -translate-y-1/2 
                     text-white shadow-md text-nowrap">
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


          <div className="relative" style={{ width: '300px', height: '180px' }}>
            {/*<div className="bg-black overflow-hidden rounded-full">
              <ATCGridBackground />
            </div>*/}

            <div className="h-full w-full bg-black/50 rounded-full">
              <ATCGridSquare />
            </div>


            <AtcAnimation className="absolute top-0 left-0" audioElement={audioElementRef.current} />
          </div>
        </div>
      }


      <div className="space-y-2 text-shadow">
        <div className="flex space-x-2 flex-row ">
          {renderAirportName()}
        </div>

        <div>
          <p>
            IATA: {(selectedAirport?.iata.toUpperCase())} - ICAO: {selectedAirport?.icao.toUpperCase()}
          </p>
        </div>

        <div className="flex text-shadow">
          <p>Location: {selectedAirport?.location?.city}, {selectedAirport?.location?.country}</p>
          {selectedAirport?.location?.state && <p>{selectedAirport?.location?.state}</p>}
        </div>

        <div className="flex text-shadow">
          <p>Local Time:  <LiveUTCClock utcOffset={selectedAirport?.location?.UTC} /></p>
        </div>


        <div>
          <div style={{ width: '140px' }}>
            <VolumeSlider className="icon-shadow" volume={volume} setVolume={handleVolumeChange} />
          </div>
        </div>
      </div>

    </div>
  );
}