import React, { useState } from 'react';
import { Card, DatePicker, Button, Typography, Row, Col, Space, Divider, Statistic, Tag } from 'antd';
import { Calculator, Calendar, Clock, RefreshCcw, Info, Shield, Check } from 'lucide-react';
import dayjs from 'dayjs';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [targetDate, setTargetDate] = useState(dayjs());
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const diff = targetDate.diff(birthDate, 'year', true);
    const years = Math.floor(diff);
    
    const birthMonth = birthDate.month();
    const targetMonth = targetDate.month();
    let months = targetMonth - birthMonth;
    if (months < 0 || (months === 0 && targetDate.date() < birthDate.date())) {
      months += 12;
    }

    const days = targetDate.diff(birthDate.add(years, 'year').add(months, 'month'), 'day');

    setResult({ years, months, days });
  };

  const reset = () => {
    setBirthDate(null);
    setTargetDate(dayjs());
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4">Eligibility Engine</Title>
        <Paragraph className="!text-gray-400 text-lg">Calculate your precise age for SSC, UPSC, and State government recruitment cutoffs.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card className="glass-card !p-8 h-full" title={<span className="text-white flex items-center gap-3 font-bold uppercase tracking-widest text-sm"><Calendar size={18} className="text-primary"/> Date Parameters</span>}>
            <Space direction="vertical" className="w-full" size="xl">
              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Date of Birth</Text>
                <DatePicker 
                  className="w-full h-16 !text-lg" 
                  format="DD-MM-YYYY"
                  value={birthDate}
                  onChange={setBirthDate}
                  placeholder="Select Birth Date"
                />
              </div>

              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Age as on (Cutoff Date)</Text>
                <DatePicker 
                  className="w-full h-16 !text-lg" 
                  format="DD-MM-YYYY"
                  value={targetDate}
                  onChange={setTargetDate}
                  placeholder="Select Cutoff Date"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button block size="large" onClick={reset} className="!h-16 !rounded-2xl !bg-white/5 !text-white !border-white/10" icon={<RefreshCcw size={18} />}>Reset</Button>
                <Button 
                  block 
                  type="primary" 
                  size="large" 
                  className="neon-button !h-16 !text-lg" 
                  icon={<Calculator size={22} />}
                  onClick={calculateAge}
                >
                  Verify Age
                </Button>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="glass-card h-full !p-8 flex flex-col justify-center relative overflow-hidden">
            {result ? (
              <div className="text-center animate-in zoom-in duration-700 relative z-10">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                  <Check size={32} className="text-primary" />
                </div>
                <Title level={4} className="!text-white font-black uppercase tracking-[0.2em] mb-10">Verified Eligibility</Title>
                
                <Row gutter={[20, 20]}>
                  <Col span={8}>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-xl">
                      <Statistic title={<span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Years</span>} value={result.years} valueStyle={{ color: '#00f2ff', fontWeight: '900', fontSize: '2.5rem' }} />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-xl">
                      <Statistic title={<span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Months</span>} value={result.months} valueStyle={{ color: '#00f2ff', fontWeight: '900', fontSize: '2.5rem' }} />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-xl">
                      <Statistic title={<span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Days</span>} value={result.days} valueStyle={{ color: '#00f2ff', fontWeight: '900', fontSize: '2.5rem' }} />
                    </div>
                  </Col>
                </Row>
                
                <Divider className="!my-10 border-white/5" />
                
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    <Clock size={16} className="text-primary" />
                    <Text className="text-primary font-bold text-xs uppercase tracking-widest">Precise Calculation</Text>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 opacity-20">
                <Calculator size={100} className="mx-auto mb-6 text-gray-500" />
                <Title level={3} className="!text-gray-500 !font-black uppercase tracking-widest">Result Ready</Title>
                <Paragraph className="text-gray-600">Enter your dates in the panel to verify eligibility.</Paragraph>
              </div>
            )}
            
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full translate-x-32 translate-y-32" />
          </Card>
        </Col>
      </Row>

      <ToolContent toolKey="age-calculator" />
    </div>
  );
};

export default AgeCalculator;
