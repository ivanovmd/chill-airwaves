import React, { useRef, useEffect, useState } from 'react';
import '../../styles/vinyl-record.scss';

interface VinylRecordProps {
  children: React.ReactNode;
  size?: number; // Size in pixels
  rotationSpeed?: number; // Rotation speed in degrees per second
  className?: string;
  isPlaying?: boolean; // Control whether the record is spinning
}

const VinylRecord: React.FC<VinylRecordProps> = ({
  children,
  className = '',
  size = 320,
  rotationSpeed = 36, // 360 degrees in 10 seconds by default
  isPlaying = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const scale = size / 320; // Base scale factor

  const [rotation, setRotation] = useState(0);

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      rotationRef.current = (rotationRef.current + rotationSpeed * deltaTime / 1000) % 360;
      setRotation(rotationRef.current);
    }
    lastTimeRef.current = time;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, rotationSpeed]);

  return (
    <div
      className={`vinyl-record ${className}`}
      style={{
        width: size,
        height: size,
        '--scale': scale
      } as React.CSSProperties}
    >
      {/* Rotating container */}
      <div
        ref={containerRef}
        className="rotating-container"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Outer ring */}
        <div className="outer-ring"></div>

        {/* Vinyl surface */}
        <div className="vinyl-surface">
          {/* Shiny effect */}
          <div className="shiny-effect"></div>

          {/* Vinyl grooves */}
          {[0, 8, 16, 24].map((inset, index) => (
            <div key={index} className="vinyl-groove" style={{
              inset: `${inset * scale}px`
            }}></div>
          ))}

          {/* Reflection effect */}
          <div className="reflection-effect"></div>
        </div>

        {/* Center content (replaces Album cover) */}
        <div className="center-content border-0">
          {children}
        </div>

        {/* Center hole */}
        <div className="center-hole"></div>
      </div>
    </div>
  );
};

export default VinylRecord;