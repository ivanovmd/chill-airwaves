import React, { useState, useEffect } from 'react';

interface FadingImageProps {
  src: string;
  alt: string;
  className?: string;
  title?: string;
}

const FadingImage: React.FC<FadingImageProps> = ({ src, alt, className = '', title }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (src !== currentSrc) {
      setLoading(true);
      setFadeIn(false);

      const timer = setTimeout(() => {
        setCurrentSrc(src);
      }, 300); // Wait for fade out to complete

      return () => clearTimeout(timer);
    }
  }, [src, currentSrc]);

  const handleImageLoad = () => {
    setLoading(false);
    setFadeIn(true);
  };

  return (
    <div title={title} className="relative rounded-full flex-shrink-0 bg-gray-700 border-0" style={{ height: '40px', width: '40px' }}>
      <img src={currentSrc} alt={alt} onLoad={handleImageLoad} style={{ top: '-18%', height: '135%' }}
        className={`${className} ${fadeIn ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300 ease-in absolute inset-0 w-full h-full object-cover object-center pointer-events-none border-0`} />
    </div>
  );
};

export default FadingImage;