import React, { useEffect, useState } from "react";
import VinylRecord from "./VinylRecord";
import FadingImage from "../common/FadingImage";
import ScrollingContainer from "../ScrollingContainer";
import { AnimatedTextLine } from "../common/AnimatedTextLine";
import { CircleNotch, Pause, Play, SkipBack, SkipForward, SpotifyLogo, YoutubeLogo } from "@phosphor-icons/react";
import { HiddenVolumeSlider } from "../common/HiddenVolumeSlider";
import 'animate.css';


interface MusicPlayerProps {
  onPause: () => void;
  onPlay: () => void;
  onNextTrack: () => void;
  onPreviousTrack: () => void;
  onVolumeChange: (volume: number) => void;
  imageUrl: string;
  trackName: string;
  authorName: string;
  spotifyLink: string;
  youtubeLink: string;
  isPlaying: boolean;
  isBuffering: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onPause, onPlay, onNextTrack, onPreviousTrack, onVolumeChange, imageUrl, trackName, authorName, spotifyLink, youtubeLink, isBuffering, isPlaying }) => {
  const [volume, setVolume] = useState(50);
  const [play, setPlay] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    onVolumeChange(value);
  }

  const handlePlayResume = () => {
    if (play) {
      onPause();
    } else {
      onPlay();
    }
    setPlay(!play);
  }

  useEffect(() => {
    setShowSocials(false);
  }, [authorName])


  return (
    <div id="player-container" className="mt-10 w-full flex space-x-4 items-center">
      <div className="absolute" style={{ left: '-99999px' }} hidden>
        <div id="youtube-player"></div>
      </div>

      <div className="flex-shrink-0">
        <VinylRecord isPlaying={isPlaying} size={100}>
          <FadingImage src={imageUrl} alt="" className="w-full h-full object-cover" />
        </VinylRecord>
      </div>

      <div id="track-info" className="space-y-1 flex-1 min-w-0">
        <div>
          <ScrollingContainer speed={0.05} pauseDuration={1000} initialDelay={1000}>
            <AnimatedTextLine id="track-name">
              {trackName}
            </AnimatedTextLine>
          </ScrollingContainer>
        </div>


        <div className="flex space-x-2 items-center max-w-full">
          <div className="text-sm text-gray-300 min-w-0">
            <ScrollingContainer speed={0.05} pauseDuration={1000} initialDelay={1000}>
              <AnimatedTextLine onAnimationEnd={() => setShowSocials(true)} id="author-name">
                {authorName}
              </AnimatedTextLine>
            </ScrollingContainer>
          </div>

          <div className="flex-shrink-0">
            <a hidden={!showSocials} className="animate__animated animate__faster animate__fadeIn" href={youtubeLink} target="_blank"><YoutubeLogo size={20} color="#FF0000" weight="fill" /></a>
          </div>

          <div className="flex-shrink-0">
            <a hidden={!showSocials} className="animate__animated animate__faster animate__fadeIn animate__delay-015s" href={spotifyLink} target="_blank"><SpotifyLogo size={20} color="#1DB954" weight="fill" /></a>
          </div>
        </div>

        <div className="flex justify-between pt-1 w-full">
          <div className="flex space-x-2">
            <button onClick={onPreviousTrack}><SkipBack size={28} /></button>

            <button onClick={handlePlayResume}>
              {isBuffering && !isPlaying ? <CircleNotch className="rotating" size={28} /> : isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>

            <button onClick={onNextTrack}><SkipForward size={28} /></button>
          </div>

          <HiddenVolumeSlider volume={volume} setVolume={handleVolumeChange} color="#ca3b6b" className="ml-2" />
        </div>
      </div>
    </div>
  );
}