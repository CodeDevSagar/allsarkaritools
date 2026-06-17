import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-6 py-3 font-semibold rounded-lg
        bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
        text-white shadow-lg transition-all duration-300
        hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default GradientButton;
