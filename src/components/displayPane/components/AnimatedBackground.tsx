import { ReactNode } from 'react';

import { motion, Transition } from 'framer-motion';

const transition: Transition = {
    duration: 10,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  };

const variants = {
    one: {
      background: "linear-gradient(90deg, rgba(14,14,44,1) 0%, rgba(36,36,62,1) 100%)",
      transition
    },
    two: {
      background: "linear-gradient(90deg, rgba(36,36,62,1) 0%, rgba(14,14,44,1) 100%)",
      transition
    },
  }

export const AnimatedBackground = ({ children }: { children: ReactNode }) => (
  <motion.div
    style={{ width: '100%', height: '100%', position: 'absolute' }}
    variants={variants}
    initial="one"
    animate="two"
  >
    {children}
  </motion.div>
);

export default AnimatedBackground;