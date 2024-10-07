import React, { useEffect } from "react"
import '../styles/soundwaves.scss'

interface SoundWavesProps {
  isPlaying: boolean,
  className?: string
}

export function SoundWaves({ isPlaying, className }: SoundWavesProps) {

  useEffect(() => {
    const bars: NodeListOf<HTMLElement> = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length; i++) {
      bars.forEach((item) => {
        // Random move
        item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`; // Change the numbers for speed / ( max - min ) + min / ex. ( 0.5 - 0.1 ) + 0.1
      });
    }
  }, [])

  return (
    <div className={`sound-wave ${className} ${isPlaying ? 'playing' : ''}`} >
      <div className='bar'></div>
      <div className='bar'></div>
      <div className='bar'></div>
      <div className='bar'></div>
    </div>
  )
}