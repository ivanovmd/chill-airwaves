import AudioMotionAnalyzer from "audiomotion-analyzer";
import React, { FC, useEffect, useRef, useState } from "react";
import { AUDIO_MOTION_ANALYZER_SETTINGS } from "../../../settings/audioMotionAnalyzer";
import { lightenColor } from "../../../helpers/lightenColor";
import { makeTransparent } from "../../../helpers/transparentColor";


export interface AtcAnimationProps {
  audioElement: HTMLAudioElement;
  className?: string;
  color?: string;
}


export const AtcAnimation: FC<AtcAnimationProps> = ({ audioElement, className, color }) => {
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

      audioMotionAnalyzer.registerGradient('custom', {
        bgColor: 'transparent',
        colorStops: [
          //makeTransparent(color, 0) || 'rgb(2 132 199)',
          //makeTransparent(color, .2) || 'rgb(2 132 199)',
          makeTransparent(color, 0) || 'rgb(2 132 199)',
          color || 'rgb(2 132 199)',
        ]
      })
      audioMotionAnalyzer.gradient = 'custom'


      setAudioMotionAnalyzer(audioMotionAnalyzer);

      return () => {
        audioMotionAnalyzer.destroy();
      };
    }
  }, [audioElement, containerRef]);

  return (
    <div className={`w-full h-full ${className}`} ref={containerRef}></div>
  );
}