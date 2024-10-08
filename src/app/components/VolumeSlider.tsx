import { SpeakerHigh, SpeakerLow, SpeakerNone, SpeakerX } from "@phosphor-icons/react";
import React, { useState } from "react";
import CustomRangeInput from "./CustomRangeInput";


interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
  className?: string;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume, setVolume, className }) => {
  const [unmuteVolume, setUnmuteVolume] = useState(25);

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
      return <SpeakerX weight="fill" size={28} />
    }

    if (volume < 25) {
      return <SpeakerNone weight="fill" size={28} />
    }

    if (volume < 50 && volume >= 25) {
      return <SpeakerLow weight="fill" size={28} />
    }

    if (volume >= 50) {
      return <SpeakerHigh weight="fill" size={28} />
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      <button onClick={toggleMute} className="mr-2">
        {renderSpeaker()}
      </button>
      <CustomRangeInput
        min={0} max={100} value={volume} onChange={(value) => setVolume(value)} step={1}
        filledTrackColor="bg-green-500" thumbColor="bg-green-500" />
    </div>
  );
}