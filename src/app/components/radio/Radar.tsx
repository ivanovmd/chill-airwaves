import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, nextTrack, getCurrentAtcTrack } from "../../store/atc/atsSlice";
import ATCGridSquare from "./ATCGridSquare";
import { AtcAnimation } from "./AtcAnimation";
import { HiddenVolumeSlider } from "../common/HiddenVolumeSlider";
import LiveUTCClock from "../common/LiveUTCClock";
import { Airport, airports } from "../../../settings/liveatc";

interface RadarProps {
  airport: Airport;
  atcSource: string;
  onTrackEnd: () => void;
  onTrackError: () => void;
  onPaused: () => void;
  onCanPlay?: () => void;
  onLoadStart?: () => void;
  accentColors?: {
    primary: string;
    secondary: string;
  };
}

export const Radar: React.FC<RadarProps> = ({ airport, atcSource, onTrackEnd, onTrackError, onPaused, onCanPlay, onLoadStart, accentColors }) => {
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

    <div id="radar-container" className="flex-grow relative" style={{ maxHeight: '300px' }}>
      <audio controls ref={audioElementRef} autoPlay
        src={decodeURI(atcSource)}
        onLoadStart={onLoadStart}
        //onLoad={onCanPlay}
        onCanPlay={onCanPlay && onCanPlay}
        onEnded={onTrackEnd && onTrackEnd}
        onError={onTrackError && onTrackError}
        onPause={onPaused && onPaused}
        hidden
      >
      </audio>

      <div id="radar" className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl" style={{ color: "#ddb112" }}>
        <ATCGridSquare color="#ddb112" />

        {atcSource &&
          <AtcAnimation color="#ddb112" className="absolute top-0 left-0" audioElement={audioElementRef?.current} />
        }

        <div className="absolute top-4 right-4">
          <HiddenVolumeSlider volume={volume} setVolume={handleVolumeChange} color="#ddb112" />
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