import React from 'react';

interface ATCGridSquareProps {
  color?: string;
}

const ATCGridSquare: React.FC<ATCGridSquareProps> = ({ color }) => {
  // Function to create rgba values for shadows
  const getRGBA = (alpha: number) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const styles = {
    container: {
      //background: `radial-gradient(circle, transparent 30%, ${getRGBA(0.1)} 70%, ${getRGBA(0.3)} 100%)`
    },
    line: {
      background: `linear-gradient(to bottom, transparent, ${color} 50%, transparent)`,
      boxShadow: `0 0 1px ${getRGBA(0.7)}, 0 0 8px ${getRGBA(0.5)}`,
    },
    horizontalLine: {
      background: `linear-gradient(to right, transparent, ${color} 50%, transparent)`,
      boxShadow: `0 0 1px ${getRGBA(0.7)}, 0 0 8px ${getRGBA(0.5)}`,
    },
    radarLine: {
      background: `linear-gradient(to right, transparent, ${color}, transparent)`,
      boxShadow: `0 0 10px ${getRGBA(0.7)}, 0 0 20px ${getRGBA(0.5)}`,
    }
  };

  return (
    <div
      className="relative rounded-3xl w-full h-full bg-transparent border-2 overflow-hidden"
      style={{ ...styles.container, borderColor: color }}
    >
      {/* Vertical lines */}
      <div className="absolute inset-0 flex justify-between">
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="w-px h-full"
            style={styles.line}
          />
        ))}
      </div>

      {/* Horizontal lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="h-px w-full"
            style={styles.horizontalLine}
          />
        ))}
      </div>

      {/* Moving radar line */}
      <div
        className="absolute top-0 bottom-0 w-1 "
        style={{
          ...styles.radarLine,
          animation: 'radarSweep 10s linear infinite alternate',
        }}
      />

      <style>{`
        @keyframes radarSweep {
          0% {
            left: 0;
          }
          100% {
            left: calc(100% - 4px);
          }
        }
      `}</style>
    </div>
  );
};

export default ATCGridSquare;