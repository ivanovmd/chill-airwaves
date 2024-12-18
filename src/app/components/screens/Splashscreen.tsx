import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/splashscreen.scss';
import { useSelector } from 'react-redux';
import { defaultTheme, getSelectedTheme } from '../../../app/store/userPreferences/userPreferencesSlice';

interface SplashscreenProps {
  fadeOut?: boolean;
}

export function Splashscreen({ fadeOut }: SplashscreenProps) {
  const splashscreenRef = useRef<HTMLDivElement>(null);
  //const appTheme = useSelector(getSelectedTheme) || defaultTheme;

  const getPathColor = (index: number) => {
    return index < 5 ? '#12bedd' : '#ffffff';
  };

  const pathVariants = {
    hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
    visible: (i: number) => ({
      pathLength: 1,
      fill: getPathColor(i),
      transition: {
        pathLength: {
          type: "spring",
          duration: 3,
          bounce: 0,
          delay: i * 0.05
        },
        fill: {
          type: "tween",
          duration: 0.5,
          delay: i * 0.05 + .5 // Start fill animation after path is drawn
        }
      }
    })
  };

  return (
    <div id="svg-splashscreen-html" ref={splashscreenRef}>
      <div id="svg-splashscreen-body">
        <motion.svg
          width="761.6"
          height="78.1"
          viewBox="0 0 761.6 78.1"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          animate="visible"
        >
          <g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" strokeWidth="0.25mm" style={{ strokeWidth: '0.25mm' }}>
            {paths.map((path, index) => (
              <motion.path
                key={index}
                d={path}
                variants={pathVariants}
                custom={index}
                style={{ stroke: getPathColor(index) }}
              />
            ))}
          </g>
        </motion.svg>
      </div>
    </div>
  );
}

const paths = [
  "M 0 16.4 L 8.1 8.1 L 36.2 8.1 L 42.8 18.1 L 37.7 23.5 L 32.4 15.3 L 11.1 15.3 L 8 18.6 L 8 65.1 L 11.9 70.9 L 33 70.9 L 39 64.9 L 43 70.9 L 36.2 78.1 L 8 78.1 L 0 66.1 L 0 16.4 Z",
  "M 58.4 78.1 L 58.4 3.2 L 66.4 3.2 L 66.4 29.8 L 74.4 25 L 94.4 25 L 102.7 36.8 L 102.7 78.1 L 94.6 78.1 L 94.6 37.8 L 90.8 32.2 L 69.7 32.2 L 66.4 35.3 L 66.4 78.1 L 58.4 78.1 Z",
  "M 136.5 23.1 L 122.4 23.1 L 122.4 30.4 L 132.7 30.4 L 136.5 36.1 L 136.5 70.9 L 118.4 70.9 L 118.4 78.1 L 162.6 78.1 L 162.6 70.9 L 144.5 70.9 L 144.5 35.1 L 136.5 23.1 Z M 145.5 10 L 135.5 10 L 135.5 0 L 145.5 0 L 145.5 10 Z",
  "M 193.3 3.3 L 178.3 3.3 L 178.3 10.5 L 193.3 10.5 L 193.3 66.2 L 201.4 78.1 L 222.5 78.1 L 222.6 70.9 L 205.2 70.9 L 201.4 65.2 L 201.4 8.1 L 193.3 3.3 Z",
  "M 253.3 3.3 L 238.3 3.3 L 238.3 10.5 L 253.3 10.5 L 253.3 66.2 L 261.4 78.1 L 282.5 78.1 L 282.6 70.9 L 265.2 70.9 L 261.4 65.2 L 261.4 8.1 L 253.3 3.3 Z",
  "M 342.5 8.1 L 314.7 8.1 L 298.5 24.8 L 298.5 78.1 L 306.5 78.1 L 306.5 46.1 L 334.5 46.1 L 334.5 78.1 L 342.5 78.1 L 342.5 8.1 Z M 306.5 38.9 L 306.5 26.7 L 317.6 15.3 L 334.5 15.3 L 334.5 38.9 L 306.5 38.9 Z",
  "M 376.5 23.1 L 362.4 23.1 L 362.4 30.4 L 372.7 30.4 L 376.5 36.1 L 376.5 70.9 L 358.4 70.9 L 358.4 78.1 L 402.6 78.1 L 402.6 70.9 L 384.5 70.9 L 384.5 35.1 L 376.5 23.1 Z M 385.5 10 L 375.5 10 L 375.5 0 L 385.5 0 L 385.5 10 Z",
  "M 422.3 25 L 417.9 25 L 417.9 32.2 L 424.1 32.2 L 428 37.9 L 428 70.9 L 417.9 70.9 L 417.9 78.1 L 450.1 78.1 L 450.1 70.9 L 436 70.9 L 436 36.9 L 440.4 32.2 L 454.1 32.2 L 457.1 36.7 L 463.1 32.6 L 457.9 25 L 437.3 25 L 431.8 30.7 L 422.3 25 Z",
  "M 528.7 25 L 520.7 25 L 520.7 61.6 L 511.7 70.8 L 511.4 70.8 L 504.6 60.8 L 504.6 25 L 496.5 25 L 496.5 63.7 L 489.7 70.8 L 489.2 70.8 L 480.4 57.7 L 480.4 25 L 472.4 25 L 472.4 58.7 L 485.5 78.1 L 492.6 78.1 L 501.5 69 L 507.5 78.1 L 514.8 78.1 L 528.7 63.7 L 528.7 25 Z",
  "M 577.2 22.8 L 545.8 22.8 L 545.8 30.2 L 575.1 30.2 L 575.1 45.4 L 553 45.4 L 537.4 61.6 L 537.4 65.6 L 545.8 78.1 L 566.7 78.1 L 575.1 73 L 575.1 78.1 L 583.5 78.1 L 583.5 32.1 L 577.2 22.8 Z M 549.7 70.5 L 545.8 64.6 L 545.8 63.8 L 556.3 53 L 575.1 53 L 575.1 70.5 L 549.7 70.5 Z",
  "M 642.7 24.9 L 634.6 24.9 L 634.6 53.5 L 617.8 71 L 606.4 54 L 606.4 24.9 L 598.4 24.9 L 598.4 55.1 L 613.9 78.1 L 620.9 78.1 L 642.7 55.5 L 642.7 24.9 Z",
  "M 694.3 25 L 666.3 25 L 658.3 33.3 L 658.3 66.1 L 666.4 78.1 L 694.4 78.1 L 701.4 70.9 L 697 65.4 L 691.4 70.9 L 670.2 70.9 L 666.3 65.1 L 666.3 53.9 L 686.1 53.9 L 702.6 36.9 L 694.3 25 Z M 666.3 46.7 L 666.3 35.4 L 669.5 32.2 L 690.6 32.2 L 693.2 36.1 L 683.1 46.7 L 666.3 46.7 Z",
  "M 719.4 32.4 L 727 25 L 754.6 25 L 759.8 32.7 L 754.9 37.9 L 750.9 32 L 730.5 32 L 727.4 34.7 L 727.4 42.3 L 731.2 47.7 L 754.8 47.7 L 761.6 57.9 L 761.6 70.6 L 754.8 78.1 L 723.4 78.1 L 719.4 71.9 L 724.3 66.8 L 727 70.9 L 751.5 70.9 L 753.6 68.5 L 753.6 59.1 L 750.7 55 L 727 55 L 719.4 43.5 L 719.4 32.4 Z"
]