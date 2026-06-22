import React, { useState } from 'react';
import { Card, Input, Button, Slider, Typography, Space, Row, Col, message } from 'antd';
import { Landmark, Copy, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [result, setResult] = useState(null);

  const calculateSip = () => {
    const P = parseFloat(monthlyInvestment);
    const i = parseFloat(expectedReturnRate) / 12 / 100;
    const n = parseFloat(timePeriod) * 12;

    if (isNaN(P) || P <= 0 || isNaN(expectedReturnRate) || expectedReturnRate <= 0 || isNaN(timePeriod) || timePeriod <= 0) {
      return message.warning('Please enter valid input values');
    }

    // Formula: M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const wealthGained = futureValue - totalInvested;

    setResult({
      totalInvested: Math.round(totalInvested).toLocaleString('en-IN'),
      wealthGained: Math.round(wealthGained).toLocaleString('en-IN'),
      futureValue: Math.round(futureValue).toLocaleString('en-IN'),
    });
  };

  const resetFields = () => {
    setMonthlyInvestment(5000);
    setExpectedReturnRate(12);
    setTimePeriod(10);
    setResult(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const summary = `SIP Investment Plan Summary:
Monthly SIP Amount: ₹${monthlyInvestment}
Expected Annual Return: ${expectedReturnRate}%
Duration: ${timePeriod} Years
Total Amount Invested: ₹${result.totalInvested}
Wealth Gain Estimation: ₹${result.wealthGained}
Future Value (Maturity Amount): ₹${result.futureValue}`;
    navigator.clipboard.writeText(summary);
    message.success('Summary copied to clipboard! 📋');
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Landmark size={16} className="text-primary animate-pulse" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Investment Suite • 100% Client-Side</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">SIP Calculator</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Estimate the potential maturity returns of your monthly Systematic Investment Plan (SIP).
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="glass-card !p-8">
              <Space direction="vertical" className="w-full" size="large">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Monthly Investment (₹)</Text>
                    <Text className="text-primary font-bold">₹{monthlyInvestment.toLocaleString('en-IN')}</Text>
                  </div>
                  <Slider 
                    min={500} 
                    max={100000} 
                    step={500} 
                    value={monthlyInvestment} 
                    onChange={setMonthlyInvestment}
                    className="custom-slider-cyan"
                  />
                  <Input 
                    type="number"
                    value={monthlyInvestment}
                    onChange={e => setMonthlyInvestment(Number(e.target.value))}
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-10 mt-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Expected Return Rate (% p.a.)</Text>
                    <Text className="text-primary font-bold">{expectedReturnRate}%</Text>
                  </div>
                  <Slider 
                    min={1} 
                    max={30} 
                    step={0.5} 
                    value={expectedReturnRate} 
                    onChange={setExpectedReturnRate}
                    className="custom-slider-cyan"
                  />
                  <Input 
                    type="number"
                    value={expectedReturnRate}
                    onChange={e => setExpectedReturnRate(Number(e.target.value))}
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-10 mt-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Time Period (Years)</Text>
                    <Text className="text-primary font-bold">{timePeriod} Years</Text>
                  </div>
                  <Slider 
                    min={1} 
                    max={40} 
                    step={1} 
                    value={timePeriod} 
                    onChange={setTimePeriod}
                    className="custom-slider-cyan"
                  />
                  <Input 
                    type="number"
                    value={timePeriod}
                    onChange={e => setTimePeriod(Number(e.target.value))}
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-10 mt-2"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <Button type="primary" size="large" onClick={calculateSip} className="neon-button flex-grow !h-14">
                    Calculate Investment
                  </Button>
                  <Button size="large" icon={<RefreshCw size={16} />} onClick={resetFields} className="!bg-white/5 !border-white/10 !text-gray-400 !h-14">
                    Reset
                  </Button>
                </div>
              </Space>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={12}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="glass-card !p-8 h-full flex flex-col justify-between">
              {result ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <Title level={4} className="!text-white !m-0 uppercase tracking-widest text-xs flex items-center gap-2">
                      <FileText size={16} className="text-primary" /> Investment Estimates
                    </Title>
                    <Button icon={<Copy size={14} />} onClick={handleCopy} className="!bg-white/5 !border-white/10 !text-white">
                      Copy Result
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Text className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Total Invested Amount</Text>
                      <Text className="text-white text-xl font-black">₹{result.totalInvested}</Text>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Text className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Est. Wealth Gain</Text>
                      <Text className="text-green-400 text-xl font-black">₹{result.wealthGained}</Text>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/10 border border-primary/20 rounded-[2rem] text-center">
                    <Text className="text-gray-400 text-xs block uppercase tracking-widest mb-1">Future Value (Maturity Amount)</Text>
                    <Text className="text-white text-3xl font-black">₹{result.futureValue}</Text>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <Landmark size={48} className="text-gray-700 mb-4 animate-bounce" />
                  <Text className="text-gray-500 text-sm">Adjust parameters and click Calculate to simulate maturity growth.</Text>
                </div>
              )}
            </Card>
          </motion.div>
        </Col>
      </Row>

      <ToolContent toolKey="sip-calculator" />
    </div>
  );
};

export default SipCalculator;
