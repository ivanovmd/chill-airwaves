import React, { useContext, useEffect, useState } from "react";
import { Gear } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack as nextAtcTrack, setSelectedAirportIata } from "../store/atc/atsSlice";
import { Airport, airports } from "../../../src/settings/liveatc";
import { StationSelector } from "./radio/StationSelector";
import { Radar } from "./radio/Radar";
import { MusicPlayer } from "./musicPlayer/MusicPlayer";
import { MusicContext } from "../context/MusicContext";

export const TestLayout = () => {
  const musicContext = useContext(MusicContext);
  const currentAtcTrack = useSelector(getCurrentAtcTrack);
  const dispatch = useDispatch();
  const selectedAirportIata = useSelector(getSelectedAirport);
  const [selectedAirport, setSelectedAirport] = useState<Airport>();
  const [scrollContent, setScrollContent] = useState('Hong Kong International Airport');
  const [playVinylAnimation, setPlayVinylAnimation] = useState(false);


  if (!musicContext) {
    throw new Error('MusicPlayer must be used within a MusicProvider');
  }

  const { setVolume, nextTrack, playTrack, pauseTrack, previousTrack, volume, videoInfo, isPlayng, isBuffering } = musicContext;

  function getAutorName(rawAuthorName: string) {
    return rawAuthorName?.replace(" - Topic", "");
  }

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

      <button className="absolute top-4 right-4">
        <Gear size={28} />
      </button>

      <div className="flex-grow flex relative flex-col bg-gradient-to-t from-black to-transparent p-20 overflow-hidden  backdrop-blur-sm">

        <StationSelector onClick={console.log} airportName={selectedAirport?.name || ''} />

        <Radar
          onPaused={console.log}
          onTrackEnd={() => dispatch(nextAtcTrack())}
          onTrackError={() => dispatch(nextAtcTrack())}
          airport={selectedAirport}
          atcSource={currentAtcTrack}
        />

        <MusicPlayer
          onPause={pauseTrack}
          onPlay={playTrack}
          onNextTrack={nextTrack}
          onPreviousTrack={previousTrack}
          onVolumeChange={setVolume}
          imageUrl={videoInfo?.thumbnail_url}
          trackName={videoInfo?.title || ''}
          authorName={getAutorName(videoInfo?.author_name) || ''}
          spotifyLink={'google.com'}
          youtubeLink={'gogole.com'}
          isPlaying={isPlayng}
          isBuffering={isBuffering}
        />
      </div>
    </div >
  );
}