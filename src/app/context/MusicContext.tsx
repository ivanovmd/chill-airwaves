import React, { useEffect } from "react";


export interface VideoInfo {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
}

export type MusicContextType = {
  youtubePlayer: any;
  videoInfo: VideoInfo | null;
  volume: number;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  pauseTrack: () => void;
  playTrack: () => void;
}

export const MusicContext = React.createContext<MusicContextType | null>(null);

interface MusicProviderProps {
  children: React.ReactNode;
}

function extractYouTubeVideoId(url: string): string | null {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const fetchVideoInfo = async (url: any) => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch video info');
    }

    const data: VideoInfo = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error fetching video info. Make sure the URL is correct and the video exists.');
    console.error(err);
  }
};

const loadYoutubeIrfameAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    const timeout = setTimeout(() => {
      reject(new Error('Script load timeout'));
    }, 5000);

    tag.onload = () => {
      clearTimeout(timeout);
      resolve();
    };

    tag.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Script load error'));
    };
  });
}

const createYoutubePlayer = (onPlayerReady: CallableFunction, onPlayerStateChange?: CallableFunction) => {
  return new Promise((resolve, reject) => {
    const player = new window.YT.Player('youtube-player', {
      height: '390',
      width: '640',
      playerVars: {
        listType: 'playlist',
        list: 'PL5ysyoZKAAdGkUaiLuRWnrgYovpA0l6aL',
        loop: 1,
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
      },
      events: {
        onReady: (event: any) => {
          resolve(player)
          onPlayerReady(event)
        },
        onStateChange: onPlayerStateChange,
        onError: (event: any) => {
          console.error(event);
          reject(event);
        }
      }
    });
  })
}


export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [youtubePlayer, setYoutubePlayer] = React.useState<any>(null);
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo | null>(null);
  const [volume, setVolume] = React.useState<number>(25);

  const nextTrack = () => {
    youtubePlayer.nextVideo()
  }

  const previousTrack = () => {
    youtubePlayer.previousVideo()
  }

  const pauseTrack = () => {
    youtubePlayer.pauseVideo()
  }

  const playTrack = () => {
    youtubePlayer.playVideo()
  }

  const onPlayerReady = (event: any) => {
    event.target.playVideo();
  }

  async function onPlayerStateChange(event: any) {
    if (event.data === -1) {
      const curretUrl = youtubePlayer.getVideoUrl()
      const videoId = extractYouTubeVideoId(curretUrl)
      console.log(videoId);
      const videoInfo = await fetchVideoInfo(curretUrl)
      setVideoInfo(videoInfo);
    }
  }

  useEffect(() => {
    async function createYoutubeIframe() {
      await loadYoutubeIrfameAPI()
      window.onYouTubeIframeAPIReady = async () => {
        const youtubePlayer: any = await createYoutubePlayer(onPlayerReady)
        setYoutubePlayer(youtubePlayer);
      }
    }
    createYoutubeIframe()

    return () => {
      youtubePlayer?.destroy();
      youtubePlayer?.removeEventListener('onStateChange', onPlayerStateChange)
    }
  }, []);

  useEffect(() => {
    if (youtubePlayer) {
      youtubePlayer.setShuffle(true);
      youtubePlayer.nextVideo()
      youtubePlayer.addEventListener('onStateChange', onPlayerStateChange)
      youtubePlayer.setVolume(25)
    }
  }, [youtubePlayer]);

  useEffect(() => {
    if (youtubePlayer) {
      youtubePlayer.setVolume(volume)
    }
  }, [volume])

  return (
    <MusicContext.Provider value={{ youtubePlayer, videoInfo, volume, setVolume, nextTrack, previousTrack, pauseTrack, playTrack }}>
      {children}
    </MusicContext.Provider>
  )
}