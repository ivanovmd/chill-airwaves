import { motion } from "framer-motion";
import React from "react";

export const AppLoader = () => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="h-screen w-full text-white bg-cover bg-center flex flex-col" >
        <div className="flex-grow flex relative flex-col bg-gradient-to-t from-black to-transparent p-20 overflow-hidden  backdrop-blur-sm">
          <div className="text-2xl font-bold text-center">Loading...</div>
        </div>
      </div>
    </motion.div>
  );
}