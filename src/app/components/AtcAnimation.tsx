import AudioMotionAnalyzer from "audiomotion-analyzer";
import React, { FC, useEffect, useRef, useState } from "react";
import { AUDIO_MOTION_ANALYZER_SETTINGS } from "../../settings/audioMotionAnalyzer";


export interface AtcAnimationProps {
  audioElement: HTMLAudioElement;
}


export const AtcAnimation: FC<AtcAnimationProps> = ({ audioElement }) => {
  const [audioMotionAnalyzer, setAudioMotionAnalyzer] = useState<AudioMotionAnalyzer | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let audioMotionAnalyzer: AudioMotionAnalyzer | undefined
    console.log(audioElement, containerRef.current);

    if (audioElement && containerRef.current) {
      console.log("Creating AudioMotionAnalyzer");

      audioMotionAnalyzer = new AudioMotionAnalyzer(
        containerRef.current, {
        source: audioElement, ...AUDIO_MOTION_ANALYZER_SETTINGS, overlay: true
      });

      setAudioMotionAnalyzer(audioMotionAnalyzer);

      return () => {
        audioMotionAnalyzer.destroy();
      };
    }
  }, [audioElement, containerRef]);

  return (
    <div>
      <h1>ATC Animation Component</h1>

      <div ref={containerRef}></div>

    </div>
  );
}