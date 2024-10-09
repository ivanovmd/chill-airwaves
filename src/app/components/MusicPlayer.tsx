import React, { useContext, useEffect } from "react"
import { SceneLayer } from "./Scene";
import { MusicContext } from "../context/MusicContext";
import { Settings } from "./Settings";
import { AtcRadio } from "./AtcRadio";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, setSelectedAirportIata } from "../store/atc/atsSlice";
import { CircleNotch, DotsThreeCircleVertical, DotsThreeVertical, Pause, PauseCircle, Play, PlayCircle, SkipBack, SkipBackCircle, SkipForward, SkipForwardCircle, SlidersHorizontal, SpeakerHigh, SpeakerLow, SpeakerNone, SpeakerX, SpotifyLogo, Vibrate, YoutubeLogo } from "@phosphor-icons/react";
import { AnimatedTextLine } from "./AnimatedTextLine";
import { AnimatedImage } from "./AminatedImage";
import FadingImage from "./FadingImage";
import { SoundWaves } from "./SoundWaves";
import DancingBars from "./DancingBars";
import CustomRangeInput from "./CustomRangeInput";
import AnimatedRangeInput from "./CustomRangeInput";
import { VolumeSlider } from "./VolumeSlider";

export const MusicPlayer = () => {
  const musicContext = useContext(MusicContext);
  const dispatch = useDispatch();
  const selectedAirport = useSelector(getSelectedAirport)
  const [showVolume, setShowVolume] = React.useState(false);
  const [unmuteVolume, setUnmuteVolume] = React.useState(25);

  if (!musicContext) {
    throw new Error('MusicPlayer must be used within a MusicProvider');
  }

  const { setVolume, nextTrack, playTrack, pauseTrack, previousTrack, volume, videoInfo, isPlayng, isBuffering } = musicContext;


  useEffect(() => {
    dispatch(setSelectedAirportIata('hkg'))
  }, []);


  function handlePlayPause() {
    if (isPlayng) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  function getAutorName(rawAuthorName: string) {
    return rawAuthorName?.replace(" - Topic", "") || '...';
  }


  return (
    <div className="w-screen h-screen bg-cover bg-center absolute top-0 left-0" style={{ backgroundImage: "url('https://cdn.midjourney.com/3e2082dc-d578-463e-b4d4-fadc97b7165b/0_0.png')" }}>
      <SceneLayer name="spotify-player" className="bg-gradient-to-t from-black to-transparent">
        <div className="absolute" style={{ left: '-99999px' }}>
          <div id="youtube-player"></div>
        </div>

        <div className="w-full absolute bottom-5 px-5 flex flex-row justify-center text-white">
          <div className="w-full flex items-center py-4 px-5 min-h-16">
            <div className="flex-1 flex items-center overflow-hidden">
              <div className="flex items-center space-x-2 min-w-0">
                {/*<div className="relative overflow-hidden rounded-full flex-shrink-0" style={{ height: '50px', width: '50px' }}>
                  <img style={{ top: '-18%', height: '135%' }} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" src={videoInfo?.thumbnail_url} alt="" />
                </div>*/}
                <div className="relative">
                  <FadingImage src={videoInfo?.thumbnail_url} alt="" className="music-thumbnail" />
                  <DancingBars className="absolute inset-0 m-auto" isAnimating={isPlayng && !isBuffering} />
                </div>
                <div className="min-w-0">
                  <div className="overflow-hidden truncate min-w-5">
                    <AnimatedTextLine title={videoInfo?.title} id="music-title">{videoInfo?.title || '...'}</AnimatedTextLine>
                  </div>

                  {/*<p title={videoInfo?.title} className="truncate">{videoInfo?.title || '...'}</p>*/}
                  <div className="flex flex-row space-x-1 items-center">
                    {/*<p title={getAutorName(videoInfo?.author_name)} className="truncate">{getAutorName(videoInfo?.author_name)} </p>*/}
                    <div className="overflow-hidden truncate min-w-5">
                      <AnimatedTextLine title={getAutorName(videoInfo?.author_name)} id="music-author">{getAutorName(videoInfo?.author_name)}</AnimatedTextLine>
                    </div>

                    <div style={{ width: '20px', height: '20px' }}>
                      <YoutubeLogo weight="fill" style={{ paddingTop: '3px', paddingLeft: '3px' }} size={20} color="#FF0000" />
                    </div>
                    <div style={{ width: '20px', height: '20px' }}>
                      <SpotifyLogo weight="fill" style={{ paddingTop: '3px' }} size={20} color="#1DB954" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center  space-x-2" style={{ width: 28 * 3 + 'px' }}>
              <div className="flex">
                <button onClick={() => previousTrack()}>
                  <SkipBack weight="fill" size={28} />
                </button>
              </div>

              <div className="flex">
                {isBuffering && !isPlayng ? <CircleNotch className="rotating" size={28} /> :
                  <button onClick={handlePlayPause}>
                    {isPlayng ?
                      <Pause size={28} weight="fill" />
                      :
                      <Play size={28} weight="fill" />
                    }
                  </button>
                }
              </div>

              <div className="flex">
                <button onClick={() => nextTrack()}>
                  <SkipForward weight="fill" size={28} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2">
              <div className={`flex`}>
                {/*<input
                  className="bg-green-700 transition-all duration-300"
                  type="range"
                  min="0" max="100"
                  value={volume} onChange={(e) => setVolume(parseInt(e.target.value))}
                  style={{ accentColor: 'green' }}
                />*/}
                <div style={{ width: '140px' }}>
                  <VolumeSlider className="icon-shadow" volume={volume} setVolume={setVolume} color="#2ebbd6" />
                </div>

              </div>
            </div>
          </div>
        </div>

      </SceneLayer >
    </div>

  )
}