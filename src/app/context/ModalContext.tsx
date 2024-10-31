import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XCircle } from '@phosphor-icons/react';

type ModalContextType = {
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
};

export const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        hideModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <div className='fixed inset-0 z-20  max-h-full'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"
              onClick={() => hideModal()}
            ></motion.div>

            <div className='p-10 flex justify-center max-h-full'>
              <motion.div
                initial={{ scale: 0.95, opacity: 0, filter: 'blur(5px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0)' }}
                exit={{ scale: 0.95, opacity: 0, filter: 'blur(5px)' }}
                transition={{ duration: 0.3 }}
                className="p-10 rounded-lg relative bg-white w-full flex z-30 max-h-full"
              >
                <button className='absolute top-2 right-2' onClick={hideModal}><XCircle size={20} /></button>
                {modalContent}
              </motion.div>
            </div>

          </div>


        )}
      </AnimatePresence>
    </ModalContext.Provider >
  );
};