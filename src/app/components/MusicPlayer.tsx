import React, { useEffect } from "react"
import { SceneLayer } from "./Scene";

interface VideoInfo {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
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
      //videoId: 'M7lc1UVf-VE',
      playerVars: {
        listType: 'playlist',
        list: 'RDCLAK5uy_nZJzoZEBYRptA2XXskbxGTvKkevapT_F4',
        loop: 1,
        autoplay: 0
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


export const MusicPlayer = () => {
  const [youtubePlayer, setYoutubePlayer] = React.useState<any>(null);
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo | null>(null);
  const [volume, setVolume] = React.useState<number>(25);

  const onPlayerReady = (event: any) => {
    event.target.playVideo();
  }

  async function onPlayerStateChange(event: any) {
    // https://www.youtube.com/watch?list=RDCLAK5uy_nZJzoZEBYRptA2XXskbxGTvKkevapT_F4&v=qGVMBirxwWc
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
    <SceneLayer name="spotify-player">
      <div className="absolute -left-full">
        <div id="youtube-player"></div>
      </div>
      <div>
        <button onClick={() => youtubePlayer?.pauseVideo()}>Pause</button>
        <button onClick={() => youtubePlayer?.playVideo()}>Play</button>
        <button onClick={() => youtubePlayer?.nextVideo()}>Next</button>
      </div>
      <div>
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} />
      </div>

      <div>
        {videoInfo && (
          <div>
            <div className="h-20 w-20 relative overflow-hidden rounded-full">
              <img style={{ top: '-18%', height: '135%' }} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" src={videoInfo.thumbnail_url} alt="" />
            </div>
            <p>{videoInfo.title}</p>
            <p>{videoInfo.author_name}</p>
          </div>
        )}
      </div>
    </SceneLayer>
  )
}