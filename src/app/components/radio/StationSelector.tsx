import { AirplaneTakeoff, CaretDown, CircleNotch } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import ScrollingContainer from "../ScrollingContainer";
import { AnimatedTextLine } from "../common/AnimatedTextLine";
import { AnimatePresence, motion } from "framer-motion";
import { SelectAirport } from "./SelectAirport";
import { airports } from "../../../settings/liveatc";
import { setSelectedAirportIata } from "../../../app/store/atc/atsSlice";
import { useDispatch } from "react-redux";


interface AnimatedTextLineProps {
  className?: string;
  airportName: string;
  onClick: () => void;
  isLoading?: boolean;
  accentColors?: {
    primary: string;
    secondary: string;
  };
}


export const StationSelector: React.FC<AnimatedTextLineProps> = ({ airportName, onClick, isLoading = false }) => {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setShowModal(true);
    onClick();
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  const onAirportSelect = (iata: string) => {
    dispatch(setSelectedAirportIata(iata));
    handleModalClose();
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        handleModalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <div>
      <div className="relative hover:text-primary">
        <button title={airportName} className="text-center space-x-2 mb-6 text-xl w-full relative z-30" onClick={handleModalOpen}>
          <div className="flex space-x-2 items-center mx-auto justify-center">

            {isLoading ?
              <CircleNotch className="rotating flex-shrink-0" size={28} />
              :
              <AirplaneTakeoff size={28} className="flex-shrink-0" />
            }

            <div className="truncate">
              <ScrollingContainer speed={0.05} pauseDuration={1000} initialDelay={1000}>
                <AnimatedTextLine id="airport-name">
                  {isLoading ? 'Connecting...' : airportName}
                </AnimatedTextLine>
              </ScrollingContainer>
            </div>
            {isLoading ? '' : <CaretDown className="flex-shrink-0" size={18} />}
          </div>
        </button>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ height: 40, opacity: 0, scale: .9, filter: 'blur(5px)' }}
              animate={{ height: 'auto', opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ height: 40, opacity: 0, scale: .9, filter: 'blur(5px)' }}
              className="overflow-hidden absolute top-0 left-0 w-full bg-white z-30 rounded-2xl m-0"
            >
              <div className="text-black">
                <SelectAirport airports={airports} onSelect={onAirportSelect} />
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
            transition={{ duration: .3 }}
            className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm"
            onClick={handleModalClose}
          >
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}