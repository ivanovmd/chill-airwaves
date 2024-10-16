import { Gear, XCircle } from "@phosphor-icons/react"
import React, { useContext, useEffect, useState } from "react"
import toast, { Toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MusicContext } from "../../../app/context/MusicContext";
import { getCurrentAtcTrack, getSelectedAirport, nextTrack as nextAtcTrack, setSelectedAirportIata } from "../../store/atc/atsSlice";
import { Airport, airports } from "../../../settings/liveatc";
import { StationSelector } from "../radio/StationSelector";
import { Radar } from "../radio/Radar";
import { MusicPlayer } from "../musicPlayer/MusicPlayer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useModal } from "../../../app/hooks/useModal";
import { Settings } from "../modals/Settings";


export const Player = () => {
  const musicContext = useContext(MusicContext);
  const currentAtcTrack = useSelector(getCurrentAtcTrack);
  const dispatch = useDispatch();
  const selectedAirportIata = useSelector(getSelectedAirport);
  const [selectedAirport, setSelectedAirport] = useState<Airport>();
  const [scrollContent, setScrollContent] = useState('Hong Kong International Airport');
  const [playVinylAnimation, setPlayVinylAnimation] = useState(false);
  const { showModal } = useModal();

  const navigate = useNavigate();

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

  const createToast = () => toast(
    (t: Toast) => (
      <div className="flex items-center text-sm" onClick={() => toast.dismiss(t.id)}>
        <div className="">Settings</div>
        <button onClick={() => toast.dismiss(t.id)}><XCircle size={16} /></button>
      </div>
    ), { duration: Infinity });


  const openSettingsModal = () => {
    return showModal(<Settings />);
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="h-screen w-full text-white bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('https://cdn.midjourney.com/aeb9cae2-47e3-4edf-97b1-5170e511429f/0_0.png" }}>
        <button className="absolute top-4 right-4 z-10" onClick={() => openSettingsModal()}>
          <Gear size={28} />
        </button>

        <div className="flex-grow items-center flex relative flex-col bg-gradient-to-t from-black to-transparent p-20 overflow-hidden backdrop-blur-sm">
          <div className="flex-grow flex flex-col justify-center" style={{ width: '400px', maxWidth: '500px' }}>
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

        </div>
      </div>
    </motion.div>
  )
}