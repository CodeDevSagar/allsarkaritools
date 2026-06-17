import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Tag } from 'antd';
import { Camera, FileSignature, Image as ImageIcon, FileType, Calculator, Search, Zap, Info, FileImage, Landmark, FileSpreadsheet, ArrowRightLeft, Lock, Minimize, Wand2, Keyboard, Shield, Target, Bot, RotateCw, Globe, Hash, Edit3, Crop, Copyright } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdSlot from '../components/AdSlot';

const { Title, Text, Paragraph } = Typography;

const HoverParticlesCard = ({ children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const particles = [
    { id: 1, x: -80, y: -45, size: 6, delay: 0 },
    { id: 2, x: 80, y: -40, size: 5, delay: 0.1 },
    { id: 3, x: -100, y: 30, size: 4, delay: 0.2 },
    { id: 4, x: 100, y: 45, size: 6, delay: 0.15 },
    { id: 5, x: -40, y: -65, size: 5, delay: 0.3 },
    { id: 6, x: 40, y: 65, size: 7, delay: 0.05 },
    { id: 7, x: -60, y: 35, size: 5, delay: 0.25 },
    { id: 8, x: 60, y: -35, size: 4, delay: 0.12 },
  ];

  return (
    <div 
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particles around the card */}
      {isHovered && particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-[#ff8c2b] to-[#ff3b7e] pointer-events-none blur-[0.5px]"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            zIndex: 20
          }}
          initial={{ opacity: 0.9, scale: 0.3, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 1.6, 
            y: p.y < 0 ? -60 : 60,
            x: p.x + (Math.random() * 40 - 20)
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            delay: p.delay 
          }}
        />
      ))}
      
      <div 
        onClick={onClick}
        className="h-full bg-gradient-to-b from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 hover:border-[#ff007f]/50 p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between text-left transition-all duration-500 cursor-pointer group relative overflow-hidden z-10"
      >
        {children}
      </div>
    </div>
  );
};

