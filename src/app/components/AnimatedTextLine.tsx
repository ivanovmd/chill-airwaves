import anime from "animejs";
import React, { ReactNode, useEffect, useRef } from "react";

interface AnimatedTextLineProps {
  children: string;
  id: string,
  title?: string,
}

function wrapLetters(text: string) {
  return text.split('').map((letter) => {
    return `<span class='letter'>${letter}</span>`
  }).join('')
}

export const AnimatedTextLine: React.FC<AnimatedTextLineProps> = ({ children, id, title }) => {
  const container = useRef(null);

  function runAnimation() {
    anime.timeline({ loop: false })
      .add({
        //delay: 200,
        targets: `.${id}_container`,
        opacity: 1,
        duration: 200,
        easing: "easeOutExpo",
      })
      .add({
        targets: `.${id}_container .letter`,
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 10,
        delay: (_, i) => 30 * (i + 1)
      })
  }

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = wrapLetters(children)
      runAnimation()
    }
  }, [children])


  return (
    <div title={title} id={id} ref={container} className={`${id}_container truncate`}></div>
  );
} 