import React, { useEffect, useRef } from 'react';

const BannerAd = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bannerRef.current;
    if (!container) return;

    // Create configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = `
      atOptions = {
        key: "4d3aa5e82f119e12e2449dbc6246913d",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };
    `;

    // Create external script
    const externalScript = document.createElement('script');
    externalScript.type = 'text/javascript';
    externalScript.src = 'https://www.highperformanceformat.com/4d3aa5e82f119e12e2449dbc6246913d/invoke.js';

    // Append scripts to container
    container.appendChild(configScript);
    container.appendChild(externalScript);

    // Cleanup function
    return () => {
      // Remove scripts when component unmounts
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      className='relative bg-black'
      ref={bannerRef}
      style={{
        height: '90px',
        width: '728px',
        margin: '0 auto',
        overflow: 'hidden'
      }}
    />
  );
};

export default BannerAd;