const AllTools = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const tools = [
    { title: 'Typing Test Pro', icon: <Keyboard size={32} className="text-primary" />, desc: 'Hindi & English WPM test for SSC, Court & CPCT', link: '/typing-test', category: 'Practice', featured: true },
    { title: 'Passport Photo Maker', icon: <Camera size={32} className="text-primary" />, desc: 'Standard passport, visa & exam photos', link: '/passport-photo-maker', category: 'Images' },
    { title: 'Signature Maker', icon: <FileSignature size={32} className="text-secondary" />, desc: 'Draw transparent signatures', link: '/signature-maker', category: 'Images' },
    { title: 'Image Resizer', icon: <ImageIcon size={32} className="text-accent" />, desc: 'Compress images below specific KB', link: '/image-resizer', category: 'Images' },
    { title: 'PDF Merger', icon: <FileType size={32} className="text-primary" />, desc: 'Combine multiple PDFs into one', link: '/pdf-tools', category: 'PDF' },
    { title: 'Resume Builder', icon: <FileSignature size={32} className="text-secondary" />, desc: 'ATS-friendly professional resumes', link: '/resume-builder', category: 'Documents' },
    { title: 'Age Calculator', icon: <Calculator size={32} className="text-accent" />, desc: 'Calculate exact age for eligibility', link: '/age-calculator', category: 'Calculators' },
    { title: 'Salary Slabs Calculator', icon: <Calculator size={32} className="text-accent" />, desc: 'Calculate Gross, NPS & In-hand Salary for SSC, UPSC, BPSC, BSSC, BSPHCL & Jeevika posts', link: '/salary-slabs', category: 'Calculators', featured: true },
    { title: 'JPG to PDF', icon: <FileImage size={32} className="text-primary" />, desc: 'Convert photos to PDF documents', link: '/jpg-to-pdf', category: 'PDF' },
    { title: 'Form Helper', icon: <Landmark size={32} className="text-secondary" />, desc: 'Official government portal directory', link: '/form-helper', category: 'Documents' },
    { title: 'Office Suite', icon: <FileSpreadsheet size={32} className="text-accent" />, desc: 'View Word, Excel and PPT files', link: '/office-tools', category: 'Office' },
    { title: 'Universal Converter', icon: <ArrowRightLeft size={32} className="text-primary" />, desc: 'Word, Excel to PDF Conversion', link: '/document-converter', category: 'Office' },
    { title: 'PDF Security', icon: <Lock size={32} className="text-secondary" />, desc: 'Add password to your PDF files', link: '/pdf-security', category: 'PDF' },
    { title: 'PDF Compressor', icon: <Minimize size={32} className="text-accent" />, desc: 'Reduce PDF size for easy upload', link: '/pdf-compressor', category: 'PDF' },
    { title: 'BG Remover', icon: <Wand2 size={32} className="text-primary" />, desc: 'Remove photo background using on-device AI', link: '/bg-remover', category: 'Images' },
    { title: 'AI Website Builder', icon: <Bot size={32} className="text-primary" />, desc: 'Generate HTML/CSS websites using AI', link: '/ai-website-builder', category: 'AI Tools', featured: true },
    { title: 'Watermark PDF', icon: <Copyright size={32} className="text-secondary" />, desc: 'Add custom text watermarks to your PDF', link: '/pdf-watermark', category: 'PDF' },
    { title: 'Rotate PDF', icon: <RotateCw size={32} className="text-accent" />, desc: 'Rotate single or multiple PDF documents at once', link: '/pdf-rotate', category: 'PDF' },
    { title: 'HTML to PDF', icon: <Globe size={32} className="text-primary" />, desc: 'Convert web page URL or HTML code to PDF', link: '/html-to-pdf', category: 'PDF' },
    { title: 'Page Number', icon: <Hash size={32} className="text-secondary" />, desc: 'Add page numbers into PDF with custom styling', link: '/pdf-page-number', category: 'PDF' },
    { title: 'Edit PDF', icon: <Edit3 size={32} className="text-accent" />, desc: 'Modify PDF metadata fields and text overlays', link: '/pdf-edit', category: 'PDF' },
    { title: 'Crop PDF', icon: <Crop size={32} className="text-primary" />, desc: 'Crop PDF margins and page dimensions locally', link: '/pdf-crop', category: 'PDF' },
  ];

  const categories = ['All', 'AI Tools', 'Practice', 'Images', 'PDF', 'Documents', 'Office', 'Calculators'];

  const filteredTools = tools.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#080415] min-h-screen text-white relative overflow-hidden font-sans pb-20">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ── PROFESSIONAL HERO SECTION ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex justify-center w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#1b103c]/60 border border-[#7000ff]/30 px-5 py-2.5 rounded-full mb-8 backdrop-blur-md">
              <Shield size={16} className="text-[#00f2ff]" />
              <span className="text-sm font-black text-gray-300 tracking-wider">100% PRIVATE CLIENT-SIDE PROCESSING</span>
            </motion.div>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
            The Ultimate <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] drop-shadow-[0_0_30px_rgba(0,242,255,0.2)]">Sarkari Utility Suite</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Professional-grade tools to prepare your documents, practice for exams, and manage files without ever uploading your data to a server.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7000ff] to-[#00f2ff] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <Input 
              prefix={<Search size={24} className="text-gray-500 mr-3" />} 
              placeholder="Search for 'Photo Maker', 'Typing Test', 'PDF'..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="relative h-16 sm:h-20 !bg-[#0c0721] !border-white/10 hover:!border-[#00f2ff]/50 focus:!border-[#00f2ff] !text-white !rounded-3xl !text-lg sm:!text-xl shadow-2xl pl-6"
              allowClear
            />
          </motion.div>
        </div>
      </section>

      {/* ── MAIN DASHBOARD AREA ── */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-[#ff4500] to-[#ff007f] text-white shadow-[0_0_20px_rgba(255,0,127,0.4)] scale-105' 
                  : 'bg-white/5 text-gray-400 hover:bg-[#00f2ff]/10 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'All' ? 'All Tools' : cat}
            </button>
          ))}
        </div>

        <AdSlot slot="0987654321" />

        {/* Tools Grid */}
        <AnimatePresence mode="popLayout">
          <Row gutter={[24, 32]}>
            {filteredTools.map((tool, index) => (
              <Col xs={24} sm={tool.featured ? 24 : 12} lg={tool.featured ? 24 : 8} key={tool.title}>
                 <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="h-full"
                >
                  <HoverParticlesCard onClick={() => tool.link && navigate(tool.link)}>
                    {/* Hover Glow Effect */}
                    <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#ff007f]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 group-hover:bg-[#ff007f]/15 group-hover:border-[#ff007f]/40 rounded-2xl flex items-center justify-center transition-all duration-300">
                        <div className="group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                          {tool.icon}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {tool.featured && (
                          <span className="bg-gradient-to-r from-[#ff4500] to-[#ff007f] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(255,0,127,0.4)]">
                            <Target size={12} /> Pro Feature
                          </span>
                        )}
                        <span className="!bg-[#ff007f]/20 !text-[#ff5e36] !border-[#ff007f]/30 border text-gray-400 uppercase text-[10px] tracking-widest rounded-full px-4 py-1 font-bold group-hover:border-[#ff007f]/50 transition-all">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex-grow">
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#ff007f] transition-all">{tool.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-base mb-6 font-medium">{tool.desc}</p>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[#ff5e36] font-extrabold text-sm group-hover:text-white transition-colors relative z-10 mt-auto w-full">
                      <span>Launch Application</span>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff5e36] to-[#ff007f] text-white flex items-center justify-center shadow-md shadow-[#ff007f]/20 group-hover:shadow-[#ff007f]/50 transition-all duration-300 transform group-hover:translate-x-1">
                        <ArrowRightLeft size={14} />
                      </div>
                    </div>
                  </HoverParticlesCard>
                </motion.div>
              </Col>
            ))}
          </Row>
        </AnimatePresence>
        
        {filteredTools.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-10">
            <Search size={64} className="mx-auto mb-6 text-gray-600" />
            <Title level={3} className="!text-white">No tools found matching "{search}"</Title>
            <Text className="text-gray-500 text-lg">Try adjusting your search or selecting a different category.</Text>
            <div className="mt-8">
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-[#00f2ff] font-bold hover:underline">
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default AllTools;
