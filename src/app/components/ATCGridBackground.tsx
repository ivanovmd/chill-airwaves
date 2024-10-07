import React, { ReactNode, useState, useEffect, useRef } from 'react';

interface ATCGridBackgroundProps {
  className?: string;
  centerContent?: ReactNode;
  dotCount?: number;
  sweepSpeed?: number; // New prop for customizable speed
}

const ATCGridBackground: React.FC<ATCGridBackgroundProps> = ({
  className = '',
  sweepSpeed = 0.04 // Default speed, completes a full rotation in about 4 seconds
}) => {
  const [sweepAngle, setSweepAngle] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Update sweep angle using the customizable speed
      setSweepAngle((prevAngle) => (prevAngle + deltaTime * sweepSpeed) % 360);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [sweepSpeed]); // Add sweepSpeed to the dependency array

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div className="w-[100%] h-[100%] aspect-square rounded-full overflow-hidden relative">
        {/* Radar sweep animation */}
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0deg,_transparent_5deg,_rgba(0,255,0,0.3)_10deg,_transparent_15deg,_transparent_360deg)]"
          style={{ transform: `rotate(${sweepAngle}deg)` }}
        />

        {/* Grid container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-2 border-green-500
                          flex items-center justify-center
                          bg-[radial-gradient(circle,_transparent_30%,_rgba(0,255,0,0.1)_70%,_rgba(0,255,0,0.3)_100%)]">
            {/* Circular grid lines */}
            {[...Array(5)].map((_, i) => (
              <div key={`circle-${i}`}
                className="absolute border border-green-500 rounded-full"
                style={{
                  width: `${(i + 1) * 20}%`,
                  height: `${(i + 1) * 20}%`,
                  opacity: 0.5
                }} />
            ))}

            {/* Radial lines */}
            {[...Array(12)].map((_, i) => (
              <div key={`line-${i}`}
                className="absolute w-full h-[1px] bg-green-500 origin-center"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  opacity: 0.5
                }} />
            ))}
          </div>
        </div>

        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(0,255,0,0.3)] pointer-events-none" />

        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,255,0,0.3)] pointer-events-none" />
      </div>
    </div>
  );
};

export default ATCGridBackground;