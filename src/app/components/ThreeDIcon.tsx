import React, { ReactElement } from 'react';

interface ThreeDIconProps {
  icon: ReactElement;
  size?: number;
  color?: string;
  hoverColor?: string;
}

const ThreeDIcon: React.FC<ThreeDIconProps> = ({
  icon,
  size = 40,
  color = '#3498db',
  hoverColor = '#2980b9',
}) => {
  return (
    <div
      className="inline-block transition-all duration-300 ease-in-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: 'drop-shadow(3px 3px 2px rgba(0,0,0,0.2))',
        transform: 'translateY(0)',
      }}
    >
      {React.cloneElement(icon, {
        size: size,
        color: color,
        weight: 'fill',
        className: `transition-all duration-300 ease-in-out hover:text-[${hoverColor}]`,
        style: {
          filter: 'url(#inner-shadow)',
        },
      })}
      <svg width="0" height="0">
        <filter id="inner-shadow">
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" result="offset-blur" />
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          />
          <feFlood floodColor="black" floodOpacity="0.4" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </svg>
    </div>
  );
};

export default ThreeDIcon;