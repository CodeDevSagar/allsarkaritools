import React, { useState } from 'react';
import { Card, Input, Button, Progress, Typography, Space, Row, Col, message } from 'antd';
import { Heart, Share2, RefreshCw, Sparkles, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;

const LoveCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      return message.warning('Please enter both names!');
    }

    setLoading(true);
    setPercentage(null);

    // Dynamic but deterministic love percentage calculation based on names
    setTimeout(() => {
      const combinedNames = (name1 + name2).toLowerCase().replace(/\s+/g, '');
      let sum = 0;
      for (let i = 0; i < combinedNames.length; i++) {
        sum += combinedNames.charCodeAt(i);
      }
      
      // Map to 40 - 100 range to keep it positive and fun
      const score = 40 + (sum % 61);

      let textAdvice = '';
      if (score >= 90) textAdvice = '🔥 Ultimate Soulmates! A match made in heaven!';
      else if (score >= 75) textAdvice = '💖 Beautiful Connection. The chemistry is electric!';
      else if (score >= 60) textAdvice = '😊 Great Friends & High Compatibility. Mutual respect!';
      else textAdvice = '🌱 Keep growing. Friendship is the best foundation!';

      setPercentage(score);
      setAdvice(textAdvice);
      setLoading(false);
      message.success('Compatibility calculated! 💘');
    }, 1500);
  };

  const handleShare = () => {
    const text = `Love Compatibility Check:
👩‍❤️‍👨 ${name1} + ${name2} = ${percentage}% Love Match!
${advice}
Calculate yours at AllSarkari Tools!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Love Compatibility Result',
        text: text,
        url: window.location.href,
      }).catch(err => console.log('Share canceled', err));
    } else {
      navigator.clipboard.writeText(text);
      message.success('Results copied to share! 📋');
    }
  };

  const resetFields = () => {
    setName1('');
    setName2('');
    setPercentage(null);
    setAdvice('');
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#ff007f]/10 border border-[#ff007f]/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Heart size={16} className="text-[#ff007f] animate-pulse" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Fun Suite • Interactive Matchmaker</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Love Calculator</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Check compatibility index and relationship advice between you and your partner.
        </Paragraph>
      </div>

      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} md={16} lg={12}>
          <Card className="glass-card !p-8 text-center relative overflow-hidden">
            {/* Pulsing light heart in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

            <Space direction="vertical" className="w-full" size="large">
              <Row gutter={16}>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest text-left">Your Name</Text>
                  <Input 
                    placeholder="Enter Name" 
                    value={name1} 
                    onChange={e => setName1(e.target.value)} 
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12 text-center font-bold"
                  />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest text-left">Partner's Name</Text>
                  <Input 
                    placeholder="Enter Name" 
                    value={name2} 
                    onChange={e => setName2(e.target.value)} 
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12 text-center font-bold"
                  />
                </Col>
              </Row>

              <div className="flex gap-4">
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={calculateLove} 
                  loading={loading}
                  className="neon-button flex-grow !h-14 !bg-gradient-to-r !from-[#ff007f] !to-[#ff4500] !border-none !text-white font-black uppercase"
                >
                  Calculate Compatibility
                </Button>
                {percentage !== null && (
                  <Button size="large" icon={<RefreshCw size={16} />} onClick={resetFields} className="!bg-white/5 !border-white/10 !text-gray-400 !h-14" />
                )}
              </div>

              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-12 flex flex-col items-center gap-4">
                    <Heart size={64} className="text-red-500 animate-ping" />
                    <Text className="text-gray-400 font-bold tracking-widest uppercase text-xs">Finding matches...</Text>
                  </motion.div>
                )}

                {!loading && percentage !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="space-y-6 pt-6 border-t border-white/5"
                  >
                    {/* Avatars display */}
                    <div className="flex justify-center gap-6 mb-4">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                      >
                        <img src="/avatar_boy.png" alt="Boy Avatar" className="w-20 h-20 rounded-full border-2 border-primary/50 shadow-lg object-cover" />
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-full truncate max-w-[80px]">{name1}</span>
                      </motion.div>

                      <div className="flex items-center text-red-500 animate-pulse text-2xl">❤️</div>

                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                      >
                        <img src="/avatar_girl.png" alt="Girl Avatar" className="w-20 h-20 rounded-full border-2 border-pink-500/50 shadow-lg object-cover" />
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full truncate max-w-[80px]">{name2}</span>
                      </motion.div>
                    </div>
                    <div className="relative inline-block">
                      <Progress 
                        type="circle" 
                        percent={percentage} 
                        strokeColor={{ '0%': '#ff007f', '100%': '#ff4500' }}
                        width={160}
                        strokeWidth={10}
                        className="custom-love-progress font-black"
                      />
                      <Sparkles size={24} className="text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                    </div>

                    <div className="space-y-2">
                      <Title level={4} className="!text-white !m-0 font-black">{name1} & {name2}</Title>
                      <Paragraph className="!text-[#ff007f] font-bold text-lg">{advice}</Paragraph>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button 
                        type="primary" 
                        icon={<Share2 size={16} />} 
                        onClick={handleShare}
                        className="!bg-white/10 !border-white/10 !text-white hover:!bg-white/20 font-bold"
                      >
                        Share Match Result
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Space>
          </Card>
        </Col>
      </Row>

      <ToolContent toolKey="love-calculator" />
    </div>
  );
};

export default LoveCalculator;
