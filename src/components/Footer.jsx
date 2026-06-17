import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider, Button } from 'antd';
import { Mail, Shield, ExternalLink, Info, FileText, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer = () => {
  const platformLinks = [
    { name: 'All Tools', path: '/tools' },
    { name: 'Resume Builder', path: '/resume-builder' },
    { name: 'Passport Photo', path: '/passport-photo-maker' },
    { name: 'Image Resizer', path: '/image-resizer' },
    { name: 'Education Hub', path: 'https://codeeducationhub.com', external: true },
  ];

  const supportLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Use', path: '/terms-of-use' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Help Guide', path: '/help-guide' },
  ];

  return (
    <AntFooter className="!bg-[#0d0722] !p-0 border-t border-white/5 pt-20 ">
      <div className="container mx-auto mt-5 px-6 pb-20">
        <Row gutter={[64, 48]}>
          <Col xs={24} lg={10}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                <span className="text-black font-black text-2xl">S</span>
              </div>
              <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] drop-shadow-[0_0_25px_rgba(0,242,255,0.25)]">
                AllSarkariTools
              </span>
            </div>
            <Paragraph className="!text-gray-500 text-lg leading-relaxed max-w-md mb-8">
              Empowering 100k+ Indian job aspirants with privacy-first document utilities. 
              Our technology simplifies government form preparation through 100% client-side processing.
            </Paragraph>
            <div className="flex gap-4">
              <Button type="primary" shape="circle" icon={<Mail size={18} />} className="!bg-white/5 !border-white/10 hover:!border-primary !text-gray-400 hover:!text-primary transition-all" />
              <Button type="primary" shape="circle" icon={<Info size={18} />} className="!bg-white/5 !border-white/10 hover:!border-primary !text-gray-400 hover:!text-primary transition-all" />
              <Button type="primary" shape="circle" icon={<FileText size={18} />} className="!bg-white/5 !border-white/10 hover:!border-primary !text-gray-400 hover:!text-primary transition-all" />
            </div>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Title level={4} className="!text-white !mb-8 !font-black">Platform</Title>
            <div className="flex flex-col gap-4">
              {platformLinks.map((link) => (
                link.external ? (
                  <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" className="font-bold transition-all flex items-center gap-2 group text-sm">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] hover:opacity-80">
                      {link.name}
                    </span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00f2ff]" />
                  </a>
                ) : (
                  <Link key={link.name} to={link.path} className="font-bold transition-all flex items-center gap-2 group text-sm">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] hover:opacity-80">
                      {link.name}
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00f2ff]" />
                  </Link>
                )
              ))}
            </div>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Title level={4} className="!text-white !mb-8 !font-black">Support</Title>
            <div className="flex flex-col gap-4">
              {supportLinks.map((link) => (
                <Link key={link.name} to={link.path} className="font-bold transition-all flex items-center gap-2 group text-sm">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] hover:opacity-80">
                    {link.name}
                  </span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00f2ff]" />
                </Link>
              ))}
            </div>
          </Col>

          <Col xs={24} lg={6}>
            <div className="p-8 glass-card border-none bg-primary/5 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full translate-x-12 -translate-y-12" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Shield size={24} className="text-primary" />
                </div>
                <Title level={4} className="!text-white !m-0 !font-black">Secure</Title>
              </div>
              <Paragraph className="!text-gray-500 !m-0 text-sm leading-relaxed">
                We never store your data. All processing happens within your browser session. 
                Close the tab, and your data is gone forever.
              </Paragraph>
            </div>
          </Col>
        </Row>

        <Divider className="border-white/5 my-16" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Text className="text-gray-600 font-bold">
            © 2026 ALLSARKARITOOLS. ALL RIGHTS RESERVED.
          </Text>
          <div className="flex items-center gap-10">
            <span className="flex items-center gap-2 text-gray-500 font-bold text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> SYSTEM OPERATIONAL
            </span>
            <span className="text-gray-500 font-bold text-sm">EN / IN</span>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
