import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Input, Button, message, Row, Col, Select, DatePicker } from 'antd';
import { Calculator, Copy, RotateCcw } from 'lucide-react';
import dayjs from 'dayjs';
import GradientButton from '../../components/GradientButton';
import AnimatedCard from '../../components/AnimatedCard';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) {
      message.error('Please select your birth date');
      return;
    }

    const today = dayjs();
    const birth = dayjs(birthDate);
    
    let years = today.diff(birth, 'years');
    let months = today.diff(birth.add(years, 'years'), 'months');
    let days = today.diff(birth.add(years, 'years').add(months, 'months'), 'days');

    const nextBirthday = birth.add(years + 1, 'years');
    const daysUntilBirthday = nextBirthday.diff(today, 'days');

    setResult({
      years,
      months,
      days,
      totalDays: today.diff(birth, 'days'),
      daysUntilBirthday,
      zodiac: getZodiacSign(birth.month() + 1, birth.date())
    });
  };

  const getZodiacSign = (month, day) => {
    const zodiacSigns = [
      { sign: 'Capricorn ♑', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius ♒', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces ♓', start: [2, 19], end: [3, 20] },
      { sign: 'Aries ♈', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus ♉', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini ♊', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer ♋', start: [6, 21], end: [7, 22] },
      { sign: 'Leo ♌', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo ♍', start: [8, 23], end: [9, 22] },
      { sign: 'Libra ♎', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio ♏', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius ♐', start: [11, 22], end: [12, 21] }
    ];

    for (let zodiac of zodiacSigns) {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;

      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return zodiac.sign;
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 gradient-text">
            <Calculator className="inline mr-3 mb-1" size={40} />
            Age Calculator
          </h1>
          <p className="text-xl text-gray-300">Calculate your exact age in years, months, and days</p>
        </div>

        <AnimatedCard className="glass p-8 rounded-xl mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Select Your Birth Date</label>
              <DatePicker
                value={birthDate}
                onChange={setBirthDate}
                style={{ width: '100%' }}
                placeholder="Click to select date"
              />
            </div>

            <div className="flex gap-4">
              <GradientButton onClick={calculateAge} className="flex-1">
                <Calculator size={18} className="inline mr-2" />
                Calculate Age
              </GradientButton>
              <GradientButton
                onClick={() => {
                  setBirthDate(null);
                  setResult(null);
                }}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800"
              >
                <RotateCcw size={18} className="inline mr-2" />
                Reset
              </GradientButton>
            </div>
          </div>
        </AnimatedCard>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Main Results */}
            <AnimatedCard className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Your Age</h2>
              <div className="space-y-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
                  <p className="text-gray-400 text-sm">Years</p>
                  <p className="text-4xl font-black text-blue-400">{result.years}</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
                  <p className="text-gray-400 text-sm">Months</p>
                  <p className="text-3xl font-bold text-purple-400">{result.months}</p>
                </div>
                <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/50">
                  <p className="text-gray-400 text-sm">Days</p>
                  <p className="text-3xl font-bold text-cyan-400">{result.days}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Additional Info */}
            <AnimatedCard className="glass p-6 rounded-xl" delay={0.1}>
              <h2 className="text-2xl font-bold mb-6 gradient-text">More Info</h2>
              <div className="space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                  <p className="text-gray-400 text-sm">Total Days Lived</p>
                  <p className="text-3xl font-bold text-green-400">{result.totalDays.toLocaleString()}</p>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/50">
                  <p className="text-gray-400 text-sm">Days Until Next Birthday</p>
                  <p className="text-3xl font-bold text-orange-400">{result.daysUntilBirthday}</p>
                </div>
                <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/50">
                  <p className="text-gray-400 text-sm">Zodiac Sign</p>
                  <p className="text-2xl font-bold text-pink-400">{result.zodiac}</p>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AgeCalculator;
