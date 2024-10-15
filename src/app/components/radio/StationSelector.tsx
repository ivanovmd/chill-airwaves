import { AirplaneTakeoff, CaretDown } from "@phosphor-icons/react";
import React from "react";
import ScrollingContainer from "../ScrollingContainer";
import { AnimatedTextLine } from "../common/AnimatedTextLine";
import { Settings } from "../modals/Settings";
import { AnimatePresence, motion } from "framer-motion";
import { SelectAirport } from "../modals/SelectAirport";


interface AnimatedTextLineProps {
  className?: string;
  airportName: string;
  onClick: () => void;
  accentColors?: {
    primary: string;
    secondary: string;
  };
}



export const StationSelector: React.FC<AnimatedTextLineProps> = ({ airportName, onClick, accentColors }) => {
  const [showModal, setShowModal] = React.useState(false);


  const handleModalOpen = () => {
    setShowModal(true);
    onClick();
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  return (
    <div>
      <div className="relative">
        <button title={airportName} className="text-center space-x-2 mb-6 text-xl w-full relative z-30" onClick={handleModalOpen}>
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

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ height: 0, opacity: .9 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden absolute top-0 left-0 w-full bg-white z-30 rounded-2xl m-0"
            >
              <div className="text-black">
                <SelectAirport />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute h-full w-full top-0 left-0 bg-black/50 z-20 backdrop-blur-sm"
            onClick={handleModalClose}
          >
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}