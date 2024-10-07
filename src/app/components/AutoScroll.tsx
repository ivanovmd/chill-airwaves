import React, { useRef, useEffect, useState } from 'react';

interface AutoScrollProps {
  children: React.ReactNode;
  startAnimation: boolean;
  pauseDuration?: number; // in seconds
}

const AutoScroll: React.FC<AutoScrollProps> = ({ children, startAnimation, pauseDuration = 2 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const newIsOverflowing = contentWidth > containerWidth;
        setIsOverflowing(newIsOverflowing);
        if (newIsOverflowing) {
          setTranslateX(containerWidth - contentWidth);
        } else {
          setTranslateX(0);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children, startAnimation]);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    overflow: 'hidden',
  };

  const contentStyle: React.CSSProperties = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    transition: 'transform 0.3s ease',
    ...(isOverflowing && startAnimation && {
      animation: `scroll ${Math.abs(translateX) * 0.03 + pauseDuration * 2}s linear infinite`,
    }),
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div ref={contentRef} style={contentStyle}>
        {children}
      </div>
      <style>{`
        @keyframes scroll {
          0%, ${pauseDuration / (Math.abs(translateX) * 0.03 + pauseDuration * 2) * 100}% {
            transform: translateX(0);
          }
          ${(pauseDuration + Math.abs(translateX) * 0.015) / (Math.abs(translateX) * 0.03 + pauseDuration * 2) * 100}%, ${(Math.abs(translateX) * 0.03 + pauseDuration) / (Math.abs(translateX) * 0.03 + pauseDuration * 2) * 100}% {
            transform: translateX(${translateX}px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AutoScroll;