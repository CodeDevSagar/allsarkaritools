import React from 'react';
import { Typography, Card, Space } from 'antd';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Shield size={40} className="text-primary" />
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Privacy Policy</h1>
        <Paragraph className="!text-gray-400 text-lg">Your data is yours. We just provide the tools.</Paragraph>
      </div>

      <Card className="glass-card !p-10 border-none">
        <Space direction="vertical" size="large" className="w-full">
          <section>
            <Title level={3} className="!text-white !mb-4">1. 100% Client-Side Processing</Title>
            <Paragraph className="!text-gray-400 text-lg">
              Sarkari Tools is built with a "Privacy First" architecture. Unlike other online utilities, we do NOT upload your documents, photos, or signatures to any server. All processing (resizing, merging, PDF generation) happens locally in your browser's memory.
            </Paragraph>
          </section>

          <section>
            <Title level={3} className="!text-white !mb-4">2. Data Collection</Title>
            <Paragraph className="!text-gray-400 text-lg">
              We do not collect any personal identifiable information (PII). We do not use tracking cookies that identify you. We may use anonymized analytics to improve tool performance, but your actual files never touch our servers.
            </Paragraph>
          </section>

          <section>
            <Title level={3} className="!text-white !mb-4">3. Security</Title>
            <Paragraph className="!text-gray-400 text-lg">
              Since your data never leaves your device, it is protected by your own system's security. We recommend using the tools on a secure, private device.
            </Paragraph>
          </section>

          <section>
            <Title level={3} className="!text-white !mb-4">4. Third-Party Links</Title>
            <Paragraph className="!text-gray-400 text-lg">
              Our "Portal Directory" contains links to official government websites. Once you leave our site, their respective privacy policies apply.
            </Paragraph>
          </section>
        </Space>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
