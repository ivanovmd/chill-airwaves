import React, { ReactNode, useRef } from "react";

interface AnimatedTextLineProps {
  children: ReactNode;
}

export const AnimatedTextLine: React.FC<AnimatedTextLineProps> = ({ children }) => {
  const container = useRef(null);

  return (
    <div ref={container}>
      {children}
    </div>
  );
}