import React, { useState, useEffect } from 'react';

interface LiveUTCClockProps {
  utcOffset: number;
  className?: string;
  style?: React.CSSProperties;
}

const LiveUTCClock: React.FC<LiveUTCClockProps> = ({ utcOffset = 0, className, style }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getOffsetTime = (date: Date, offset: number) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  const formattedTime = getOffsetTime(time, utcOffset).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const offsetString = utcOffset >= 0 ? `+${utcOffset}` : utcOffset;

  return (
    <span className={className} style={style}>
      {formattedTime}
    </span >
  );
};

export default LiveUTCClock;