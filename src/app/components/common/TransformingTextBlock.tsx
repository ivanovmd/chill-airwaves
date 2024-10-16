import React, { useState, useEffect, useRef } from 'react';

interface TransformingTextBlockProps {
  children: React.ReactNode
}

const TransformingTextBlock: React.FC<TransformingTextBlockProps> = ({ children }) => {
  const [width, setWidth] = useState<number>(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  return (
    <div
      className="inline-block transition-all duration-300 ease-in-out overflow-hidden"
      style={{ width: `${width}px` }}
    >
      <div ref={textRef} className="whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};

export default TransformingTextBlock;