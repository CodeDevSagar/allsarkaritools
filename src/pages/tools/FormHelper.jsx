import React, { useState } from 'react';
import { Typography, Input, Tag, Row, Col } from 'antd';
import { Search, ExternalLink, Shield, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const HoverParticlesButton = ({ onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const particles = [
    { id: 1, x: -60, y: -25, size: 6, delay: 0 },
    { id: 2, x: 60, y: -20, size: 5, delay: 0.1 },
    { id: 3, x: -80, y: 15, size: 4, delay: 0.2 },
    { id: 4, x: 80, y: 20, size: 6, delay: 0.15 },
    { id: 5, x: -20, y: -30, size: 5, delay: 0.3 },
    { id: 6, x: 20, y: 25, size: 7, delay: 0.05 },
    { id: 7, x: -40, y: 25, size: 5, delay: 0.25 },
    { id: 8, x: 40, y: -25, size: 4, delay: 0.12 },
  ];

  return (
    <div className="relative w-full">
      {/* Particles around the button */}
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
            y: p.y < 0 ? -45 : 45,
            x: p.x + (Math.random() * 30 - 15)
          }}
          transition={{ 
            duration: 0.9, 
            repeat: Infinity, 
            delay: p.delay 
          }}
        />
      ))}
      
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full h-14 rounded-2xl font-black text-sm bg-gradient-to-r from-[#ff5e36] to-[#ff007f] text-white shadow-lg shadow-[#ff007f]/20 hover:shadow-[#ff007f]/40 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 hover:scale-[1.01] relative z-10"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

const FormHelper = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const portals = [
    { name: 'SSC (Staff Selection Commission)', url: 'https://ssc.gov.in/', category: 'Central Govt', desc: 'CHSL, CGL, MTS, JE and Stenographer forms.' },
    { name: 'UPSC (Union Public Service Commission)', url: 'https://upsc.gov.in/', category: 'Central Govt', desc: 'IAS, IPS, NDA, CDS and IES applications.' },
    { name: 'IBPS (Banking Personnel)', url: 'https://ibps.in/', category: 'Banking', desc: 'PO, Clerk and SO recruitment for PSUs.' },
    { name: 'RRB (Railway Recruitment)', url: 'https://indianrailways.gov.in/', category: 'Railways', desc: 'NTPC, Group D and ALP notifications.' },
    { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', category: 'Scholarship', desc: 'All state and central scholarships for students.' },
    { name: 'NTA (Exam Agency)', url: 'https://nta.ac.in/', category: 'Education', desc: 'JEE, NEET, UGC NET and CUET registrations.' },
    { name: 'Aadhaar (UIDAI)', url: 'https://uidai.gov.in/', category: 'ID Services', desc: 'Update Aadhaar for government form verification.' },
    { name: 'PAN Card (NSDL)', url: 'https://tinpan.proteantech.in/', category: 'ID Services', desc: 'Apply for PAN card required for exams.' },
    { name: 'UPSSSC (Uttar Pradesh Subordinate Services)', url: 'https://upsssc.gov.in/', category: 'State Govt', desc: 'UP state government job applications.' },
    { name: 'UPPSC (Uttar Pradesh Public Service)', url: 'https://uppsc.up.nic.in/', category: 'State Govt', desc: 'UP PCS, Lower PCS and other state services.' },
    { name: 'BPSC (Bihar Public Service)', url: 'https://bpsc.bihar.gov.in/', category: 'State Govt', desc: 'BPSC administrative and judicial service applications.' },
    { name: 'CodeEducationHub Portal', url: 'https://codeeducationhub.com/', category: 'Education', desc: 'Explore online classes, test series, and study materials.' }
  ];

  const categories = ['All', 'Central Govt', 'State Govt', 'Education', 'Banking', 'ID Services', 'Scholarship'];

  const filteredPortals = portals.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="bg-[#080415] min-h-screen text-white relative overflow-hidden font-sans pb-20 pt-12">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[#ff00c8]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto py-12 px-4 relative z-10">
        <div className="text-center mb-16">
          <Title className="!text-white !text-5xl md:!text-6xl !font-black !mb-4 tracking-tighter uppercase">
            Govt Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] drop-shadow-[0_0_30px_rgba(0,242,255,0.2)]">Directory</span>
          </Title>
          <Paragraph className="!text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Instant direct links to verified central, state, and educational portals. No redirects or third-party ads.
          </Paragraph>
        </div>

        {/* Premium Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7000ff] to-[#00f2ff] rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <Input 
            size="large" 
            placeholder="Search by portal name, category or exam..." 
            prefix={<Search className="text-[#00f2ff] mr-3" size={24} />}
            onChange={e => setSearchTerm(e.target.value)}
            className="!h-20 !rounded-[2.5rem] !px-8 !text-lg !bg-[#0c0721] !border-white/10 hover:!border-[#00f2ff]/50 focus:!border-[#00f2ff] !text-white !shadow-2xl"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-[#ff4500] to-[#ff007f] text-white shadow-[0_0_15px_rgba(255,0,127,0.4)] scale-105' 
                  : 'bg-white/5 text-gray-400 hover:bg-[#00f2ff]/10 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'All' ? 'All Portals' : cat}
            </button>
          ))}
        </div>

        {/* Animated Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Row gutter={[24, 24]}>
            {filteredPortals.map((portal, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="h-full bg-gradient-to-b from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 hover:border-[#ff007f]/50 p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between text-left transition-all duration-500 relative group overflow-hidden"
                >
                  {/* Decorative corner glow */}
                  <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#ff007f]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 group-hover:bg-[#ff007f]/15 group-hover:border-[#ff007f]/40 rounded-2xl flex items-center justify-center transition-all duration-300">
                        <Landmark size={26} className="text-[#ff5e36] group-hover:scale-110 transition-transform" />
                      </div>
                      <Tag className="!bg-[#ff007f]/20 !text-[#ff5e36] !border-[#ff007f]/30 !px-4 !py-1 !rounded-full font-bold text-xs uppercase tracking-wider">
                        {portal.category}
                      </Tag>
                    </div>

                    <Title level={4} className="!text-white !mb-3 !font-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#ff007f] transition-all">
                      {portal.name}
                    </Title>
                    <Paragraph className="!text-gray-400 !mb-8 h-12 overflow-hidden text-sm font-medium leading-relaxed">
                      {portal.desc}
                    </Paragraph>
                  </div>
                  
                  <HoverParticlesButton onClick={() => window.open(portal.url, '_blank')}>
                    Visit Official Site <ExternalLink size={16} />
                  </HoverParticlesButton>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Safety & Verification Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-8 md:p-10 bg-gradient-to-r from-[#1b103c]/80 to-[#0c0721]/90 border border-[#7000ff]/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 backdrop-blur-md"
        >
          <div className="w-16 h-16 bg-[#ff007f]/10 border border-[#ff007f]/20 rounded-2xl flex items-center justify-center shrink-0">
            <Shield size={32} className="text-[#ff5e36]" />
          </div>
          <div className="text-left">
            <Title level={5} className="!text-white !mb-2 uppercase tracking-wider text-xs font-black">Security Verification</Title>
            <Paragraph className="!text-gray-400 !m-0 text-sm md:text-base font-medium leading-relaxed">
              Always double-check that the URL ends with <span className="text-[#ff5e36] font-bold">.gov.in</span> or <span className="text-[#ff5e36] font-bold">.nic.in</span> in your browser search bar before typing any password or submitting identity details. We only catalog official, verified government resources.
            </Paragraph>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormHelper;
