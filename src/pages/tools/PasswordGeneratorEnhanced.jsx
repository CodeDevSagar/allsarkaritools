import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Input, Button, message, Row, Col, Slider, Segmented } from 'antd';
import { Zap, Copy, RotateCcw, Check } from 'lucide-react';
import GradientButton from '../../components/GradientButton';
import AnimatedCard from '../../components/AnimatedCard';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [strength, setStrength] = useState('medium');

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (chars === '') {
      message.error('Please select at least one option');
      return;
    }

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(pwd);
    calculateStrength(pwd);
  };

  const calculateStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (pwd.length >= 16) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd)) strength++;

    if (strength < 2) setStrength('weak');
    else if (strength < 4) setStrength('medium');
    else if (strength < 6) setStrength('strong');
    else setStrength('very-strong');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    message.success('Password copied!');
  };

  const strengthColor = {
    weak: 'from-red-500 to-red-600',
    medium: 'from-yellow-500 to-yellow-600',
    strong: 'from-blue-500 to-blue-600',
    'very-strong': 'from-green-500 to-green-600'
  };

  const strengthLabel = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    'very-strong': 'Very Strong'
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
            <Zap className="inline mr-3 mb-1" size={40} />
            Password Generator
          </h1>
          <p className="text-xl text-gray-300">Generate strong, secure passwords instantly</p>
        </div>

        <AnimatedCard className="glass p-8 rounded-xl mb-8">
          <div className="space-y-6">
            {/* Password Display */}
            {password && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 p-6 rounded-lg"
              >
                <p className="text-gray-400 text-sm mb-2">Generated Password</p>
                <div className="flex items-center gap-3">
                  <code className="text-2xl font-mono text-cyan-400 flex-1 break-all">{password}</code>
                  <GradientButton onClick={copyToClipboard} className="bg-gradient-to-r from-cyan-500 to-blue-600">
                    <Copy size={18} />
                  </GradientButton>
                </div>
              </motion.div>
            )}

            {/* Strength Indicator */}
            {password && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Password Strength</p>
                  <motion.span
                    key={strength}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${strengthColor[strength]} text-white`}
                  >
                    {strengthLabel[strength]}
                  </motion.span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((['weak', 'medium', 'strong', 'very-strong'].indexOf(strength) + 1) / 4) * 100}%` }}
                    className={`h-full bg-gradient-to-r ${strengthColor[strength]}`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-3">Password Length: {length}</label>
              <Slider value={length} onChange={setLength} min={8} max={64} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Character Types</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.uppercase}
                    onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.lowercase}
                    onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Lowercase (a-z)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.numbers}
                    onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.symbols}
                    onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Symbols (!@#$...)</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <GradientButton onClick={generatePassword} className="flex-1">
                <Zap size={18} className="inline mr-2" />
                Generate Password
              </GradientButton>
              <GradientButton
                onClick={() => {
                  setPassword('');
                  setStrength('medium');
                }}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800"
              >
                <RotateCcw size={18} className="inline mr-2" />
                Reset
              </GradientButton>
            </div>
          </div>
        </AnimatedCard>

        {/* Tips */}
        <AnimatedCard className="glass p-6 rounded-xl" delay={0.2}>
          <h3 className="text-lg font-bold mb-4">Security Tips</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2"><Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" /> Use unique passwords for each account</li>
            <li className="flex gap-2"><Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" /> Minimum 12 characters recommended</li>
            <li className="flex gap-2"><Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" /> Use a mix of character types</li>
            <li className="flex gap-2"><Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" /> Store passwords in a secure manager</li>
          </ul>
        </AnimatedCard>
      </motion.div>
    </div>
  );
};

export default PasswordGenerator;
