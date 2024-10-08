import React, { ReactNode, useState, useEffect, useRef } from 'react';

interface ATCGridBackgroundProps {
  className?: string;
  centerContent?: ReactNode;
  dotCount?: number;
  sweepSpeed?: number;
  color?: string;
}

const ATCGridBackground: React.FC<ATCGridBackgroundProps> = ({
  className = '',
  sweepSpeed = 0.04,
  color = '#00ff00'
}) => {
  const [sweepAngle, setSweepAngle] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      setSweepAngle((prevAngle) => (prevAngle + deltaTime * sweepSpeed) % 360);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [sweepSpeed]);

  // Function to create rgba values for shadows
  const getRGBA = (alpha: number) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const styles = {
    container: {
      background: `radial-gradient(circle, transparent 30%, ${getRGBA(0.1)} 70%, ${getRGBA(0.3)} 100%)`
    },
    radarSweep: {
      background: `conic-gradient(from 0deg, transparent 0deg, transparent 5deg, ${getRGBA(0.3)} 10deg, transparent 15deg, transparent 360deg)`
    },
    gridLine: {
      borderColor: color,
      opacity: 0.5
    },
    outerGlow: {
      boxShadow: `0 0 20px ${getRGBA(0.3)}`
    },
    innerShadow: {
      boxShadow: `inset 0 0 50px ${getRGBA(0.3)}`
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div className="w-[100%] h-[100%] aspect-square rounded-full overflow-hidden relative" style={styles.container}>
        {/* Radar sweep animation */}
        <div
          className="absolute inset-0"
          style={{ ...styles.radarSweep, transform: `rotate(${sweepAngle}deg)` }}
        />

        {/* Grid container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-full h-full rounded-full border-2 flex items-center justify-center`} style={{ borderColor: color }}>
            {/* Circular grid lines */}
            {[...Array(5)].map((_, i) => (
              <div key={`circle-${i}`}
                className="absolute border rounded-full"
                style={{
                  ...styles.gridLine,
                  width: `${(i + 1) * 20}%`,
                  height: `${(i + 1) * 20}%`,
                }} />
            ))}

            {/* Radial lines */}
            {[...Array(12)].map((_, i) => (
              <div key={`line-${i}`}
                className="absolute w-full h-[1px] origin-center"
                style={{
                  ...styles.gridLine,
                  background: color,
                  transform: `rotate(${i * 30}deg)`,
                }} />
            ))}
          </div>
        </div>

        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={styles.outerGlow} />

        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={styles.innerShadow} />
      </div>
    </div>
  );
};

export default ATCGridBackground;