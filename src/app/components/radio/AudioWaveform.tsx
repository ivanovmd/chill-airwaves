import React, { useRef, useEffect, useState } from 'react';

interface AudioWaveformProps {
  audioElement: HTMLAudioElement;
  color: string;
  backgroundColor: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioElement, color, backgroundColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const newAnalyser = audioContext.createAnalyser();
    newAnalyser.fftSize = 2048;
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(newAnalyser);
    newAnalyser.connect(audioContext.destination);
    setAnalyser(newAnalyser);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      audioContext.close();
    };
  }, [audioElement]);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Use quadratic curves for smoother lines
          const prevX = x - sliceWidth;
          const prevY = (dataArray[i - 1] / 128.0) * height / 2;
          const midX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Fill area below the line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current!);
    };
  }, [analyser, color, backgroundColor]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default AudioWaveform;