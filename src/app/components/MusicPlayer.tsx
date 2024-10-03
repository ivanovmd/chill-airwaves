import React, { useContext, useEffect } from "react"
import { SceneLayer } from "./Scene";
import { MusicContext } from "../context/MusicContext";
import { Settings } from "./Settings";
import { AtcRadio } from "./AtcRadio";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, setSelectedAirportIata } from "../store/atc/atsSlice";
import { DotsThreeCircleVertical, DotsThreeVertical, Pause, PauseCircle, Play, PlayCircle, SkipBack, SkipBackCircle, SkipForward, SkipForwardCircle, SlidersHorizontal, SpeakerHigh } from "@phosphor-icons/react";

export const MusicPlayer = () => {
  const musicContext = useContext(MusicContext);
  const dispatch = useDispatch();
  const selectedAirport = useSelector(getSelectedAirport)
  const [showVolume, setShowVolume] = React.useState(false);

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


  return (
    <SceneLayer name="spotify-player">
      <div className="absolute" style={{ left: '-99999px' }}>
        {/*<div className="">*/}
        <div id="youtube-player"></div>
      </div>

      {/*<div className="grid grid-cols-2">*/}
      <div>
        <div>
          <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} />
        </div>


        <div className="flex">
          <div>
            <div className="relative overflow-hidden rounded-full" style={{ height: '50px', width: '50px' }}>
              <img style={{ top: '-18%', height: '135%' }} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" src={videoInfo?.thumbnail_url} alt="" />
            </div>
          </div>

          <div style={{ minWidth: '400px' }}>
            <div>
              <p>{videoInfo?.title || '...'}</p>
            </div>
            <div>
              <p>{videoInfo?.author_name.replace(" - Topic", "") || '...'}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex">
              <button onClick={() => previousTrack()}>
                {/*<SkipBack size={38}  />*/}
                <SkipBackCircle size={38} />
              </button>
            </div>

            <div className="flex">
              <button onClick={handlePlayPause}>
                {isPlayng ?
                  //<Pause size={38}  />
                  <PauseCircle size={38} />
                  :
                  //<Play size={38}  />
                  <PlayCircle size={38} />


                }
              </button>
            </div>

            <div className="flex">
              <button onClick={() => nextTrack()}>
                {/*<SkipForward size={38}  />*/}
                <SkipForwardCircle size={38} />
              </button>
            </div>

            <div className="flex" onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
              <div className={`flex shrunkable ${showVolume ? 'expanded' : 'shrunk'}`}>
                <input type="range" min="0" max="100" />
              </div>
              <button>
                <SpeakerHigh size={38} />
              </button>
            </div>
          </div>
        </div>



      </div>
      {/*</div>*/}
    </SceneLayer >
  )
}