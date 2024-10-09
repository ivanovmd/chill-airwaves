import React from 'react';
import '../styles/vinyl-record.scss';

interface VinylRecordProps {
  children: React.ReactNode;
  size?: number; // Size in pixels
  rotationSpeed?: number; // Rotation speed in seconds
}

const VinylRecord: React.FC<VinylRecordProps> = ({ children, size = 320, rotationSpeed = 10 }) => {
  const scale = size / 320; // Base scale factor

  return (
    <div className="vinyl-record" style={{
      width: size,
      height: size,
      '--rotation-speed': `${rotationSpeed}s`,
      '--scale': scale
    } as React.CSSProperties}>
      {/* Rotating container */}
      <div className="rotating-container">
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
        <div className="center-content">
          {children}
        </div>

        {/* Center hole */}
        <div className="center-hole"></div>
      </div>
    </div>
  );
};

export default VinylRecord;