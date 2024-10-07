import React, { useState, useEffect, useCallback } from 'react';

interface DancingBarsProps {
  isAnimating: boolean;
  minHeight?: number;
  maxHeight?: number;
  barWidth?: number;
  barGap?: number;
  barColor?: string;
  smoothness?: number;
  transitionTime?: number;
  className?: string;
}

const DancingBars: React.FC<DancingBarsProps> = ({
  isAnimating,
  minHeight = 3,
  maxHeight = 32,
  barWidth = 3,
  barGap = 3,
  barColor = 'bg-white',
  smoothness = 300,
  transitionTime = 300,
  className = ''
}) => {
  const initialHeight = Math.floor(minHeight);
  const [barHeights, setBarHeights] = useState(Array(4).fill(initialHeight));

  const getMaxHeightForBar = useCallback((index: number, totalBars: number) => {
    if (index === 0 || index === totalBars - 1) {
      return minHeight + (maxHeight - minHeight) * 0.7;
    }
    return maxHeight;
  }, [minHeight, maxHeight]);

  const animateBars = useCallback(() => {
    if (isAnimating) {
      return barHeights.map((_, index) => {
        const barMaxHeight = getMaxHeightForBar(index, barHeights.length);
        return Math.floor(Math.random() * (barMaxHeight - minHeight + 1)) + minHeight;
      });
    } else {
      return Array(barHeights.length).fill(initialHeight);
    }
  }, [isAnimating, minHeight, maxHeight, barHeights, initialHeight, getMaxHeightForBar]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights(animateBars);
    }, smoothness);

    return () => clearInterval(interval);
  }, [animateBars, smoothness]);

  const getOpacity = (height: number, maxHeightForBar: number) => {
    if (!isAnimating) return 1;
    return (height - minHeight) / (maxHeightForBar - minHeight) * 0.8 + 0.4;
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ height: `${maxHeight}px`, gap: `${barGap}px` }}
    >
      {barHeights.map((height, index) => {
        const maxHeightForBar = getMaxHeightForBar(index, barHeights.length);
        return (
          <div
            key={index}
            className="relative h-full flex items-center"
            style={{ width: `${barWidth}px` }}
          >
            <div
              className={barColor}
              style={{
                position: 'absolute',
                height: `${height}px`,
                bottom: `${maxHeight / 2}px`,
                left: 0,
                right: 0,
                opacity: getOpacity(height, maxHeightForBar),
                transform: `translateY(50%)`,
                transition: `height ${transitionTime}ms ease-in-out, opacity ${transitionTime}ms ease-in-out`
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DancingBars;