import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Wrench, FileText, Menu as MenuIcon, X, Landmark, Info, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleToggle = (e) => {
      setHidden(e.detail?.hide ?? false);
    };
    window.addEventListener('toggle-navbar', handleToggle);
    return () => window.removeEventListener('toggle-navbar', handleToggle);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home size={18} /> },
    { label: 'Tools', path: '/tools', icon: <Wrench size={18} /> },
    { label: 'Resume', path: '/resume-builder', icon: <FileText size={18} /> },
    { label: 'Education', path: '/form-helper', icon: <BookOpen size={18} />},
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -150 : 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`nav-glass transition-all duration-500 ${scrolled ? 'w-[85%] !top-4 h-14 shadow-lg shadow-cyan-500/20' : ''}`}
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <AnimatedLogo className="w-12 h-12" />
        <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] hidden sm:block drop-shadow-[0_0_20px_rgba(0,242,255,0.2)]">
          AllSarkariTools
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, idx) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={link.path} 
              className="flex items-center gap-2 font-bold text-sm transition-all duration-300 group relative text-gray-300 hover:text-white"
            >
              <span className="text-[#ff3b7e]">{link.icon}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] hover:opacity-80">
                {link.label}
              </span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff]"
                  initial={false}
                  transition={{ duration: 0.5 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            className="hidden sm:flex !h-10 !px-6 !text-xs bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] text-white border-0 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            onClick={() => navigate('/tools')}
          >
            ✨ All Tools
          </Button>
        </motion.div>
        
        {/* Mobile Menu Toggle */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileVisible(true)}
        >
          <MenuIcon size={24} />
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setMobileVisible(false)}
        open={mobileVisible}
        className="!bg-black/95 !backdrop-blur-2xl"
        width={280}
        closeIcon={<X size={24} className="text-white" />}
        title={<span className="text-white font-bold">Navigation</span>}
        styles={{ header: { borderBottom: '1px solid rgba(255,255,255,0.1)' } }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          {navLinks.map((link, idx) => (
            <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
              <Link 
                to={link.path} 
                onClick={() => setMobileVisible(false)}
                className={`flex items-center gap-4 text-xl font-bold p-3 rounded-2xl transition-all hover:scale-105 ${location.pathname === link.path ? 'bg-gradient-to-r from-[#ff3b7e]/10 to-[#00f2ff]/10 border border-[#00f2ff]/30' : 'text-gray-300 hover:bg-white/10'}`}
              >
                <span className="text-[#ff3b7e]">{link.icon}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff]">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Button 
              block 
              size="large" 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0 font-semibold !mt-4 hover:shadow-lg hover:shadow-cyan-500/50"
              onClick={() => {
                navigate('/tools');
                setMobileVisible(false);
              }}
            >
              ✨ All Tools
            </Button>
          </motion.div>
        </motion.div>
      </Drawer>
    </motion.nav>
  );
};

export default Navbar;
