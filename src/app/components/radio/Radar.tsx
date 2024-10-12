import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, nextTrack, getCurrentAtcTrack } from "../../store/atc/atsSlice";
import ATCGridSquare from "./ATCGridSquare";
import { AtcAnimation } from "./AtcAnimation";
import { HiddenVolumeSlider } from "../HiddenVolumeSlider";
import LiveUTCClock from "../LiveUTCClock";
import { Airport, airports } from "../../../settings/liveatc";

interface RadarProps {
  airport: Airport;
  atcSource: string;
  onTrackEnd: () => void;
  onTrackError: () => void;
  onPaused: () => void;
}

export const Radar: React.FC<RadarProps> = ({ airport, atcSource, onTrackEnd, onTrackError, onPaused }) => {
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(20);

  const handleVolumeChange = (value: number) => {
    if (audioElementRef.current) {
      setVolume(value);
      audioElementRef.current.volume = value / 100;
    }
  }

  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume / 100;
    }
  }, [volume])

  useEffect(() => {
    if (audioElementRef.current) {
      handleVolumeChange(volume)
    }
  }, [audioElementRef])

  return (

    <div id="radar-container" className="flex-grow relative">
      <audio controls ref={audioElementRef} autoPlay
        src={decodeURI(atcSource)}
        onCanPlay={console.log}
        onEnded={onTrackEnd}
        onError={onTrackError}
        onPause={onPaused}
        //onEnded={() => dispatch(nextTrack())}
        //onError={() => dispatch(nextTrack())}
        hidden
      >
      </audio>

      <div id="radar" className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl" style={{ color: "#ca3b6b" }}>
        <ATCGridSquare color="#ca3b6b" />

        {atcSource &&
          <AtcAnimation color="#ca3b6b" className="absolute top-0 left-0" audioElement={audioElementRef?.current} />
        }

        <div className="absolute top-4 right-4">
          <HiddenVolumeSlider volume={volume} setVolume={handleVolumeChange} color="#ca3b6b" />
        </div>

        <div className="absolute top-4 left-4 flex items-center space-x-1 uppercase">
          <div>{airport?.iata}</div>
        </div>

        <div className="absolute bottom-4 left-4 text-xs">
          <p>{airport?.location.city}, {airport?.location.country}</p>
        </div>

        <div className="absolute bottom-4 right-4 text-xs">
          <p>Local Time: <LiveUTCClock utcOffset={airport?.location?.UTC} /></p>
        </div>
      </div>
    </div>
  )
}