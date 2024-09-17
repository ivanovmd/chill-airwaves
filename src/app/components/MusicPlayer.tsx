import React, { useContext, useEffect } from "react"
import { SceneLayer } from "./Scene";
import { MusicContext } from "../context/MusicContext";
import { Settings } from "./Settings";
import { AtcRadio } from "./AtcRadio";

export const MusicPlayer = () => {
  const musicContext = useContext(MusicContext);
  if (!musicContext) {
    throw new Error('MusicPlayer must be used within a MusicProvider');
  }

  const { setVolume, nextTrack, playTrack, pauseTrack, previousTrack, volume, videoInfo } = musicContext;


  return (
    <SceneLayer name="spotify-player">
      <div className="absolute" style={{ left: '-99999px' }}>
        {/*<div className="">*/}
        <div id="youtube-player"></div>
      </div>



      <div className="grid grid-cols-2">
        <div>
          <div>
            <button onClick={() => previousTrack()}>Prev</button>
            <button onClick={() => pauseTrack()}>Pause</button>
            <button onClick={() => playTrack()}>Play</button>
            <button onClick={() => nextTrack()}>Next</button>
          </div>
          <div>
            <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} />
          </div>
          {videoInfo && (
            <div>
              <div>
                <div className="h-20 w-20 relative overflow-hidden rounded-full">
                  <img style={{ top: '-18%', height: '135%' }} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" src={videoInfo.thumbnail_url} alt="" />
                </div>
              </div>
              <div>
                <p>{videoInfo.title}</p>
                <p>{videoInfo.author_name}</p>
              </div>
            </div>
          )}

          <div>
            <AtcRadio />
          </div>
        </div>

        <div>
          <Settings />
        </div>
      </div>
    </SceneLayer>
  )
}