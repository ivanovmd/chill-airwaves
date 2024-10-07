import React, { useState, useEffect } from 'react';

interface FadingImageProps {
  src: string;
  alt: string;
  className?: string;
}

const FadingImage: React.FC<FadingImageProps> = ({ src, alt, className = '' }) => {
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
    <div className="relative overflow-hidden rounded-full flex-shrink-0" style={{ height: '50px', width: '50px' }}>
      <img src={currentSrc} alt={alt} onLoad={handleImageLoad} style={{ top: '-18%', height: '135%' }}
        className={`${className} ${fadeIn ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300 ease-in absolute inset-0 w-full h-full object-cover object-center pointer-events-none`} />
    </div>


    //<div className="relative">
    //  {loading && (
    //    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
    //      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    //    </div>
    //  )}
    //  <img
    //    src={currentSrc}
    //    alt={alt}
    //    onLoad={handleImageLoad}
    //    className={`
    //      ${className}
    //      transition-opacity duration-300 ease-in-out
    //      ${fadeIn ? 'opacity-100' : 'opacity-0'}
    //    `}
    //  />
    //</div>
  );
};

export default FadingImage;