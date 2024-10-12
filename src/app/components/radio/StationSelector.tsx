import { AirplaneTakeoff, CaretDown } from "@phosphor-icons/react";
import React from "react";
import ScrollingContainer from "../ScrollingContainer";
import { AnimatedTextLine } from "../AnimatedTextLine";


interface AnimatedTextLineProps {
  className?: string;
  airportName: string;
  onClick: () => void;
}



export const StationSelector: React.FC<AnimatedTextLineProps> = ({ airportName, onClick }) => {
  return (
    <button title={airportName} className="text-center space-x-2 mb-6 text-xl w-full" onClick={onClick}>
      <div className="flex space-x-2 items-center mx-auto justify-center">
        <AirplaneTakeoff size={28} className="flex-shrink-0" />
        <div className="truncate">
          <ScrollingContainer speed={0.05} pauseDuration={1000} initialDelay={1000}>
            <AnimatedTextLine id="airport-name">
              {airportName}
            </AnimatedTextLine>
          </ScrollingContainer>
        </div>
        <CaretDown className="flex-shrink-0" size={18} />
      </div>
    </button>
  );
}