import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, TrendingUp } from 'lucide-react';
import { Button, message, Progress } from 'antd';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const TypingTestEnhanced = () => {
  const testParagraphs = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
    "Programming is the art of telling another human what one wants the computer to do. It's a skill that combines logic, creativity, and problem-solving.",
    "Success is not final, failure is not fatal. It is the courage to continue that counts in the journey of learning and growth.",
    "Technology is best when it brings people together and helps them connect in meaningful ways.",
    "The future belongs to those who believe in the beauty of their dreams and work to make them real."
  ];

  const [paragraph, setParagraph] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    setParagraph(testParagraphs[Math.floor(Math.random() * testParagraphs.length)]);
  }, []);

  useEffect(() => {
    let interval;
    if (isActive && !finished) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, finished]);

  const handleStart = () => {
    setIsActive(true);
    setTypedText('');
    setTime(0);
    setWpm(0);
    setAccuracy(0);
    setFinished(false);
  };

  const handleTyping = (e) => {
    const text = e.target.value;
    setTypedText(text);

    if (!isActive) setIsActive(true);

    if (text === paragraph) {
      setFinished(true);
      calculateStats(text);
    }
  };

  const calculateStats = (typed) => {
    const minutes = time / 60 || 0.1;
    const words = typed.trim().split(/\s+/).length;
    const calculatedWpm = Math.round(words / minutes);
    
    let correct = 0;
    for (let i = 0; i < paragraph.length; i++) {
      if (typed[i] === paragraph[i]) correct++;
    }
    const calculatedAccuracy = Math.round((correct / paragraph.length) * 100);
    
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  const handleReset = () => {
    setTypedText('');
    setIsActive(false);
    setTime(0);
    setWpm(0);
    setAccuracy(0);
    setFinished(false);
    setParagraph(testParagraphs[Math.floor(Math.random() * testParagraphs.length)]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">⌨️ Typing Speed Test</h1>
          <p className="text-gray-400 text-lg">Test your typing speed and accuracy</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Stats */}
          <motion.div variants={itemVariants}>
            <AnimatedCard className="glass p-6 rounded-xl">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Time</p>
                  <p className="text-cyan-400 font-black text-2xl">{formatTime(time)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">WPM</p>
                  <p className="text-purple-400 font-black text-2xl">{wpm}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Accuracy</p>
                  <p className="text-green-400 font-black text-2xl">{accuracy}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Progress</p>
                  <p className="text-blue-400 font-black text-2xl">{Math.round((typedText.length / paragraph.length) * 100)}%</p>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Progress Bar */}
          <motion.div variants={itemVariants}>
            <Progress
              percent={Math.round((typedText.length / paragraph.length) * 100)}
              strokeColor={{
                '0%': '#00f2ff',
                '100%': '#7000ff',
              }}
            />
          </motion.div>

          {/* Test Paragraph */}
          <motion.div variants={itemVariants}>
            <AnimatedCard className="glass p-8 rounded-xl">
              <div className="bg-black/50 p-6 rounded-lg mb-6 min-h-[120px]">
                <p className="text-lg leading-relaxed">
                  {paragraph.split('').map((char, idx) => (
                    <span
                      key={idx}
                      className={`
                        ${typedText[idx] === undefined
                          ? 'text-gray-500'
                          : typedText[idx] === char
                          ? 'text-green-400 font-bold'
                          : 'text-red-400 font-bold'
                        }
                      `}
                    >
                      {char}
                    </span>
                  ))}
                </p>
              </div>

              <textarea
                value={typedText}
                onChange={handleTyping}
                disabled={finished}
                placeholder="Click here and start typing..."
                className="w-full h-32 p-4 bg-gray-900 border border-cyan-500/30 rounded-lg text-white resize-none focus:border-cyan-500 focus:outline-none"
              />
            </AnimatedCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4">
            {!isActive && !finished ? (
              <GradientButton onClick={handleStart} className="flex-1 py-3 flex items-center justify-center gap-2">
                <Play size={20} /> Start Test
              </GradientButton>
            ) : finished ? (
              <GradientButton onClick={handleReset} className="flex-1 py-3 flex items-center justify-center gap-2">
                <RotateCcw size={20} /> Try Again
              </GradientButton>
            ) : null}
            <Button block className="flex-1 !h-10 bg-gray-700 border-gray-600 text-white hover:bg-gray-600" onClick={handleReset}>
              Reset
            </Button>
          </motion.div>

          {/* Results */}
          {finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              variants={itemVariants}
            >
              <AnimatedCard className="glass p-8 rounded-xl border border-green-500/30 bg-green-500/10">
                <h2 className="text-3xl font-black text-green-400 mb-6">🎉 Test Complete!</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">Words Per Minute</p>
                    <p className="text-4xl font-black text-cyan-400">{wpm}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Accuracy</p>
                    <p className="text-4xl font-black text-green-400">{accuracy}%</p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TypingTestEnhanced;
