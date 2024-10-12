import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack } from "../../store/atc/atsSlice";
import { AtcAnimation } from "./AtcAnimation";
import { AirplaneTakeoff, CircleNotch } from "@phosphor-icons/react";
import { Airport, airports } from "../../../settings/liveatc";
import ATCGridSquare from "./ATCGridSquare";
import LiveUTCClock from "../LiveUTCClock";
import { VolumeSlider } from "../VolumeSlider";
import ATCGridBackground from "./ATCGridBackground";
import VinylRecord from "../musicPlayer/VinylRecord";


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

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioElementRef.current) {
      audioElementRef.current.volume = value / 100;
    }
  }

  return (
    <div className="p-2 space-x-10 items-center flex absolute 
                    rounded-full top-1/2 left-1/2 transform 
                    -translate-x-1/2 -translate-y-1/2 backdrop-blur-2 
                    backdrop-blur-sm bg-black/50 text-white shadow-md text-nowrap text-center">

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
            {/*<div className="bg-black overflow-hidden rounded-full">
              <ATCGridBackground color="#2ebbd6" />
            </div>*/}

            <div className="h-full w-full bg-black/50 rounded-full">
              <ATCGridSquare />
            </div>


            <AtcAnimation className="absolute top-0 left-0" audioElement={audioElementRef.current} />
          </div>
        </div>
      }


      <div className="space-y-1.5 text-center">
        <div className="flex space-x-2 flex-row">
          {renderAirportName()}
        </div>

        <div>
          <p>
            IATA: {(selectedAirport?.iata.toUpperCase())} - ICAO: {selectedAirport?.icao.toUpperCase()}
          </p>
        </div>

        <div>
          <p>Location: {selectedAirport?.location?.city}, {selectedAirport?.location?.country}</p>
          {selectedAirport?.location?.state && <p>{selectedAirport?.location?.state}</p>}
        </div>

        <div>
          <p>Local Time:  <LiveUTCClock style={{ color: '#2ebbd6' }} utcOffset={selectedAirport?.location?.UTC} /></p>
        </div>


        <div className="flex flex-row items-center justify-center">
          <div style={{ width: '140px' }}>
            <VolumeSlider className="icon-shadow" volume={volume} setVolume={handleVolumeChange} color="#2ebbd6" />
          </div>
        </div>

      </div>

      <VinylRecord size={300} >
        <img src="https://cdn.midjourney.com/d25336d0-bc3b-40a3-8aba-33b2e607a5cc/0_0.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </VinylRecord>
    </div>
  );
}