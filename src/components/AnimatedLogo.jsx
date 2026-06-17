import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ className = "w-12 h-12" }) => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    hover: {
      scale: 1.15,
      rotate: 12,
      transition: { duration: 0.3 },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const orbitVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <motion.div
      className={`${className} relative flex items-center justify-center cursor-pointer`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20"
        animate={{
          boxShadow: [
            '0 0 10px rgba(0, 242, 255, 0.3)',
            '0 0 20px rgba(0, 242, 255, 0.6)',
            '0 0 10px rgba(0, 242, 255, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main gradient background */}
      <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-90" />

      {/* Orbiting dots */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        variants={orbitVariants}
      >
        <circle cx="50" cy="20" r="3" fill="#00f2ff" opacity="0.6" />
        <circle cx="80" cy="50" r="3" fill="#0066ff" opacity="0.6" />
        <circle cx="50" cy="80" r="3" fill="#7000ff" opacity="0.6" />
        <circle cx="20" cy="50" r="3" fill="#ff00c8" opacity="0.6" />
      </motion.svg>

      {/* Inner glow circle */}
      <motion.div
        className="absolute inset-1 rounded-xl bg-gradient-to-br from-cyan-300/30 to-purple-500/30"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Main letter "S" */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        variants={letterVariants}
      >
        <span className="text-white font-black text-2xl drop-shadow-lg" style={{
          textShadow: '0 0 10px rgba(0, 242, 255, 0.8), 0 0 20px rgba(112, 0, 255, 0.6)',
        }}>
          S
        </span>
      </motion.div>

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0.2, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-cyan-300"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
