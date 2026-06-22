import React, { useState } from 'react';
import { Card, Input, Button, Radio, Table, Typography, Space, Row, Col, message } from 'antd';
import { Calculator, Copy, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;

const GstCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState('exclusive'); // exclusive or inclusive
  const [result, setResult] = useState(null);

  const calculateGst = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      return message.warning('Please enter a valid amount');
    }

    let gstAmount = 0;
    let totalAmount = 0;
    let netAmount = amt;

    if (gstType === 'exclusive') {
      gstAmount = (amt * gstRate) / 100;
      totalAmount = amt + gstAmount;
    } else {
      totalAmount = amt;
      netAmount = amt / (1 + gstRate / 100);
      gstAmount = totalAmount - netAmount;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    setResult({
      netAmount: netAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const resetFields = () => {
    setAmount('');
    setResult(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const summary = `GST Calculation Summary:
Base/Net Amount: ₹${result.netAmount}
GST Rate: ${gstRate}% (${gstType.toUpperCase()})
CGST (50%): ₹${result.cgst}
SGST (50%): ₹${result.sgst}
Total GST: ₹${result.gstAmount}
Total Gross Amount: ₹${result.totalAmount}`;
    navigator.clipboard.writeText(summary);
    message.success('Summary copied to clipboard! 📋');
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Calculator size={16} className="text-primary animate-pulse" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Financial Suite • 100% Secure</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">GST Calculator</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Calculate CGST, SGST, IGST inclusive and exclusive amounts instantly.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="glass-card !p-8">
              <Space direction="vertical" className="w-full" size="large">
                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Amount (₹)</Text>
                  <Input 
                    type="number" 
                    placeholder="Enter amount e.g. 10000" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12"
                  />
                </div>

                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">GST Rate (%)</Text>
                  <Radio.Group value={gstRate} onChange={e => setGstRate(e.target.value)} className="w-full">
                    <Row gutter={[8, 8]}>
                      {[5, 12, 18, 28].map(rate => (
                        <Col span={6} key={rate}>
                          <Radio.Button value={rate} className="w-full text-center font-bold !bg-white/5 !border-white/10 !text-white hover:!text-primary">
                            {rate}%
                          </Radio.Button>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                </div>

                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Calculation Type</Text>
                  <Radio.Group value={gstType} onChange={e => setGstType(e.target.value)} className="flex gap-4">
                    <Radio value="exclusive" className="!text-white font-bold">GST Exclusive (Add GST)</Radio>
                    <Radio value="inclusive" className="!text-white font-bold">GST Inclusive (Remove GST)</Radio>
                  </Radio.Group>
                </div>

                <div className="flex gap-4 mt-4">
                  <Button type="primary" size="large" onClick={calculateGst} className="neon-button flex-grow !h-14">
                    Calculate GST
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
                      <FileText size={16} className="text-primary" /> Calculation Breakup
                    </Title>
                    <Button icon={<Copy size={14} />} onClick={handleCopy} className="!bg-white/5 !border-white/10 !text-white">
                      Copy Result
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Text className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Base Amount (Net)</Text>
                      <Text className="text-white text-xl font-black">₹{result.netAmount}</Text>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Text className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Total GST Amount</Text>
                      <Text className="text-primary text-xl font-black">₹{result.gstAmount}</Text>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Text className="text-gray-500 text-xs block uppercase tracking-widest mb-1">CGST (Central GST)</Text>
                      <Text className="text-secondary text-xl font-black">₹{result.cgst}</Text>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Text className="text-gray-500 text-xs block uppercase tracking-widest mb-1">SGST (State GST)</Text>
                      <Text className="text-secondary text-xl font-black">₹{result.sgst}</Text>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/10 border border-primary/20 rounded-[2rem] text-center">
                    <Text className="text-gray-400 text-xs block uppercase tracking-widest mb-1">Total Gross Price (Gross)</Text>
                    <Text className="text-white text-3xl font-black">₹{result.totalAmount}</Text>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <Calculator size={48} className="text-gray-700 mb-4 animate-bounce" />
                  <Text className="text-gray-500 text-sm">Enter transaction details and click Calculate to view details.</Text>
                </div>
              )}
            </Card>
          </motion.div>
        </Col>
      </Row>

      <ToolContent toolKey="gst-calculator" />
    </div>
  );
};

export default GstCalculator;
