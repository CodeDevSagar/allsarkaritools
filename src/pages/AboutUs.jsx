import React from 'react';
import { Typography, Card, Row, Col, Space, Divider } from 'antd';
import { Shield, Sparkles, Heart, Compass, Cpu, FileText, Lock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import AdSlot from '../components/AdSlot';

const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
  const stats = [
    { label: 'Privacy Standard', value: '100% Local' },
    { label: 'Files Uploaded', value: 'Zero (0)' },
    { label: 'Processing Speed', value: 'Instant' },
    { label: 'Platform Status', value: 'Always Free' }
  ];

  return (
    <div className="bg-[#080415] min-h-screen text-white relative overflow-hidden font-sans pb-24 pt-12">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[#ff00c8]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto py-12 px-4 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="inline-flex items-center justify-center gap-2 bg-[#1b103c]/60 border border-[#7000ff]/30 px-5 py-2 rounded-full mb-6 backdrop-blur-md mx-auto"
          >
            <Sparkles size={16} className="text-[#00f2ff]" />
            <span className="text-xs font-black text-gray-300 tracking-widest uppercase">Empowering Millions of Aspirants</span>
          </motion.div>
          <Title className="!text-white !text-5xl md:!text-6xl !font-black !mb-6 tracking-tighter uppercase">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] drop-shadow-[0_0_30px_rgba(0,242,255,0.2)]">Our Platform</span>
          </Title>
          <Paragraph className="!text-gray-400 text-lg sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Welcome to AllSarkariTools—the ultimate destination for high-resolution document processing, signature tools, and exam utilities, engineered with a privacy-first local architecture.
          </Paragraph>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-card text-center !p-6 border-none hover:border-[#00f2ff]/30">
                <Text className="text-[#00f2ff] text-2xl md:text-3xl font-black block mb-2">{stat.value}</Text>
                <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest block">{stat.label}</Text>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Narrative Section - ~1000 words */}
        <Row gutter={[48, 48]} className="mb-20 text-left">
          <Col xs={24} lg={16} className="space-y-8">
            <section className="space-y-4">
              <Title level={2} className="!text-white flex items-center gap-3">
                <Compass className="text-[#ff3b7e]" /> Who We Are
              </Title>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                AllSarkariTools was founded to solve a critical, often-overlooked challenge faced by millions of competitive exam candidates in India. Every day, students preparing for UPSC, SSC, banking, railways, and state level entrance examinations are required to upload passport-sized photographs, signatures, and legal documents with strict, customized restrictions—often requiring sizes below 20KB, specific pixel dimensions, or exact formats.
              </Paragraph>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                Historically, aspirants had to rely on slow, ad-ridden third-party websites or shady cyber cafes to crop, compress, and format their images. These legacy methods posed huge security risks, exposing sensitive identity documentation, and often resulting in pixelated, distorted files that led to application rejections. We built AllSarkariTools to bring studio-quality, lightning-fast utilities directly into the candidate's browser, completely free of charge and offline-ready.
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={2} className="!text-white flex items-center gap-3">
                <Lock className="text-[#ff8c2b]" /> Privacy-First Architecture
              </Title>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                Privacy is not an afterthought for us—it is the cornerstone of our engineering philosophy. Unlike typical utility platforms that require you to upload your sensitive photographs and documents to remote cloud servers for resizing or conversion, AllSarkariTools performs 100% of its operations locally on your personal device.
              </Paragraph>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                Leveraging next-generation web technologies like WebAssembly (WASM), Client-Side Canvas APIs, and local image compression algorithms, our tools process your files right inside your browser's runtime. Your documents, signatures, and photos never touch the internet, meaning your files are fully secure from data breaches, hacking, or third-party tracking. You can even disconnect your internet entirely after launching our site and continue using the tools perfectly.
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={2} className="!text-white flex items-center gap-3">
                <Cpu className="text-[#00f2ff]" /> Core Capabilities
              </Title>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                Our suite is tailored to cover all essential requirements of competitive exam application portals:
              </Paragraph>
              <ul className="list-disc pl-6 space-y-2 text-gray-300 text-base">
                <li><strong>Signature Studio:</strong> Allows you to draw smooth, professional digital signatures or type them in multiple calligraphy fonts, automatically exporting them as transparent, portal-ready PNG files.</li>
                <li><strong>Pro Passport Studio:</strong> Creates exact dimensions for SSC, UPSC, and state-level exams, offering grid-based layouts to print multiple copies with minimal cutting margins.</li>
                <li><strong>AI Background Remover:</strong> Automatically removes backgrounds from portrait photos in seconds using private, on-device AI.</li>
                <li><strong>Image Resizer & PDF Suite:</strong> Easily compresses JPG, PNG, and PDF documents down to exact target sizes (such as "under 50KB" or "below 2MB") without sacrificing edge details.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <Title level={2} className="!text-white flex items-center gap-3">
                <Users className="text-purple-400" /> Powered by CodeEducationHub
              </Title>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                AllSarkariTools is proudly operated in integration with <a href="https://codeeducationhub.com/" target="_blank" rel="noopener noreferrer" className="text-[#00f2ff] font-bold hover:underline">CodeEducationHub</a>. CodeEducationHub is our premier educational platform dedicated to providing students with top-tier computer classes, competitive exam test series, live classes, study materials, and technical career advice.
              </Paragraph>
              <Paragraph className="!text-gray-300 text-base leading-relaxed">
                Through this partnership, we provide students and job seekers with a unified ecosystem. While CodeEducationHub prepares you academically to crack government exams, AllSarkariTools supports you procedurally, ensuring that the form filling, photo resizing, and digital documentation phases of your journey are completely seamless, error-free, and secure.
              </Paragraph>
            </section>
          </Col>

          {/* Right Info Column */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" className="w-full">
              <Card className="glass-card !p-6 border-none">
                <Title level={4} className="!text-white !mb-4 flex items-center gap-2">
                  <Heart className="text-[#ff3b7e] fill-[#ff3b7e]" size={20} /> Our Core Values
                </Title>
                <div className="space-y-6">
                  <div>
                    <Text className="text-white font-bold block mb-1">Aspirant Centricity</Text>
                    <Text className="text-gray-400 text-sm">Every tool is customized based on specific feedback from active exam candidates.</Text>
                  </div>
                  <div>
                    <Text className="text-white font-bold block mb-1">Absolute Security</Text>
                    <Text className="text-gray-400 text-sm">Zero data uploads. Absolute client-side privacy. Guaranteed.</Text>
                  </div>
                  <div>
                    <Text className="text-white font-bold block mb-1">No-Cost Premium Quality</Text>
                    <Text className="text-gray-400 text-sm">Providing high-end utilities for free, without paywalls or forced registration.</Text>
                  </div>
                </div>
              </Card>

              <Card className="glass-card !p-6 border-none bg-white/[0.02]">
                <Title level={4} className="!text-white !mb-4 flex items-center gap-2">
                  <Shield className="text-[#00f2ff]" size={20} /> Trusted Standards
                </Title>
                <Paragraph className="text-gray-400 text-sm leading-relaxed m-0">
                  Our configurations and dimensions are cross-checked regularly against notifications from official organizations including the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), National Testing Agency (NTA), and Institute of Banking Personnel Selection (IBPS).
                </Paragraph>
              </Card>
            </Space>
          </Col>
        </Row>

        <Divider className="!my-12 border-white/5" />

        <AdSlot slot="9988776655" />
      </div>
    </div>
  );
};

export default AboutUs;
