import React from 'react';
import { Typography, Card, Space } from 'antd';
import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Scale size={40} className="text-secondary" />
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Terms of Use</h1>
        <Paragraph className="!text-gray-400 text-lg">Simple rules for using our elite tools.</Paragraph>
      </div>

      <Card className="glass-card !p-10 border-none">
        <Space direction="vertical" size="large" className="w-full">
          <section>
            <Title level={3} className="!text-white !mb-4">1. Acceptance of Terms</Title>
            <Paragraph className="!text-gray-400 text-lg">
              By accessing Sarkari Tools, you agree to use these tools for lawful purposes, specifically for preparing documents for government examinations and recruitment.
            </Paragraph>
          </section>

          <section>
            <Title level={3} className="!text-white !mb-4">2. Ethical Use</Title>
            <Paragraph className="!text-gray-400 text-lg">
              You agree not to use the Signature Maker or Resume Builder to forge documents or impersonate others. These tools are intended for your own professional use.
            </Paragraph>
          </section>

          <section>
            <Title level={3} className="!text-white !mb-4">3. No Warranty</Title>
            <Paragraph className="!text-gray-400 text-lg">
              While we strive for 100% accuracy in photo resizing and PDF merging, we recommend you double-check the final file specifications against the official government notification before submitting.
            </Paragraph>
          </section>

          <section>
            <Title level={3} className="!text-white !mb-4">4. Free to Use</Title>
            <Paragraph className="!text-gray-400 text-lg">
              Our tools are completely free for aspirants. We do not charge any subscription or per-use fee.
            </Paragraph>
          </section>
        </Space>
      </Card>
    </div>
  );
};

export default TermsOfUse;
