import React from 'react';
import { Typography, Card, Space, Divider } from 'antd';
import { FileText, CheckCircle, AlertCircle, Scale, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingParticles from '../../components/FloatingParticles';
import AdSlot from '../../components/AdSlot';

const { Title, Paragraph, Text } = Typography;

const TermsOfUse = () => {
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
      <FloatingParticles count={60} color="#7000ff" />

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto py-12 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mb-6 border border-secondary/20 shadow-[0_0_20px_rgba(112,0,255,0.2)]"
          >
            <Scale size={40} className="text-secondary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="responsive-title !text-white !mb-4 tracking-tighter uppercase"
          >
            Terms of Use
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="!text-gray-400 text-lg sm:text-xl font-medium"
          >
            Simple rules, fair usage guidelines, and terms for our utility suite.
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
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#7000ff]/5 rounded-full blur-[60px]" />
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <CheckCircle className="text-secondary" size={24} /> 1. Acceptance & Scope of Terms
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    By accessing, browsing, or utilizing the tools and features provided on AllSarkariTools (hereinafter referred to as "the Platform"), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Use. If you do not agree to these terms, you must immediately cease all access to the site.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    These terms govern all tools, including but not limited to the Signature Maker, Pro Passport Studio, AI Background Remover, Image Compressor, PDF suite, and other custom utilities designed for competitive examination candidates.
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
                    <AlertTriangle className="text-accent" size={24} /> 2. Ethical Use and Prohibited Practices
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    AllSarkariTools is designed to assist candidates preparing for legitimate government job applications, university registrations, and educational applications. You agree to use the Platform in compliance with the following ethical standards:
                  </Paragraph>
                  <ul className="list-disc pl-6 space-y-3 text-gray-400 text-base">
                    <li><strong>No Forgery:</strong> You must not use the Signature Maker or other tools to forge the signatures of other persons, government officials, or representatives. The Signature tool is intended strictly for your personal digital signature.</li>
                    <li><strong>No Impersonation:</strong> You must not resize, crop, or process photographs of other individuals with the intent to impersonate them on official entrance exam forms (e.g., SSC, UPSC, IBPS, NEET).</li>
                    <li><strong>Fair Use of Resources:</strong> You agree not to attempt to reverse engineer, scrape, or systematically copy the script models, styles, or logic templates of our client-side software.</li>
                  </ul>
                </section>
              </Space>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card !p-8 border-none relative overflow-hidden group">
              <Space direction="vertical" size="large" className="w-full">
                <section>
                  <Title level={3} className="!text-white !mb-4 flex items-center gap-3">
                    <Shield className="text-primary" size={24} /> 3. Service Model and Zero Cost Guarantee
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    AllSarkariTools is, and will remain, 100% free of cost for all student aspirants. We do not require registration, login credentials, premium subscriptions, or per-use service fees. All technical processes operate serverless-ly within your browser.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    To support website maintenance, hosting charges, and updates, we serve unobtrusive ads via Google AdSense. You agree that advertisements will display on the interface, and you will not hold us liable for third-party advertisements or products displayed.
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
                    <AlertCircle className="text-[#ff8c2b]" size={24} /> 4. Disclaimers, Accuracy & Limitation of Liability
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>Pre-Check Recommendations:</strong> While our configurations are regularly updated to conform with current guidelines of SSC, UPSC, NEET, etc., notification specifications can change without notice. You are solely responsible for verifying that your final downloaded files (format, file size in KB, and dimension in PX) exactly match the requirements stated in the official exam notification.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>No Liability for Rejections:</strong> AllSarkariTools, its developers, and its parent association, including CodeEducationHub, shall not be held liable for any document rejection, application cancellation, academic failure, or direct or indirect damages arising out of the use or inability to use this utility suite. The tools are provided "as is" without warranty of any kind.
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
                    <FileText className="text-purple-400" size={24} /> 5. Partner Portals & Intellectual Property
                  </Title>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>Ownership of User Files:</strong> Your processed documents, photographs, and generated signatures are your private property. Since we never upload or store your files, we retain zero ownership, license, or distribution rights over any file processed through our client-side software.
                  </Paragraph>
                  <Paragraph className="!text-gray-400 text-base leading-relaxed">
                    <strong>Partner Integration:</strong> We coordinate services with <a href="https://codeeducationhub.com/" target="_blank" rel="noopener noreferrer" className="text-[#00f2ff] font-bold hover:underline">CodeEducationHub</a>. CodeEducationHub owns its respective learning platforms, courses, and materials. Using AllSarkariTools does not grant you intellectual licenses to materials provided on partner sites.
                  </Paragraph>
                </section>
              </Space>
            </Card>
          </motion.div>
        </motion.div>

        <Divider className="!my-12 border-white/5" />

        <AdSlot slot="3322110044" />
      </div>
    </div>
  );
};

export default TermsOfUse;
