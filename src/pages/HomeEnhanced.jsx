import React, { useState } from 'react';
import { Typography, Button, Row, Col, Modal } from 'antd';
import { Camera, FileSignature, FileImage, FileType, Calculator, FileSpreadsheet, ArrowRight, Star, Play, Check, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdSlot from '../components/AdSlot';
import AnimatedCard from '../components/AnimatedCard';
import GradientButton from '../components/GradientButton';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [isDemoVisible, setIsDemoVisible] = useState(false);

  const tools = [
    { title: 'Passport Photo', icon: <Camera size={32} />, desc: 'Standard passport & visa photos', link: '/passport-photo-maker', color: 'from-cyan-500 to-blue-600' },
    { title: 'Signature Maker', icon: <FileSignature size={32} />, desc: 'Draw transparent signatures', link: '/signature-maker', color: 'from-purple-500 to-pink-600' },
    { title: 'JPG to PDF', icon: <FileImage size={32} />, desc: 'Convert photos to PDF instantly', link: '/jpg-to-pdf', color: 'from-orange-500 to-red-600' },
    { title: 'Merge PDF', icon: <FileType size={32} />, desc: 'Combine multiple PDFs instantly', link: '/pdf-tools', color: 'from-green-500 to-emerald-600' },
    { title: 'Age Calculator', icon: <Calculator size={32} />, desc: 'Check eligibility cutoff date', link: '/age-calculator', color: 'from-yellow-500 to-orange-600' },
    { title: 'Resume Builder', icon: <FileSpreadsheet size={32} />, desc: 'Create professional resumes', link: '/resume-builder', color: 'from-blue-500 to-indigo-600' },
    { title: 'PDF Compressor', icon: <Zap size={32} />, desc: 'Reduce PDF file size instantly', link: '/pdf-compressor', color: 'from-pink-500 to-rose-600' },
    { title: 'Image Resizer', icon: <Camera size={32} />, desc: 'Resize images for any format', link: '/image-resizer', color: 'from-teal-500 to-cyan-600' },
  ];

  const features = [
    { icon: <Check size={24} />, title: 'No Login Required', desc: 'Access all tools instantly without registration' },
    { icon: <Heart size={24} />, title: '100% Private', desc: 'Your data never leaves your browser' },
    { icon: <Zap size={24} />, title: 'Lightning Fast', desc: 'Process files instantly on your device' },
    { icon: <Star size={24} />, title: 'Free Forever', desc: 'All tools are completely free to use' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-12 md:py-20 px-4">
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-8 backdrop-blur-md hover:border-cyan-500/60 transition-all"
          >
            <Star size={16} className="text-cyan-400 fill-cyan-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">TRUSTED BY 100K+ ASPIRANTS</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Transform <span className="gradient-text">Document Prep</span>
              <br />for <span className="text-cyan-400">Exams</span>
            </h1>
            
            <Paragraph className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
              Create passport photos, draw signatures, and build resumes for SSC, UPSC, and Banking exams.
              <br />
              <span className="text-white font-bold animate-pulse-glow">✨ No Login. No Server. 100% Private.</span>
            </Paragraph>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <GradientButton onClick={() => navigate('/tools')} className="px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl flex items-center gap-3 w-full sm:w-auto justify-center">
                  🚀 Launch Toolbox
                  <ArrowRight size={24} />
                </GradientButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="large" 
                  className="px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl bg-gradient-to-r from-gray-700 to-gray-800 border-cyan-500/30 text-white hover:border-cyan-500/60 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-all rounded-lg w-full sm:w-auto flex items-center justify-center gap-2"
                  onClick={() => setIsDemoVisible(true)}
                >
                  <Play size={20} className="text-cyan-400" /> Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.1} className="glass p-6 rounded-xl hover-lift">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mb-4 text-cyan-400">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </AnimatedCard>
          ))}
        </motion.div>
      </section>

      {/* AdSense Slot */}
      <div className="container mx-auto px-4 py-8">
        <AdSlot slot="1234567890" />
      </div>

      {/* Tools Grid Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">✨ Elite Utilities</h2>
          <p className="text-gray-400 text-lg">Precision-crafted tools for every document requirement.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.map((tool, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <AnimatedCard
                hover
                delay={idx * 0.05}
                className="glass p-6 rounded-xl cursor-pointer h-full group"
                onClick={() => navigate(tool.link)}
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${tool.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{tool.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{tool.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{tool.desc}</p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  Use Tool <ArrowRight size={16} />
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <GradientButton onClick={() => navigate('/tools')} className="px-8 py-3">
            Explore All Tools →
          </GradientButton>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <AnimatedCard className="glass p-12 rounded-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Ace Your Exams?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of successful candidates who've used our tools to prepare perfect documents for their exams.
            </p>
            <GradientButton onClick={() => navigate('/tools')} className="px-10 py-4 text-lg">
              Get Started Now 🎯
            </GradientButton>
          </motion.div>
        </AnimatedCard>
      </section>

      {/* Demo Modal */}
      <Modal
        title="How it Works"
        open={isDemoVisible}
        onCancel={() => setIsDemoVisible(false)}
        width="90%"
        footer={null}
      >
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">Demo video coming soon!</p>
          <p className="text-gray-500">In the meantime, explore our tools to see them in action.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
