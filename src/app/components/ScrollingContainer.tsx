import React, { useRef, useEffect, useState, ReactNode, useCallback } from 'react';

interface ScrollingContainerProps {
  children: ReactNode;
  speed: number;
  pauseDuration: number;
  initialDelay?: number;
}

const ScrollingContainer: React.FC<ScrollingContainerProps> = ({
  children,
  speed,
  pauseDuration,
  initialDelay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isPaused, setIsPaused] = useState(true);
  const [isInitialDelay, setIsInitialDelay] = useState(true);

  const checkOverflow = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const shouldScrollNow = content.offsetWidth > container.offsetWidth;
    setShouldScroll(shouldScrollNow);
    if (!shouldScrollNow) {
      setScrollPosition(0);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [children, checkOverflow]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    let pauseStartTime: number | null = null;
    let initialDelayStartTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!shouldScroll) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (isInitialDelay) {
        if (initialDelayStartTime === null) {
          initialDelayStartTime = timestamp;
        }
        const delayElapsed = timestamp - initialDelayStartTime;
        if (delayElapsed >= initialDelay) {
          setIsInitialDelay(false);
          setIsPaused(false);
        }
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (isPaused) {
        if (pauseStartTime === null) {
          pauseStartTime = timestamp;
        }
        const pauseElapsed = timestamp - pauseStartTime;
        if (pauseElapsed >= pauseDuration) {
          setIsPaused(false);
          setDirection(prev => prev === 'left' ? 'right' : 'left');
          pauseStartTime = null;
        }
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const maxScroll = content.offsetWidth - container.offsetWidth;
      let newScrollPosition = scrollPosition;

      if (direction === 'left') {
        newScrollPosition += elapsed * speed;
        if (newScrollPosition >= maxScroll) {
          newScrollPosition = maxScroll;
          setIsPaused(true);
          lastTimestamp = null;
        }
      } else {
        newScrollPosition -= elapsed * speed;
        if (newScrollPosition <= 0) {
          newScrollPosition = 0;
          setIsPaused(true);
          lastTimestamp = null;
        }
      }

      setScrollPosition(newScrollPosition);
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container);
    resizeObserver.observe(content);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [speed, pauseDuration, initialDelay, scrollPosition, shouldScroll, direction, isPaused, isInitialDelay, checkOverflow]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={contentRef}
        className="inline-flex whitespace-nowrap"
        style={{ transform: `translateX(${-scrollPosition}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollingContainer;