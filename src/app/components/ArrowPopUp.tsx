import React from 'react';
import { motion } from 'framer-motion';

interface ArrowPopUpProps {
  text: string;
}

const ArrowPopUp: React.FC<ArrowPopUpProps> = ({ text }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut" },
        opacity: { duration: 0.01 }
      }
    }
  };

  return (
    <div className="relative">
      <motion.svg 
        width="300" 
        height="300" 
        viewBox="0 0 219 127" 
        fill="none"
        className="text-[#CA0079]"
        initial="hidden"
        animate="visible"
      >
        {/* Arrow head - simplified path */}
        <motion.path
          d="M208.979 0.684945L197.312 10.2309L207.918 3.86693L216.404 12.3522L208.979 0.684945Z"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
        {/* Main curved line */}
        <motion.path
          d="M3.17969 124.953C3.17969 110.111 13.9018 101.197 27.9867 96.0967C42.051 91.0042 58.9818 89.9366 70.1899 90.5895C76.504 90.9573 82.3529 93.1096 88.0704 95.9718C90.9289 97.4027 93.7346 99.0006 96.5445 100.631C99.3425 102.254 102.157 103.917 104.979 105.441C117.843 112.387 130.407 115.11 142.628 113.761C154.842 112.412 166.584 107.01 177.836 97.9222C207.092 74.292 209.418 35.3775 209.418 1.74561"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
      </motion.svg>
      <span className="ml-2">{text}</span>
    </div>
  );
};

export default ArrowPopUp;

