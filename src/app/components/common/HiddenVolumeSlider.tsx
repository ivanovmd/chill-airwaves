import { SpeakerHigh, SpeakerLow, SpeakerNone, SpeakerX } from "@phosphor-icons/react";
import React, { useState } from "react";
import CustomRangeInput from "./CustomRangeInput";
import '../styles/hidden-volume-slider.scss';


interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
  className?: string;
  color?: string;
}

export const HiddenVolumeSlider: React.FC<VolumeSliderProps> = ({ volume, setVolume, className, color = 'white' }) => {
  const [unmuteVolume, setUnmuteVolume] = useState(25);
  const [isHidden, setIsHidden] = useState(true);

  function toggleMute() {
    if (volume === 0) {
      setVolume(unmuteVolume);
    } else {
      setUnmuteVolume(volume);
      setVolume(0);
    }
  }

  function renderSpeaker() {
    if (volume === 0) {
      return <SpeakerX size={28} />
    }

    if (volume < 25) {
      return <SpeakerNone size={28} />
    }

    if (volume < 50 && volume >= 25) {
      return <SpeakerLow size={28} />
    }

    if (volume >= 50) {
      return <SpeakerHigh size={28} />
    }
  }

  return (
    <div className={`volume-slider relative flex items-center ${className} ${isHidden ? 'hidden-slider' : ''}`}
      onMouseOver={() => !isHidden && setIsHidden(false)}
      onMouseLeave={() => setIsHidden(true)}
    >
      <div className="volume-slider-control absolute bg-black/50 backdrop-blur-md">
        <CustomRangeInput
          min={0} max={100} value={volume} onChange={(value) => setVolume(value)} step={1}
          filledTrackColor={color} thumbColor={color} style={{ minWidth: '100px' }} />
      </div>

      <button className="volume-slider-button" onClick={toggleMute}
        onMouseOver={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
      >
        {renderSpeaker()}
      </button>
    </div>
  );
}