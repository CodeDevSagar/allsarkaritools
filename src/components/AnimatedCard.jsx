import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0, hover = true, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(0, 242, 255, 0.3)' } : {}}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
