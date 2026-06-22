import React, { useState, useEffect } from 'react';
import { Card, Input, Button, DatePicker, Typography, Space, Row, Col, message, Progress } from 'antd';
import { Gift, Share2, RefreshCw, Calendar, Heart, Sparkles, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolContent from '../../components/ToolContent';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const GirlCelebrationAnimation = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
      {/* Outer pulsing circle */}
      <motion.div 
        className="absolute w-40 h-40 bg-pink-500/10 rounded-full border border-pink-500/20"
        animate={{ scale: [1, 1.12, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Floating balloons */}
      <motion.div 
        className="absolute -top-4 -left-4 text-3xl"
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎈
      </motion.div>
      <motion.div 
        className="absolute -top-6 -right-4 text-3xl"
        animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🎈
      </motion.div>
      {/* Floating hearts */}
      <motion.div 
        className="absolute bottom-6 -left-6 text-2xl"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        💖
      </motion.div>
      <motion.div 
        className="absolute bottom-8 -right-6 text-2xl"
        animate={{ scale: [1.2, 0.8, 1.2], opacity: [1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        💖
      </motion.div>
      {/* Cute Celebrating Girl Illustration */}
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        {/* Hair */}
        <path d="M20 50C20 20 100 20 100 50C100 55 95 65 90 70C85 75 75 75 75 75C75 75 65 78 60 78C55 78 45 75 45 75C45 75 35 75 30 70C25 65 20 55 20 50Z" fill="#ff75a0" />
        <circle cx="35" cy="70" r="10" fill="#ff75a0" />
        <circle cx="85" cy="70" r="10" fill="#ff75a0" />
        {/* Face */}
        <circle cx="60" cy="55" r="30" fill="#ffe0bd" />
        {/* Eyes (smiling arcs) */}
        <path d="M48 55C50 58 54 58 56 55" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M64 55C66 58 70 58 72 55" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        {/* Blush */}
        <circle cx="43" cy="62" r="4" fill="#ff7a90" opacity="0.6" />
        <circle cx="77" cy="62" r="4" fill="#ff7a90" opacity="0.6" />
        {/* Smile */}
        <path d="M55 65C57 68 63 68 65 65" stroke="#ff3b7e" strokeWidth="3" strokeLinecap="round" />
        {/* Party Hat */}
        <path d="M42 28L60 2L78 28Z" fill="#ff3b7e" />
        <circle cx="60" cy="2" r="5" fill="#ffcc00" />
        <path d="M48 22L72 22" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
        {/* Collar & Dress */}
        <path d="M45 84L60 92L75 84L85 115H35L45 84Z" fill="#7000ff" />
        <path d="M45 84C50 88 70 88 75 84" fill="#ffe0bd" />
        {/* Birthday Cake held in hands */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Cake Base */}
          <rect x="42" y="85" width="36" height="15" rx="3" fill="#ffb700" />
          <rect x="45" y="88" width="30" height="4" fill="#ff4d4f" />
          {/* Candle */}
          <rect x="58" y="77" width="4" height="8" fill="#fff" />
          <path d="M60 71C61 73 61 75 60 77C59 75 59 73 60 71Z" fill="#ff4d4f" />
        </motion.g>
      </svg>
    </div>
  );
};

const BirthdayCountdown = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [ageInfo, setAgeInfo] = useState(null);

  // Boy and Girl name states
  const [boyName, setBoyName] = useState('');
  const [girlName, setGirlName] = useState('');
  const [lovePercentage, setLovePercentage] = useState(null);

  useEffect(() => {
    if (!birthDate) return;

    const interval = setInterval(() => {
      const today = dayjs();
      let bdate = dayjs(birthDate);
      
      // Calculate next birthday date
      let nextBirthday = dayjs(`${today.year()}-${bdate.month() + 1}-${bdate.date()}`);
      if (nextBirthday.isBefore(today, 'day')) {
        nextBirthday = nextBirthday.add(1, 'year');
      }

      const diffMs = nextBirthday.diff(today);
      if (diffMs <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({ days, hours, minutes, seconds });

      const years = today.diff(bdate, 'year');
      setAgeInfo({
        currentAge: years,
        nextAge: years + 1,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  // Dynamically calculate Love compatibility if both names are entered
  useEffect(() => {
    if (boyName.trim() && girlName.trim()) {
      const combined = (boyName + girlName).toLowerCase().replace(/\s+/g, '');
      let sum = 0;
      for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
      }
      const score = 50 + (sum % 51); // 50 to 100 range
      setLovePercentage(score);
    } else {
      setLovePercentage(null);
    }
  }, [boyName, girlName]);

  const handleDateChange = (date) => {
    if (!date) {
      setBirthDate(null);
      setCountdown(null);
      setAgeInfo(null);
      return;
    }
    setBirthDate(date);
  };

  const handleShare = () => {
    if (!birthDate || !countdown) return;
    const formattedBday = dayjs(birthDate).format('DD MMM');
    
    let text = `🎉 Birthday Countdown Alert! 🎉\n`;
    if (boyName.trim() && girlName.trim() && lovePercentage !== null) {
      text += `👩‍❤️‍👨 ${boyName} & ${girlName} are celebrating together!\n💖 Love Match Compatibility: ${lovePercentage}%\n`;
    }
    text += `⏳ Next birthday is on ${formattedBday}!\n⏰ Only ${countdown.days} days, ${countdown.hours} hours, and ${countdown.minutes} minutes left!\n`;
    if (ageInfo) {
      text += `🎂 Turning ${ageInfo.nextAge} years old!\n`;
    }
    text += `Calculate yours at AllSarkari Tools!`;

    if (navigator.share) {
      navigator.share({
        title: 'Birthday Countdown & Love Match',
        text: text,
        url: window.location.href,
      }).catch(err => console.log('Share canceled', err));
    } else {
      navigator.clipboard.writeText(text);
      message.success('Countdown and Love Match details copied to clipboard! 📋');
    }
  };

  const resetFields = () => {
    setBirthDate(null);
    setCountdown(null);
    setAgeInfo(null);
    setBoyName('');
    setGirlName('');
    setLovePercentage(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Gift size={16} className="text-primary animate-pulse" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Time Suite • Birthday Milestone</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Birthday Countdown</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Track the remaining time until your birthday and test your relationship compatibility index.
        </Paragraph>
      </div>

      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} md={20} lg={16}>
          <Card className="glass-card !p-8 text-center relative overflow-hidden">
            
            {/* Dynamic Avatar display based on inputs */}
            <div className="flex justify-center gap-6 mb-6">
              {boyName.trim() && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <img src="/avatar_boy.png" alt="Boy Avatar" className="w-24 h-24 rounded-full border-2 border-primary/50 shadow-lg object-cover" />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Boy</span>
                </motion.div>
              )}
              
              {!boyName.trim() && !girlName.trim() && <GirlCelebrationAnimation />}

              {girlName.trim() && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <img src="/avatar_girl.png" alt="Girl Avatar" className="w-24 h-24 rounded-full border-2 border-pink-500/50 shadow-lg object-cover" />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Girl</span>
                </motion.div>
              )}
            </div>

            <Space direction="vertical" className="w-full" size="large">
              
              {/* Optional Names for Love Match */}
              <Row gutter={16}>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest text-left">Boy's Name (Optional)</Text>
                  <Input 
                    placeholder="e.g. Rahul" 
                    value={boyName} 
                    onChange={e => setBoyName(e.target.value)} 
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12 text-center font-bold"
                  />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest text-left">Girl's Name (Optional)</Text>
                  <Input 
                    placeholder="e.g. Priya" 
                    value={girlName} 
                    onChange={e => setGirlName(e.target.value)} 
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12 text-center font-bold"
                  />
                </Col>
              </Row>

              {/* Date of birth picker */}
              <div>
                <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest text-left">Select Your Birth Date</Text>
                <DatePicker 
                  onChange={handleDateChange} 
                  value={birthDate}
                  className="w-full !bg-white/5 !border-white/10 !text-white !h-12 !rounded-xl"
                  placeholder="Select Date"
                  format="DD-MM-YYYY"
                  disabledDate={(current) => current && current > dayjs().endOf('day')}
                />
              </div>

              {/* Love Percentage Card (If both names are provided) */}
              <AnimatePresence>
                {lovePercentage !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] flex flex-col items-center gap-2"
                  >
                    <div className="flex items-center gap-2 text-red-500">
                      <Heart size={20} className="animate-pulse fill-red-500" />
                      <Text className="text-red-400 font-black uppercase text-xs tracking-widest">Love Match Calculator</Text>
                    </div>
                    <Progress 
                      percent={lovePercentage} 
                      strokeColor={{ '0%': '#ff007f', '100%': '#ff4500' }}
                      className="max-w-md w-full"
                    />
                    <Text className="text-gray-300 font-bold text-sm">
                      {boyName} & {girlName} share a <span className="text-red-400">{lovePercentage}%</span> compatibility match!
                    </Text>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {countdown && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* Countdown Display Card */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-4">
                      {[
                        { label: 'Days', value: countdown.days },
                        { label: 'Hours', value: countdown.hours },
                        { label: 'Minutes', value: countdown.minutes },
                        { label: 'Seconds', value: countdown.seconds },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center">
                          <Text className="text-white text-2xl sm:text-4xl font-black">{item.value}</Text>
                          <Text className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">{item.label}</Text>
                        </div>
                      ))}
                    </div>

                    {ageInfo && (
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                        <Text className="text-gray-300 font-bold">
                          🎂 You are currently {ageInfo.currentAge} years old and will turn <span className="text-primary">{ageInfo.nextAge}</span> on your next birthday!
                        </Text>
                      </div>
                    )}

                    <div className="flex gap-4 justify-center">
                      <Button 
                        type="primary" 
                        icon={<Share2 size={16} />} 
                        onClick={handleShare}
                        className="neon-button !h-12 !px-6"
                      >
                        Share Countdown & Match
                      </Button>
                      <Button 
                        icon={<RefreshCw size={16} />} 
                        onClick={resetFields} 
                        className="!bg-white/5 !border-white/10 !text-gray-400 !h-12"
                      >
                        Reset
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!birthDate && (
                <div className="py-8 text-gray-500 flex flex-col items-center gap-4">
                  <Calendar size={48} className="text-gray-700 animate-pulse" />
                  <Text className="text-gray-500 text-sm">Please select your date of birth to start the real-time countdown timer.</Text>
                </div>
              )}
            </Space>
          </Card>
        </Col>
      </Row>

      <ToolContent toolKey="birthday-countdown" />
    </div>
  );
};

export default BirthdayCountdown;
