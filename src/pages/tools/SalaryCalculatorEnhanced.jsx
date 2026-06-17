import React, { useState } from 'react';
import { DollarSign, TrendingDown, Percent } from 'lucide-react';
import { Input, Select, Slider, Row, Col, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';

const SalaryCalculatorEnhanced = () => {
  const [salary, setSalary] = useState(500000);
  const [bonus, setBonus] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [country, setCountry] = useState('india');

  const calculateTax = (grossSalary) => {
    if (country === 'india') {
      if (grossSalary <= 250000) return 0;
      if (grossSalary <= 500000) return (grossSalary - 250000) * 0.05;
      if (grossSalary <= 1000000) return (250000 * 0.05) + (grossSalary - 500000) * 0.2;
      return (250000 * 0.05) + (500000 * 0.2) + (grossSalary - 1000000) * 0.3;
    }
    return grossSalary * 0.2;
  };

  const taxRates = {
    'india': [
      { range: 'Up to 2.5L', rate: 'Nil' },
      { range: '2.5L - 5L', rate: '5%' },
      { range: '5L - 10L', rate: '20%' },
      { range: 'Above 10L', rate: '30%' },
    ],
    'usa': [
      { range: 'Up to $11k', rate: '10%' },
      { range: '$11k - $44k', rate: '12%' },
      { range: '$44k - $85k', rate: '22%' },
      { range: 'Above $85k', rate: '24%+' },
    ]
  };

  const grossSalary = salary + bonus;
  const tax = calculateTax(grossSalary);
  const pf = country === 'india' ? grossSalary * 0.12 : 0;
  const totalDeductions = tax + pf + deductions;
  const netSalary = grossSalary - totalDeductions;

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">💰 Salary Calculator</h1>
          <p className="text-gray-400 text-lg">Calculate net salary with tax and deductions</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Input Section */}
          <AnimatedCard delay={0} className="glass p-8 rounded-xl">
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <label className="text-gray-400 font-bold block mb-3">Country</label>
                <Select
                  value={country}
                  onChange={setCountry}
                  options={[
                    { label: '🇮🇳 India', value: 'india' },
                    { label: '🇺🇸 USA', value: 'usa' },
                  ]}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-3">
                  Annual Salary: <span className="text-cyan-400">{salary.toLocaleString()}</span>
                </label>
                <Slider
                  value={salary}
                  onChange={setSalary}
                  min={100000}
                  max={5000000}
                  step={10000}
                  marks={{
                    100000: '1L',
                    1000000: '10L',
                    2500000: '25L',
                    5000000: '50L',
                  }}
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-3">
                  Annual Bonus: <span className="text-green-400">{bonus.toLocaleString()}</span>
                </label>
                <Input
                  type="number"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  placeholder="0"
                  className="!bg-gray-900 !border-cyan-500/30 !text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-3">
                  Other Deductions: <span className="text-red-400">{deductions.toLocaleString()}</span>
                </label>
                <Input
                  type="number"
                  value={deductions}
                  onChange={(e) => setDeductions(Number(e.target.value))}
                  placeholder="0"
                  className="!bg-gray-900 !border-cyan-500/30 !text-white"
                />
              </div>
            </motion.div>
          </AnimatedCard>

          {/* Breakdown Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatedCard className="glass p-6 rounded-xl text-center">
              <p className="text-gray-400 text-sm mb-2">Gross Salary</p>
              <p className="text-3xl font-black text-cyan-400">{(grossSalary / 100000).toFixed(2)}L</p>
            </AnimatedCard>

            <AnimatedCard className="glass p-6 rounded-xl text-center">
              <p className="text-gray-400 text-sm mb-2">Total Deductions</p>
              <p className="text-3xl font-black text-red-400">{(totalDeductions / 100000).toFixed(2)}L</p>
            </AnimatedCard>

            <AnimatedCard className="glass p-6 rounded-xl text-center border border-green-500/30 bg-green-500/10">
              <p className="text-gray-400 text-sm mb-2">Net Salary</p>
              <p className="text-3xl font-black text-green-400">{(netSalary / 100000).toFixed(2)}L</p>
            </AnimatedCard>
          </motion.div>

          {/* Detailed Breakdown */}
          <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">📊 Detailed Breakdown</h2>
            <div className="space-y-3">
              <Row className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
                <Col span={16} className="text-gray-400">Gross Salary</Col>
                <Col span={8} className="text-right text-cyan-400 font-bold">{grossSalary.toLocaleString()}</Col>
              </Row>
              <Row className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                <Col span={16} className="text-gray-400">Income Tax ({country === 'india' ? 'Slab' : '20%'})</Col>
                <Col span={8} className="text-right text-red-400 font-bold">{Math.round(tax).toLocaleString()}</Col>
              </Row>
              {country === 'india' && (
                <Row className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                  <Col span={16} className="text-gray-400">PF (12%)</Col>
                  <Col span={8} className="text-right text-purple-400 font-bold">{Math.round(pf).toLocaleString()}</Col>
                </Row>
              )}
              <Row className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                <Col span={16} className="text-gray-400">Other Deductions</Col>
                <Col span={8} className="text-right text-orange-400 font-bold">{deductions.toLocaleString()}</Col>
              </Row>
              <Row className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 font-bold">
                <Col span={16} className="text-green-400">Net Salary (Monthly)</Col>
                <Col span={8} className="text-right text-green-400 font-black">{Math.round(netSalary / 12).toLocaleString()}</Col>
              </Row>
            </div>
          </AnimatedCard>

          {/* Tax Slab Info */}
          <AnimatedCard delay={0.2} className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">📋 Tax Slabs ({country === 'india' ? 'India' : 'USA'} FY 2024-25)</h2>
            <div className="space-y-2">
              {taxRates[country].map((slab, idx) => (
                <Row key={idx} className="bg-white/5 p-3 rounded-lg">
                  <Col span={16} className="text-gray-400">{slab.range}</Col>
                  <Col span={8} className="text-right text-cyan-400 font-bold">{slab.rate}</Col>
                </Row>
              ))}
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SalaryCalculatorEnhanced;
