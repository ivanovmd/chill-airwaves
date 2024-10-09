import React, { useEffect, useRef, useState } from "react";
import { Gear, AirplaneTakeoff, CaretDown, Pause, SkipBack, SkipForward, SpeakerHigh, YoutubeLogo, SpotifyLogo } from "@phosphor-icons/react";
import ATCGridSquare from "./ATCGridSquare";
import VinylRecord from "./VinylRecord";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack, setSelectedAirportIata } from "../store/atc/atsSlice";
import { Airport, airports } from "../../../src/settings/liveatc";
import { AtcAnimation } from "./AtcAnimation";
import { VolumeSlider } from "./VolumeSlider";
import { HiddenVolumeSlider } from "./HiddenVolumeSlider";

export const TestLayout = () => {
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

  useEffect(() => {
    dispatch(setSelectedAirportIata('hkg'))
  }, []);

  return (
    <div className="h-screen w-full text-white bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('https://cdn.midjourney.com/44ba2194-1804-48c2-bf2f-6ee652c1fab8/0_0.png')" }}>

      <audio controls ref={audioElementRef} autoPlay
        src={decodeURI(currentAtcTrack)}
        onCanPlay={() => setSourceReady(true)}
        onEnded={() => dispatch(nextTrack())} hidden
        onError={() => dispatch(nextTrack())}
      >
      </audio>

      <div className="flex-grow flex relative flex-col bg-gradient-to-t from-black to-transparent p-20 overflow-hidden  backdrop-blur-sm">

        <button className="text-center space-x-2 mb-6 text-xl">
          <span><AirplaneTakeoff className="inline" size={28} /></span>
          <span>Hong Kong International Airport</span>
          <span><CaretDown className="inline" size={18} /></span>
        </button>


        <button className="absolute top-4 right-4">
          <Gear size={28} />
        </button>

        <div id="radar-container" className="flex-grow relative">
          <div id="radar" className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl" style={{ color: "#06b6d4" }}>
            <ATCGridSquare color="#06b6d4" />

            <AtcAnimation color="#06b6d4" className="absolute top-0 left-0" audioElement={audioElementRef.current} />

            <button className="absolute top-4 right-4">
              <HiddenVolumeSlider volume={volume} setVolume={setVolume} color="#06b6d4" />
            </button>

            <button className="absolute top-4 left-4 flex items-center space-x-1">
              <div>HKG</div>
            </button>

            <div className="absolute bottom-4 left-4 text-xs">
              <p>Hong Kong, Hong Kong</p>
            </div>

            <div className="absolute bottom-4 right-4 text-xs">
              <p>Local Time: 21:12:23</p>
            </div>
          </div>
        </div>

        <div id="player-container" className="mt-10 w-full flex space-x-4">
          <VinylRecord size={100}>
            <img src="https://cdn.midjourney.com/d25336d0-bc3b-40a3-8aba-33b2e607a5cc/0_0.png" alt="" className="w-full h-full object-cover" />
          </VinylRecord>

          <div id="track-info" className="flex-grow space-y-1">
            <p>This is a sunny track</p>
            <div className="flex space-x-2">
              <p className="text-sm text-gray-300">By: John Doe</p>
              <YoutubeLogo size={20} color="#FF0000" weight="fill" />
              <SpotifyLogo size={20} color="#1DB954" weight="fill" />
            </div>

            <div className="flex justify-between pt-1">
              <div className="flex space-x-2">
                <SkipBack size={28} />
                <Pause size={28} />
                <SkipForward size={28} />
              </div>


              <HiddenVolumeSlider volume={volume} setVolume={setVolume} color="#06b6d4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}