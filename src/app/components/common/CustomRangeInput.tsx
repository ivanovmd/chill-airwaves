import React, { useState, useRef, useEffect } from 'react';

interface CustomRangeInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  thumbColor?: string;
  trackColor?: string;
  filledTrackColor?: string;
  transitionDuration?: string;
  style?: React.CSSProperties;
  className?: string;
}

const CustomRangeInput: React.FC<CustomRangeInputProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  thumbColor = 'white',
  trackColor = 'white',
  filledTrackColor = 'white',
  transitionDuration = 'transition-all duration-150',
  className = '',
  style = {},
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleWidth = 16; // w-4 is 16px
  const trackHeight = 8; // h-2 is 8px

  const calculateThumbPosition = (val: number): number => {
    const range = max - min;
    const valueOffset = val - min;
    const trackWidth = rangeRef.current ? rangeRef.current.clientWidth - handleWidth : 0;
    return (valueOffset / range) * trackWidth;
  };

  const thumbPosition = calculateThumbPosition(value);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    updateValue(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (clientX: number) => {
    if (rangeRef.current) {
      const rect = rangeRef.current.getBoundingClientRect();
      const trackWidth = rect.width - handleWidth;
      let x = clientX - rect.left - handleWidth / 2;
      x = Math.max(0, Math.min(x, trackWidth));

      const newValue = min + (x / trackWidth) * (max - min);
      onChange(Math.max(min, Math.min(max, Math.round(newValue / step) * step)));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let newValue = value;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    onChange(newValue);
    event.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        updateValue(event.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`relative w-full h-6 flex items-center ${className}`} style={style}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sr-only"
      />
      <div
        ref={rangeRef}
        className={`w-full overflow-hidden h-2 rounded-full cursor-pointer`}
        style={{ backgroundColor: trackColor }}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`h-full ${transitionDuration}`}
          style={{
            width: `calc(${(thumbPosition / (rangeRef.current?.clientWidth ?? 1)) * 100}% + ${handleWidth / 2}px)`,
            backgroundColor: filledTrackColor
          }}
        />
      </div>
      <div
        ref={thumbRef}
        tabIndex={0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`absolute w-4 h-4 rounded-full shadow cursor-grab ${isDragging ? 'cursor-grabbing' : ''
          } ${isFocused ? 'ring-2 ring-offset-2 ring-blue-300' : ''} ${transitionDuration}`}
        style={{
          left: `${thumbPosition}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: thumbColor,
        }}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default CustomRangeInput;