import React from 'react';
import { Typography, Card, Space, Divider } from 'antd';
import { Shield, Lock, Eye, FileText, Server, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingParticles from '../../components/FloatingParticles';
import AdSlot from '../../components/AdSlot';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="bg-[#080415] min-h-screen text-white relative overflow-hidden font-sans pb-24 pt-12">
      {/* Animated Particles background */}
      <FloatingParticles count={60} color="#00f2ff" />

      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto py-12 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_20px_rgba(0,242,255,0.2)]"
          >
            <Shield size={40} className="text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="responsive-title !text-white !mb-4 tracking-tighter uppercase"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="!text-gray-400 text-lg sm:text-xl font-medium"
          >
            Your data is strictly yours. Read our complete privacy roadmap.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card !p-8 border-none relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#00f2ff]/5 rounded-full blur-[60px]" />
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <Lock className="text-primary" size={24} /> 1. Overview & Core Philosophy
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    At AllSarkariTools, we operate under a simple, non-negotiable creed: <strong>Your privacy is our highest priority.</strong> When competitive exam aspirants use online utilities to prepare signatures, photos, and academic resumes, they are often forced to upload highly sensitive personal information to remote servers. This introduces massive security risks, including identity theft, server breaches, and data commercialization.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    We solved this problem by completely eliminating the "server" from the document processing equation. Our website is built as an offline-first client-side platform. This means that all compression, background removal, PDF conversions, and editing algorithms execute exclusively in your device's browser memory (RAM).
                  </Paragraph>
                </section>
              </Space>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card !p-8 border-none relative overflow-hidden group">
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <Server className="text-secondary" size={24} /> 2. 100% Client-Side Processing Architecture
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    How do we process files without uploading them? When you select an image, draft a signature, or import a PDF file on our platform:
                  </Paragraph>
                  <ul className="list-disc pl-6 space-y-3 text-gray-400 text-base">
                    <li>The web page uses HTML5 File API to read the selected file directly from your local filesystem into the browser's local sandbox memory.</li>
                    <li>For image adjustments and passport photo scaling, our client-side Javascript redraws the image into HTML5 Canvas grids, performing quality adjustments dynamically.</li>
                    <li>For advanced operations like background removal, we run lightweight artificial intelligence models (such as ONNX Runtime WebAssembly modules) directly in your web browser. The AI model is downloaded once and runs locally on your GPU/CPU via WebGL/WebGPU.</li>
                    <li>For PDF tools, libraries like jsPDF compile the document entirely on your computer's browser, compiling vector data and outputting the downloaded file instantly.</li>
                  </ul>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed mt-4">
                    Because your files are loaded only into your volatile browser memory, closing the browser tab or reloading the page immediately purges all trace data from your system's RAM. No temporary caches or historical traces remain.
                  </Paragraph>
                </section>
              </Space>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card !p-8 border-none relative overflow-hidden group">
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <Eye className="text-accent" size={24} /> 3. Data Collection and Analytical Logs
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>Zero Personal Data Collection:</strong> We do not ask for, collect, or store any personal data. You do not need to register, log in, or provide an email address, phone number, or name to use any of our features.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>Anonymized Traffic Logs:</strong> To monitor platform health and guard against malicious web attacks, we may collect anonymous server performance logs (such as system load, response codes, and anonymized access logs). These technical logs are standard for hosting providers and do not contain any of your uploaded files or private inputs.
                  </Paragraph>
                </section>
              </Space>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card !p-8 border-none relative overflow-hidden group">
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <AlertCircle className="text-[#ff8c2b]" size={24} /> 4. Ad Services and Third-Party Cookie Standards
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    To keep AllSarkariTools completely free for millions of students, we show Google AdSense advertisements on our platform. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites on the internet.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites. Users may opt out of personalized advertising by visiting Google's Ads Settings page.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>Crucial Safety Assurance:</strong> The ad network frames and scripts are completely sandboxed by browser security policies. These external ads have absolutely zero access to the local image uploads, canvas streams, signatures, or document details you process on our tools page.
                  </Paragraph>
                </section>
              </Space>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card !p-8 border-none relative overflow-hidden group">
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <FileText className="text-purple-400" size={24} /> 5. Integration with CodeEducationHub
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    AllSarkariTools works in close partnership with <a href="https://codeeducationhub.com/" target="_blank" rel="noopener noreferrer" className="text-[#00f2ff] font-bold hover:underline">CodeEducationHub</a>. CodeEducationHub offers competitive exam syllabus preparation, mock test papers, study guidelines, and educational content.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    We do not share any candidate documentation data with CodeEducationHub since we do not collect it in the first place. This relationship is strictly educational, helping direct students who need competitive study materials to their portal, while providing their students with secure, privacy-first formatting tools here.
                  </Paragraph>
                </section>
              </Space>
            </Card>
          </motion.div>
        </motion.div>

        <Divider className="!my-12 border-white/5" />

        <AdSlot slot="4433221100" />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
