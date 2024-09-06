import React, { useEffect } from "react"
import { SceneLayer } from "./Scene";


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

const createYoutubePlayer = (onPlayerReady: CallableFunction, onPlayerStateChange: CallableFunction) => {
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

  const onPlayerReady = (event: any) => {
    event.target.playVideo();
  }

  const onPlayerStateChange = (event: any) => {
    console.log(event.data);

    if (event.data === -1) {
      console.log(youtubePlayer?.getPlaylist());

      console.log(youtubePlayer?.getVideoUrl())
    }
  }

  useEffect(() => {
    async function createYoutubeIframe() {
      await loadYoutubeIrfameAPI()
      window.onYouTubeIframeAPIReady = async () => {
        const youtubePlayer = await createYoutubePlayer(onPlayerReady, onPlayerStateChange)
        setYoutubePlayer(youtubePlayer);
      }
    }

    createYoutubeIframe()

    return () => {
      youtubePlayer?.destroy();
    }
  }, []);

  useEffect(() => {
    if (youtubePlayer) {
      //console.log(youtubePlayer);
      youtubePlayer.setShuffle(true);
      youtubePlayer.nextVideo()
    }
  }, [youtubePlayer]);

  const setVolume = (volume: number) => {
    youtubePlayer?.setVolume(volume);
  }
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
        <input type="range" min="0" max="100" onChange={(e) => setVolume(parseInt(e.target.value))} />
      </div>
    </SceneLayer>
  )
}