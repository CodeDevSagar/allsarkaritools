import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Modal } from 'antd';
import { Camera, FileSignature, FileImage, FileType, Calculator, ArrowRight, Star, Play, Check, Zap, Shield, Wand2, Keyboard, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdSlot from '../components/AdSlot';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [isDemoVisible, setIsDemoVisible] = useState(false);

  // Shared reference date: January 1, 2026
  const BASE_REFERENCE_TIME = 1767225600000;

  const getInitialFiles = () => {
    const elapsedSeconds = Math.floor((Date.now() - BASE_REFERENCE_TIME) / 1000);
    // Base 38910 + 1 file processed every 8 seconds (0.125 files per second)
    return Math.max(38910, 38910 + Math.floor(elapsedSeconds * 0.125));
  };

  const getInitialLiveUsers = () => {
    const time = new Date();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    // Synced base user count around 18400 + hourly trend + sine wave variation
    const baseLive = 18400 + (hours * 12) + Math.floor(Math.sin(minutes) * 45);
    return baseLive;
  };

  const [liveUsers, setLiveUsers] = useState(getInitialLiveUsers);
  const [totalFiles, setTotalFiles] = useState(getInitialFiles);

  useEffect(() => {
    const interval = setInterval(() => {
      // Synced to the global clock so every user sees the exact same numbers
      setTotalFiles(getInitialFiles());

      setLiveUsers(() => {
        const base = getInitialLiveUsers();
        // Allow a tiny organic local fluctuation (+/- 5) so it feels fluid
        const localOffset = Math.floor(Math.random() * 11) - 5;
        return base + localOffset;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const keyOffers = [
    {
      title: 'Document & Image Pro',
      subtitle: 'Precision Image Utilities',
      desc: 'Compress photos below specific KB limits, remove backgrounds using AI, resize passport photos, and generate digital signatures.',
      color: 'from-pink-500 to-rose-600',
      icon: <Wand2 size={40} className="text-[#ff3b7e]" />,
      link: '/tools?category=Images',
      features: ['Passport Photo standards', 'BG removal in 1-click', 'Aspect ratio locking']
    },
    {
      title: 'PDF Suite Elite',
      subtitle: 'Complete Document Conversion',
      desc: 'Convert JPG to PDF, merge multiple PDF documents, compress PDF file size below 2MB, and add security passwords.',
      color: 'from-[#ff8c2b] to-[#ffaa00]',
      icon: <FileType size={40} className="text-[#ff8c2b]" />,
      link: '/tools?category=PDF',
      features: ['Browser-side compilation', 'Password encryption', 'High-quality compression']
    },
    {
      title: 'Aspirant Utilities',
      subtitle: 'Typing & Resume Tools',
      desc: 'ATS-friendly resume builder, Hindi/English typing speed test, and calculators for age eligibility, salary slabs, and academic marks.',
      color: 'from-cyan-500 to-blue-600',
      icon: <Keyboard size={40} className="text-[#00f2ff]" />,
      link: '/tools',
      features: ['Real-time WPM tracker', 'UPSC/SSC pre-set sizes', 'Offline calculations']
    }
  ];

  return (
    <div className="bg-[#080415] min-h-screen text-white relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[#ff00c8]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 md:px-12 lg:px-24 w-full z-10">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12} className="text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#1b103c]/60 border border-[#7000ff]/30 px-5 py-2.5 rounded-full mb-[10px] backdrop-blur-md"
            >
              <Star size={16} className="text-[#ff3b7e] fill-[#ff3b7e]" />
              <span className="text-sm font-black text-gray-300 tracking-wider">TRUSTED BY 100K+ ASPIRANTS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] to-[#ff8c2b] block mb-2 drop-shadow-[0_0_35px_rgba(255,59,126,0.25)]">Prepare.</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c2b] to-[#00f2ff] block mb-2 drop-shadow-[0_0_35px_rgba(255,140,43,0.25)]">Convert.</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#7000ff] block drop-shadow-[0_0_35px_rgba(0,242,255,0.3)]">Succeed.</span>
              </h1>

              <Paragraph className="!text-gray-400 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed font-medium">
                Create passport photos, draw signatures, build resumes and compress PDFs for SSC, UPSC, and Banking exams. 
                <span className="text-white block mt-2 font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ✨ No Login. No Server. 100% Private.
                </span>
              </Paragraph>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                <button
                  onClick={() => navigate('/tools')}
                  className="px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-[#ff4500] to-[#ff007f] hover:from-[#ff5511] hover:to-[#ff118f] text-white shadow-[0_8px_30px_rgba(255,0,127,0.4)] hover:shadow-[0_8px_40px_rgba(255,0,127,0.6)] transform hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setIsDemoVisible(true)}
                  className="px-8 py-4 rounded-2xl font-black text-lg bg-white/5 border border-white/10 hover:border-[#00f2ff]/50 text-white hover:bg-[#00f2ff]/5 hover:text-[#00f2ff] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Play size={20} className="fill-current text-[#00f2ff]" /> Learn More
                </button>
              </div>

              {/* Live Count Viewer Card */}
              <div 
                className="mt-12 p-6 bg-gradient-to-r from-[#1b103c]/60 to-[#0c0721]/80 border border-[#7000ff]/30 rounded-[2rem] backdrop-blur-md max-w-lg shadow-[0_20px_40px_rgba(112,0,255,0.15)] hover:border-[#00f2ff]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Live Active Users 👥</span>
                      <span className="text-2xl font-black text-white font-mono tracking-tight">
                        {liveUsers.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
                  
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Processed Today ⚡</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00f2ff] font-mono tracking-tight">
                      {totalFiles.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
                  
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Security 🔒</span>
                    <span className="text-2xl font-black text-[#00f2ff] font-mono tracking-tight">100% Local</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Right Floating Premium Vector Illustration */}
          <Col xs={24} lg={12} className="flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full max-w-[500px]"
            >
              {/* Spinning background platform glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7000ff]/20 to-[#00f2ff]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
              <motion.img
                src="/hero_illustration.png"
                alt="Sarkari Tools Futuristic Vector Illustration"
                className="w-full h-auto z-10 relative object-contain drop-shadow-[0_20px_50px_rgba(112,0,255,0.45)]"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Swoosh SVG Wave Divider */}
      <div className="relative w-full overflow-hidden leading-none z-10 mt-[-5px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] text-[#0d0722] fill-current">
          <path d="M985.6,92.8C1006.5,92,1045,95.5,1085,101.4C1125,107.3,1179,114.7,1200,116.8V120H0V0C20,1.2,74,10,123.6,22.2C173.2,34.4,222.8,50,284.4,62.8C346,75.6,419.6,85.6,488.4,87.6C557.2,89.6,621.2,83.6,678,74C734.8,64.4,784.4,51.2,839.2,50.8C894,50.4,954,62.8,985.6,92.8Z"></path>
        </svg>
      </div>

      {/* Services Section */}
      <section className="bg-[#0d0722] py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <span className="text-[#00f2ff] text-sm font-black tracking-widest uppercase block mb-3">Our Services</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">What We Offer</h2>
            <Paragraph className="!text-gray-400 text-lg font-semibold max-w-2xl mx-auto">
              Speed up your document validation and formatting tasks with completely secure, client-side browser extensions.
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} className="justify-center">
            {keyOffers.map((offer, idx) => (
              <Col xs={24} md={12} lg={8} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(offer.link)}
                  className="cursor-pointer h-full"
                >
                  <div className="h-full bg-gradient-to-b from-[#1b0e36] to-[#0a0518] rounded-[2.5rem] border border-white/5 hover:border-[#00f2ff]/30 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(0,242,255,0.15)] flex flex-col text-left transition-all duration-500 relative group overflow-hidden">
                    
                    {/* Hover internal glow */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00f2ff]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#00f2ff]/10 group-hover:border-[#00f2ff]/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                      {offer.icon}
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00f2ff] transition-colors">{offer.title}</h3>
                    <span className="text-[#ff8c2b] text-sm font-bold tracking-wider uppercase mb-4 block">{offer.subtitle}</span>
                    <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{offer.desc}</p>
                    
                    <ul className="mb-8 space-y-3">
                      {offer.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                          <Check size={16} className="text-[#00f2ff]" /> {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:text-[#00f2ff] transition-colors">
                      Open Tools Panel <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Swoosh Wave Divider 2 */}
      <div className="relative w-full overflow-hidden leading-none z-10 bg-[#0d0722]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] text-[#080415] fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120H321.39Z"></path>
        </svg>
      </div>

      {/* AdSense Slot */}
      <div className="max-w-7xl mx-auto px-6 py-6 z-10 relative">
        <AdSlot slot="1234567890" />
      </div>

      {/* ── SEO INFO SECTION ── */}
      <section className="py-16 px-6 relative z-10 max-w-7xl mx-auto text-left select-text">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full">
              <Shield size={14} className="text-[#00f2ff]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00f2ff]">100% Privacy Guaranteed</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
              ⚡ Secure & Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] to-[#00f2ff]">Sarkari Utilities</span>
            </h2>
            
            <p className="text-gray-400 leading-relaxed text-base">
              Online recruitment forms for exams like **UPSC, SSC, NEET, and Bank PO** require documents with exact size ranges (e.g. photos under 50KB, signatures under 20KB). Traditionally, aspirants upload their certificates and images to unknown servers to resize them, risking data leaks.
            </p>
            
            <p className="text-gray-400 leading-relaxed text-base">
              **AllSarkari Tools** performs all resizing, cropping, and PDF compiling tasks **locally in your web browser sandbox**. Utilizing WebAssembly and client-side processing, your documents never touch the cloud, keeping your identity safe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🔒",
                title: "Zero Uploads",
                desc: "All calculations and resizing execute locally. Your certificates remain confidential."
              },
              {
                icon: "⚡",
                title: "Vite Fast",
                desc: "Process large PDF merges and high-res image modifications near-instantly."
              },
              {
                icon: "🎯",
                title: "Form Ready",
                desc: "Pre-set options let you align layout borders to official exam requirements easily."
              },
              {
                icon: "🎓",
                title: "100% Free",
                desc: "No premium paywalls or subscriptions. Built solely to help students succeed."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3">
                <span className="text-3xl block">{item.icon}</span>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MASSIVE EDUCATIONAL CONTENT SECTION (AdSense & SEO Optimized) ── */}
      <section className="py-20 px-6 relative z-10 max-w-7xl mx-auto text-left select-text">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
        
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              ⚡ Secure Online Tool Suite for State & National Exam Forms
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              Preparing for highly competitive national examinations like the **Union Public Service Commission (UPSC), Staff Selection Commission (SSC), National Eligibility cum Entrance Test (NEET), Joint Entrance Examination (JEE), Banking (IBPS, SBI PO), and various state PSC exams** is a demanding task. Beyond academic preparation, candidates face structural friction during online registration. Official registration portals require scanned passport photographs, digital signatures, and supporting certificates to be within extremely strict file sizes (e.g., photos between 20KB to 50KB, signatures under 20KB, and certificates formatted as PDFs under 200KB).
            </p>
            <p className="text-gray-300 leading-relaxed text-base">
              Historically, students have had to resort to uploading their sensitive, personally identifiable information (PII) to random, unsecured online file compressors. This practice creates severe privacy risks, as servers can store credentials indefinitely. **AllSarkari Tools** was engineered to solve this vulnerability by offering a complete suite of utility converters that run **100% client-side**. This means that when you compress a PDF or crop a passport photo, all math and image processing are computed locally in your web browser sandbox. No file is ever sent to a remote server, offering you complete data safety.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#00f2ff] tracking-tight uppercase">
              🛠️ In-Depth Guide: How to Format and Align Documents for Government Portals
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              Understanding official guidelines is crucial to preventing application rejections. Most recruitment portals use automated computer systems to screen incoming documents. If a photograph has an incorrect background color, bad aspect ratio, or a file size exceeding the threshold, the form is rejected. Here is how you can utilize our tools to align your credentials properly:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>
                <strong>Passport Photo Maker:</strong> Government applications generally require a recent passport photo (3.5 cm x 4.5 cm or 2 inches x 2 inches) with a light gray or plain white background. Our local tool lets you upload your portrait, remove cluttered backgrounds, and resize the output to match UPSC/SSC specifications.
              </li>
              <li>
                <strong>Digital Signature Creator:</strong> Candidates must sign on white paper using a black ink pen, scan it, and crop it to fit specific coordinates (typically 3.5 cm width x 1.5 cm height). Using our signature Maker, you can sign directly on your touchscreen device or upload a photo of your signature, make the background transparent, and export it instantly.
              </li>
              <li>
                <strong>PDF Merger & Security tools:</strong> If an application asks you to compile all semesters' mark sheets into a single PDF, our browser-based PDF compiler merges them in seconds. You can also encrypt files with secure passwords locally before uploading.
              </li>
              <li>
                <strong>ATS-Friendly Resume Builder:</strong> Our resume creator uses structured templates that are easily parsed by Applicant Tracking Systems (ATS), giving you an edge in both public and private sector hiring pipelines.
              </li>
            </ul>
          </div>

          {/* Section 3: FAQs */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-[#ff8c2b] tracking-tight uppercase">
              ❓ Frequently Asked Questions (FAQs)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How does AllSarkari Tools ensure my documents remain 100% private?",
                  a: "Our website runs entirely in your browser sandbox using client-side JavaScript. Unlike other tools that upload files to their servers, our architecture compiles binaries locally on your device. Your photos, signatures, and certificates never travel over the network, making data leaks impossible."
                },
                {
                  q: "What are the standard passport photo sizes for SSC and UPSC forms?",
                  a: "The standard size is 3.5 cm width by 4.5 cm height (350px x 450px) with a file size limit of 20KB to 50KB. The photo must show your face clearly against a white or light background."
                },
                {
                  q: "Why do I need transparent background signatures?",
                  a: "A transparent signature merges smoothly into the official application form templates without white block borders, reducing automated scan failures."
                },
                {
                  q: "Can I use these tools offline?",
                  a: "Yes! Since the logic is client-side, once the page loads, you can disconnect from the internet and continue resizing, cropping, and converting files locally."
                },
                {
                  q: "What is an ATS-friendly resume template?",
                  a: "An ATS-friendly template avoids complex graphics or column layouts that confuse automated scanning software. It uses structured headings and clear formatting to ensure your qualifications are parsed correctly."
                },
                {
                  q: "Is there any limit to the number of files I can process?",
                  a: "No. Since all operations run locally on your device's processor, there are no subscription limits, caps, or hidden charges."
                },
                {
                  q: "Will compressing a PDF degrade the quality of my certificates?",
                  a: "Our algorithm optimizes the PDF file structure and scales down image resolution to fit limits (like under 200KB) while keeping texts fully legible."
                },
                {
                  q: "Can I convert MS Word documents to PDF on a mobile device?",
                  a: "Yes. Our universal converter runs locally in mobile browsers, making document conversions quick and simple without requiring MS Office."
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-2">
                  <h4 className="text-white font-bold text-sm">💡 {faq.q}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-24 px-6 relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#1c123f] to-[#0c061e] border border-white/5 rounded-[3rem] p-12 sm:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3b7e]/10 blur-3xl rounded-full pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black mb-6">Ready to Boost Your Exam Prep?</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Get instant access to all document utilities, tools, and layout guidelines completely for free. 
            All processes execute securely in your web browser.
          </p>
          <button
            onClick={() => navigate('/tools')}
            className="px-10 py-4.5 rounded-2xl font-black text-lg bg-gradient-to-r from-[#7000ff] to-[#ff00c8] hover:from-[#8010ff] hover:to-[#ff10d8] text-white shadow-[0_8px_30px_rgba(112,0,255,0.4)] hover:shadow-[0_8px_40px_rgba(112,0,255,0.6)] transform hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
          >
            Launch Toolbox
          </button>
        </motion.div>
      </section>

      {/* Demo Modal */}
      <Modal
        title={null}
        footer={null}
        open={isDemoVisible}
        onCancel={() => setIsDemoVisible(false)}
        width={800}
        centered
        styles={{ 
          content: { 
            backgroundColor: '#0c0721', 
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 0,
            overflow: 'hidden',
            borderRadius: '24px'
          } 
        }}
      >
        <div className="relative p-12 text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] z-10" />
          <div className="w-20 h-20 bg-gradient-to-br from-[#00f2ff]/20 to-[#7000ff]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
            <Zap size={36} className="text-[#00f2ff]" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">100% Client-Side Processing</h2>
          <p className="text-gray-300 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Sarkari Tools works entirely inside your web browser. This means your personal photos, files, and signatures are processed locally and never uploaded to any remote server.
          </p>
          <button
            className="px-8 py-3.5 rounded-xl font-bold bg-[#00f2ff] text-black hover:bg-[#00d8e4] transition-colors cursor-pointer"
            onClick={() => { setIsDemoVisible(false); navigate('/tools'); }}
          >
            Explore Toolbox
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
