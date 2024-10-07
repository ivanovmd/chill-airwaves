import anime from "animejs";
import React from "react";
import { useRef, useEffect } from "react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  id: string;
  title: string;
}


export const AnimatedImage: React.FC<AnimatedImageProps> = ({ src, alt, id, title }) => {
  const container = useRef(null);

  function runAnimation() {
    anime.timeline({ loop: false })
      .add({
        targets: `.${id}_container img`,
        opacity: 0,
        duration: 0,
      })
      .add({
        targets: `.${id}_container img`,
        opacity: 1,
        duration: 500,
        easing: "easeOutExpo",
      })
  }

  useEffect(() => {
    if (container.current) {
      runAnimation()
    }
  }, [src])

  return (

    <div title={title} id={id} ref={container} className={`${id}_container relative overflow-hidden rounded-full flex-shrink-0`} style={{ height: '50px', width: '50px' }}>
      <img style={{ top: '-18%', height: '135%' }} className={`${id}_container absolute inset-0 w-full h-full object-cover object-center pointer-events-none`} src={src} alt={alt} />
    </div>
  );
}